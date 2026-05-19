-- ============================================================
-- E-Brave Operational System (EOS) - Database Initialization Schema
-- Target Platform: PostgreSQL (Supabase)
-- ============================================================

-- Enable UUID Generator extension
create extension if not exists "uuid-ossp";

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

-- Policies for Profiles
create policy "Allow public read access to profiles" on public.profiles
  for select using (true);

create policy "Allow users to update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Allow Super Admins to manage profiles" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'Super Admin'
    )
  );

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

create policy "Allow authenticated users to read leads" on public.leads
  for select using (auth.role() = 'authenticated');

create policy "Allow authenticated users to insert leads" on public.leads
  for insert with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update leads" on public.leads
  for update using (auth.role() = 'authenticated');

create policy "Allow Super Admins/Ops Managers to delete leads" on public.leads
  for delete using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager')
    )
  );

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

create policy "Allow authenticated users to read students" on public.students
  for select using (auth.role() = 'authenticated');

create policy "Allow authenticated users to insert/update students" on public.students
  for all using (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to manage sessions" on public.counseling_sessions
  for all using (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to manage webinars" on public.webinars
  for all using (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to manage registrations" on public.webinar_registrations
  for all using (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to manage content" on public.content
  for all using (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to manage tasks" on public.tasks
  for all using (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to read transactions" on public.transactions
  for select using (auth.role() = 'authenticated');

create policy "Allow Super Admins/Ops to manage transactions" on public.transactions
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager')
    )
  );

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

create policy "Allow authenticated users to manage campaigns" on public.campaigns
  for all using (auth.role() = 'authenticated');

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

create policy "Allow users to read their own notifications" on public.notifications
  for select using (auth.uid() = user_id or user_id is null);

create policy "Allow users to update their own notifications" on public.notifications
  for update using (auth.uid() = user_id or user_id is null);

create policy "Allow authenticated service insertion" on public.notifications
  for insert with check (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to read activity logs" on public.activity_logs
  for select using (auth.role() = 'authenticated');

create policy "Allow service logs insert" on public.activity_logs
  for insert with check (auth.role() = 'authenticated');

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

create policy "Allow authenticated users to manage rules" on public.automation_rules
  for all using (auth.role() = 'authenticated');
