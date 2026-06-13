-- ============================================================
-- Phase 6 Omnichannel Communication Engine
-- ============================================================

-- 1. Create Message Templates
create table public.message_templates (
  id uuid default uuid_generate_v4() primary key,
  provider text not null check (provider in ('WhatsApp', 'Email')),
  template_name text not null,
  external_template_id text, -- ID from Meta WABA or SendGrid
  content text not null,
  variables jsonb default '[]'::jsonb, -- Array of variable names e.g. ["name", "link"]
  status text default 'Active'
);

-- Enable RLS
alter table public.message_templates enable row level security;

-- Insert some default Nurture Templates
insert into public.message_templates (provider, template_name, content, variables) values
('WhatsApp', 'Welcome Initial Outreach', 'Hi {{name}}, thanks for reaching out to E-Brave! I am your assigned counselor. Let me know when you are free to chat.', '["name"]'),
('WhatsApp', 'Follow-up Nudge', 'Hi {{name}}, just following up on our last conversation. Let me know if you have any questions!', '["name"]');

-- 2. Expand Activity Logs for strict Communication tracking
-- We already have activity_logs, let's just make sure it supports storing external IDs in the JSONB payload.
-- (This requires no strict schema changes since it's JSONB, but we document it here)
-- payload -> { "provider": "WhatsApp", "message_id": "wamid...", "status": "sent/delivered/read" }
