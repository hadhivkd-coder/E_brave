-- ============================================================
-- EOS Phase 1 Master Architecture Migration
-- Introduces Universal Entities (Organizations, Engagements)
-- ============================================================

-- 1. Create the Organizations Table (B2B Pillar)
create table public.organizations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null check (type in ('School', 'College', 'University', 'Corporate', 'NGO', 'Vendor', 'Other')),
  tier text default 'Standard',
  city text,
  contact_email text,
  contact_phone text,
  account_manager_id uuid references public.profiles(id) on delete set null,
  partnership_status text default 'Prospect' check (partnership_status in ('Prospect', 'Active', 'Inactive')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.organizations enable row level security;

-- Add optional organization link to persons (for B2B contacts or students belonging to a school)
alter table public.persons add column organization_id uuid references public.organizations(id) on delete set null;

-- 2. Create the Engagements Table (Universal Product/Event/Course Pillar)
create table public.engagements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type text not null check (type in ('Course', 'Event', 'Workshop', 'Seminar', 'Counseling Program', 'Webinar', 'Assessment')),
  status text default 'Upcoming' check (status in ('Draft', 'Upcoming', 'Active', 'Completed', 'Cancelled')),
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  config_json jsonb default '{}'::jsonb, -- Stores custom attributes (e.g., zoom_link, syllabus_url, ticket_price)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.engagements enable row level security;

-- 3. Create the Person-Engagements Link Table (The Connection Matrix)
create table public.person_engagements (
  id uuid default uuid_generate_v4() primary key,
  person_id uuid references public.persons(id) on delete cascade not null,
  engagement_id uuid references public.engagements(id) on delete cascade not null,
  role text default 'Attendee' check (role in ('Attendee', 'Student', 'Speaker', 'Organizer')),
  status text default 'Registered' check (status in ('Registered', 'In Progress', 'Completed', 'No Show', 'Dropped')),
  progress_score integer default 0,
  payment_status text default 'Pending' check (payment_status in ('Free', 'Pending', 'Partial', 'Paid', 'Refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(person_id, engagement_id)
);

alter table public.person_engagements enable row level security;

-- 4. Extend Activity Logs for Polymorphic Targets
-- Allow activity_logs to target organizations and engagements natively
alter table public.activity_logs add column organization_id uuid references public.organizations(id) on delete cascade;
alter table public.activity_logs add column engagement_id uuid references public.engagements(id) on delete cascade;
