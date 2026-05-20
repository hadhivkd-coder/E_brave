-- ============================================================
-- E-Brave Operational System (EOS) - Combined Database Schema & RLS Hardening (Clean Fresh Install)
-- Target Platform: PostgreSQL (Supabase Dashboard SQL Editor)
-- ============================================================

-- Enable UUID Generator extension
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────────
-- DROP ALL POTENTIAL RELATIONS OF THE NAME 'PROFILES'
-- ────────────────────────────────────────────────────────
drop table if exists public.profiles cascade;
drop view if exists public.profiles cascade;
drop materialized view if exists public.profiles cascade;
drop type if exists public.profiles cascade;

-- DROP OTHER TABLES
drop table if exists public.automation_rules cascade;
drop table if exists public.activity_logs cascade;
drop table if exists public.notifications cascade;
drop table if exists public.campaigns cascade;
drop table if exists public.transactions cascade;
drop table if exists public.tasks cascade;
drop table if exists public.content cascade;
drop table if exists public.webinar_registrations cascade;
drop table if exists public.webinars cascade;
drop table if exists public.counseling_sessions cascade;
drop table if exists public.students cascade;
drop table if exists public.leads cascade;

-- ────────────────────────────────────────────────────────
-- 1. Profiles Table (Extends auth.users)
-- ────────────────────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  role text not null check (role in ('Super Admin', 'Operations Manager', 'Counselor', 'Content Manager')),
  phone text,
  status text default 'Active' check (status in ('Active', 'Away', 'Offline')),
  joined_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on Profiles
alter table public.profiles enable row level security;

-- ────────────────────────────────────────────────────────
-- 2. Leads CRM Table
-- ────────────────────────────────────────────────────────
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  email text,
  education text,
  city text,
  state text,
  parent_contact text,
  source text not null default 'Google',
  counselor_id uuid references public.profiles(id) on delete set null,
  lead_score integer default 1 check (lead_score >= 1 and lead_score <= 10),
  notes text,
  tags text[] default array[]::text[],
  follow_up_date timestamp with time zone,
  status text default 'New Lead' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Leads
alter table public.leads enable row level security;

-- Indexing for performance
create index idx_leads_status on public.leads(status);
create index idx_leads_counselor on public.leads(counselor_id);
create index idx_leads_score on public.leads(lead_score);

-- ────────────────────────────────────────────────────────
-- 3. Enrolled Students Table
-- ────────────────────────────────────────────────────────
create table public.students (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  education text,
  city text,
  counselor_id uuid references public.profiles(id) on delete set null,
  enrolled_date date default current_date not null,
  status text default 'Active' not null check (status in ('Active', 'On Hold', 'Completed')),
  recommended_paths text[] default array[]::text[],
  counselor_notes text,
  progress_score integer default 10 check (progress_score >= 0 and progress_score <= 100),
  parent_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Students
alter table public.students enable row level security;

create index idx_students_lead on public.students(lead_id);
create index idx_students_counselor on public.students(counselor_id);

-- ────────────────────────────────────────────────────────
-- 4. Counseling Sessions Table
-- ────────────────────────────────────────────────────────
create table public.counseling_sessions (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.students(id) on delete cascade,
  counselor_id uuid references public.profiles(id) on delete set null,
  scheduled_at timestamp with time zone not null,
  duration integer default 30 not null,
  status text default 'Scheduled' not null check (status in ('Scheduled', 'In Progress', 'Completed', 'Cancelled', 'No Show')),
  session_type text default 'Initial' not null check (session_type in ('Initial', 'Follow-up', 'Parent Meeting', 'Career Planning')),
  notes jsonb default '{}'::jsonb,
  follow_up_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Counseling Sessions
alter table public.counseling_sessions enable row level security;

create index idx_sessions_counselor on public.counseling_sessions(counselor_id);
create index idx_sessions_student on public.counseling_sessions(student_id);

-- ────────────────────────────────────────────────────────
-- 5. Webinars Table
-- ────────────────────────────────────────────────────────
create table public.webinars (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  topic text,
  scheduled_at timestamp with time zone not null,
  duration integer default 60 not null,
  price numeric(10,2) default 0.00 not null,
  host_id uuid references public.profiles(id) on delete set null,
  status text default 'Upcoming' not null check (status in ('Upcoming', 'Live', 'Completed', 'Cancelled')),
  platform text default 'Zoom' not null,
  revenue numeric(10,2) default 0.00,
  conversion_count integer default 0,
  replay_views integer default 0,
  engagement_score numeric(3,1) default 0.0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Webinars
alter table public.webinars enable row level security;

-- ────────────────────────────────────────────────────────
-- 6. Webinar Registrations Table (Relational Join)
-- ────────────────────────────────────────────────────────
create table public.webinar_registrations (
  id uuid default uuid_generate_v4() primary key,
  webinar_id uuid references public.webinars(id) on delete cascade not null,
  lead_id uuid references public.leads(id) on delete cascade,
  student_id uuid references public.students(id) on delete cascade,
  registered_at timestamp with time zone default timezone('utc'::text, now()) not null,
  attended boolean default false not null,
  watch_duration_minutes integer default 0,
  converted boolean default false not null
);

-- Enable RLS on Webinar Registrations
alter table public.webinar_registrations enable row level security;

create index idx_reg_webinar on public.webinar_registrations(webinar_id);

-- ────────────────────────────────────────────────────────
-- 7. Content Pipeline Table
-- ────────────────────────────────────────────────────────
create table public.content (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  hook text,
  script text,
  caption text,
  platform text not null check (platform in ('Instagram', 'YouTube', 'WhatsApp')),
  cta text,
  status text default 'Idea' not null check (status in ('Idea', 'Script Ready', 'Recording', 'Editing', 'Scheduled', 'Published')),
  assigned_to uuid references public.profiles(id) on delete set null,
  publish_date timestamp with time zone,
  views integer default 0,
  likes integer default 0,
  shares integer default 0,
  comments integer default 0,
  leads_generated integer default 0,
  engagement_rate numeric(5,2) default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Content
alter table public.content enable row level security;

-- ────────────────────────────────────────────────────────
-- 8. Tasks Table
-- ────────────────────────────────────────────────────────
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text default 'Todo' not null check (status in ('Todo', 'In Progress', 'Review', 'Done')),
  priority text default 'Medium' not null check (priority in ('Low', 'Medium', 'High', 'Urgent')),
  assigned_to uuid references public.profiles(id) on delete set null,
  due_date date,
  tags text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Tasks
alter table public.tasks enable row level security;

create index idx_tasks_assignee on public.tasks(assigned_to);

-- ────────────────────────────────────────────────────────
-- 9. Transactions Ledger Table
-- ────────────────────────────────────────────────────────
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  type text not null check (type in ('Revenue', 'Expense')),
  amount numeric(12,2) not null,
  date date default current_date not null,
  description text not null,
  category text not null,
  linked_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Transactions
alter table public.transactions enable row level security;

-- ────────────────────────────────────────────────────────
-- 10. Campaigns Table
-- ────────────────────────────────────────────────────────
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  platform text not null,
  status text default 'Active' not null check (status in ('Active', 'Paused', 'Ended')),
  budget numeric(10,2) not null,
  spend numeric(10,2) default 0.00 not null,
  leads_generated integer default 0,
  conversions integer default 0,
  clicks integer default 0,
  impressions integer default 0,
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Campaigns
alter table public.campaigns enable row level security;

-- ────────────────────────────────────────────────────────
-- 11. Notifications Table
-- ────────────────────────────────────────────────────────
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null check (type in ('lead', 'webinar', 'follow-up', 'system', 'ai', 'task')),
  title text not null,
  message text not null,
  is_read boolean default false not null,
  priority text default 'medium' not null check (priority in ('low', 'medium', 'high')),
  action_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Notifications
alter table public.notifications enable row level security;

-- ────────────────────────────────────────────────────────
-- 12. Activity Log Table (System Audit Ledger)
-- ────────────────────────────────────────────────────────
create table public.activity_logs (
  id uuid default uuid_generate_v4() primary key,
  type text not null,
  message text not null,
  user_id uuid references public.profiles(id) on delete set null,
  related_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Activity Logs
alter table public.activity_logs enable row level security;

-- ────────────────────────────────────────────────────────
-- 13. Automation Rules Table
-- ────────────────────────────────────────────────────────
create table public.automation_rules (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  trigger_type text not null,
  trigger_condition jsonb not null default '{}'::jsonb,
  action_type text not null,
  action_params jsonb not null default '{}'::jsonb,
  is_active boolean default true not null,
  last_triggered_at timestamp with time zone,
  trigger_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Automation Rules
alter table public.automation_rules enable row level security;


-- ────────────────────────────────────────────────────────
-- HARDENED RLS POLICIES
-- ────────────────────────────────────────────────────────

-- 1. Profiles Table Policies
create policy "Allow authenticated read to profiles" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "Allow users to insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Allow users to update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Allow Super Admins to manage profiles" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'Super Admin' and status != 'Offline'
    )
  );

-- 2. Leads CRM Policies
create policy "Allow select leads" on public.leads
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow insert leads" on public.leads
  for insert with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow update leads" on public.leads
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow delete leads" on public.leads
  for delete using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager') and status != 'Offline'
    )
  );

-- 3. Enrolled Students Policies
create policy "Allow select students" on public.students
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow write students" on public.students
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

-- 4. Counseling Sessions Policies
create policy "Allow select sessions" on public.counseling_sessions
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow write sessions" on public.counseling_sessions
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

-- 5. Webinars & Registrations Policies
create policy "Allow select webinars" on public.webinars
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

create policy "Allow write webinars" on public.webinars
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow select webinar registrations" on public.webinar_registrations
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

create policy "Allow write webinar registrations" on public.webinar_registrations
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Counselor') and status != 'Offline'
    )
  );

-- 6. Content Pipeline Policies
create policy "Allow select content" on public.content
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

create policy "Allow write content" on public.content
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Content Manager') and status != 'Offline'
    )
  );

-- 7. Tasks Policies
create policy "Allow select tasks" on public.tasks
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

create policy "Allow write tasks" on public.tasks
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

-- 8. Transactions Ledger (Financials) Policies
create policy "Allow read transactions" on public.transactions
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager') and status != 'Offline'
    )
  );

create policy "Allow write transactions" on public.transactions
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager') and status != 'Offline'
    )
  );

-- 9. Campaigns Policies
create policy "Allow select campaigns" on public.campaigns
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

create policy "Allow write campaigns" on public.campaigns
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager', 'Content Manager') and status != 'Offline'
    )
  );

-- 10. Notifications Policies
create policy "Allow select notifications" on public.notifications
  for select using (
    auth.uid() = user_id or user_id is null
  );

create policy "Allow update notifications" on public.notifications
  for update using (
    auth.uid() = user_id or user_id is null
  );

create policy "Allow write notifications" on public.notifications
  for insert with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

-- 11. Activity Log Table Policies
create policy "Allow select activity logs" on public.activity_logs
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager') and status != 'Offline'
    )
  );

create policy "Allow insert activity logs" on public.activity_logs
  for insert with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and status != 'Offline'
    )
  );

-- 12. Automation Rules Policies
create policy "Allow management of rules" on public.automation_rules
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager') and status != 'Offline'
    )
  );

-- ────────────────────────────────────────────────────────
-- ENABLE REALTIME REPLICATION FOR CORE TABLES
-- ────────────────────────────────────────────────────────
do $$
begin
  alter publication supabase_realtime add table public.profiles;
  alter publication supabase_realtime add table public.leads;
  alter publication supabase_realtime add table public.students;
  alter publication supabase_realtime add table public.counseling_sessions;
  alter publication supabase_realtime add table public.webinars;
  alter publication supabase_realtime add table public.content;
  alter publication supabase_realtime add table public.transactions;
  alter publication supabase_realtime add table public.tasks;
  alter publication supabase_realtime add table public.activity_logs;
  alter publication supabase_realtime add table public.notifications;
exception
  when others then
    -- Handle cases where tables are already added to publication
    null;
end $$;
