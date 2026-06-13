-- ============================================================
-- EOS v1 Core Architecture Migration
-- Replaces fragmented leads/students with unified 'persons'
-- ============================================================

-- 1. Create the Unified Persons Table
create table public.persons (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text,
  city text,
  education text,
  source text not null default 'Website',
  lifecycle_stage text default 'New Lead' not null check (lifecycle_stage in ('New Lead', 'Follow-up Required', 'Payment Pending', 'Paid', 'Completed', 'Dropped')),
  assigned_sales_id uuid references public.profiles(id) on delete set null,
  assigned_counselor_id uuid references public.profiles(id) on delete set null,
  next_action_due timestamp with time zone,
  last_contacted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.persons enable row level security;

-- Migrate data (Optional, if starting fresh we can skip this in the SQL and do it manually, 
-- but here is the structure to move leads if needed)
insert into public.persons (id, name, phone, email, city, education, source, lifecycle_stage, assigned_sales_id, next_action_due, created_at)
select id, name, phone, email, city, education, source, 
  case when status = 'Follow-up Required' then 'Follow-up Required' else 'New Lead' end as lifecycle_stage, 
  counselor_id, follow_up_date, created_at 
from public.leads
on conflict do nothing;

-- 2. Modify Activity Logs to point to Person
-- Since it currently points to 'related_id' as generic UUID, we ensure it's understood as person_id for the frontend.
alter table public.activity_logs add column person_id uuid references public.persons(id) on delete cascade;

-- 3. Action Center Views
-- View for Sales Queue (Pre-payment stages)
create or replace view public.view_queue_sales as
select id, name, phone, lifecycle_stage, next_action_due, last_contacted_at
from public.persons
where lifecycle_stage in ('New Lead', 'Follow-up Required')
and (next_action_due is null or next_action_due <= now())
order by next_action_due asc nulls first;

-- View for Counselor Queue (Post-payment, sessions today)
create or replace view public.view_queue_counselor as
select s.id as session_id, p.id as person_id, p.name as student_name, s.scheduled_at, s.status, s.session_type
from public.counseling_sessions s
join public.persons p on p.id = s.student_id
where s.scheduled_at >= current_date and s.scheduled_at < current_date + interval '1 day'
order by s.scheduled_at asc;

-- Drop legacy tables (Uncomment when fully migrated)
-- drop table public.leads cascade;
-- drop table public.students cascade;
