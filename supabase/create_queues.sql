-- 1. Modify Activity Logs to point to Person
alter table public.activity_logs add column if not exists person_id uuid references public.persons(id) on delete cascade;

-- 2. View for Sales Queue (Pre-payment stages)
create or replace view public.view_queue_sales as
select id, name, phone, lifecycle_stage, next_action_due, last_contacted_at, source
from public.persons
where lifecycle_stage in ('New Lead', 'Follow-up Required')
and (next_action_due is null or next_action_due <= now())
order by next_action_due asc nulls first;

-- 3. View for Counselor Queue (Post-payment, sessions today)
-- NOTE: Requires your counseling_sessions table to exist and have a student_id column
create or replace view public.view_queue_counselor as
select s.id as session_id, p.id as person_id, p.name as student_name, s.scheduled_at, s.status, s.session_type
from public.counseling_sessions s
join public.persons p on p.id = s.student_id
where s.scheduled_at >= current_date and s.scheduled_at < current_date + interval '1 day'
order by s.scheduled_at asc;
