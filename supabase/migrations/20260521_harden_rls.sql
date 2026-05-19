-- ============================================================
-- E-Brave Operational System (EOS) - Hardened RLS Policies
-- Target Platform: PostgreSQL (Supabase)
-- ============================================================

-- Drop old policies to replace them with roles-based restrictions
drop policy if exists "Allow public read access to profiles" on public.profiles;
drop policy if exists "Allow users to update their own profile" on public.profiles;
drop policy if exists "Allow Super Admins to manage profiles" on public.profiles;

drop policy if exists "Allow authenticated users to read leads" on public.leads;
drop policy if exists "Allow authenticated users to insert leads" on public.leads;
drop policy if exists "Allow authenticated users to update leads" on public.leads;
drop policy if exists "Allow Super Admins/Ops Managers to delete leads" on public.leads;

drop policy if exists "Allow authenticated users to read students" on public.students;
drop policy if exists "Allow authenticated users to insert/update students" on public.students;

drop policy if exists "Allow authenticated users to manage sessions" on public.counseling_sessions;

drop policy if exists "Allow authenticated users to manage webinars" on public.webinars;
drop policy if exists "Allow authenticated users to manage registrations" on public.webinar_registrations;

drop policy if exists "Allow authenticated users to manage content" on public.content;

drop policy if exists "Allow authenticated users to manage tasks" on public.tasks;

drop policy if exists "Allow authenticated users to read transactions" on public.transactions;
drop policy if exists "Allow Super Admins/Ops to manage transactions" on public.transactions;

drop policy if exists "Allow authenticated users to manage campaigns" on public.campaigns;
drop policy if exists "Allow users to read their own notifications" on public.notifications;
drop policy if exists "Allow users to update their own notifications" on public.notifications;
drop policy if exists "Allow authenticated service insertion" on public.notifications;

drop policy if exists "Allow authenticated users to read activity logs" on public.activity_logs;
drop policy if exists "Allow service logs insert" on public.activity_logs;

drop policy if exists "Allow authenticated users to manage rules" on public.automation_rules;

-- ────────────────────────────────────────────────────────
-- 1. Profiles Table Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 2. Leads CRM Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 3. Enrolled Students Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 4. Counseling Sessions Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 5. Webinars & Registrations Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 6. Content Pipeline Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 7. Tasks Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 8. Transactions Ledger (Financials) Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 9. Campaigns Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 10. Notifications Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 11. Activity Log Table Policies
-- ────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────
-- 12. Automation Rules Policies
-- ────────────────────────────────────────────────────────
create policy "Allow management of rules" on public.automation_rules
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('Super Admin', 'Operations Manager') and status != 'Offline'
    )
  );
