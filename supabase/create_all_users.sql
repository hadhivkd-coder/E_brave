-- ============================================================
-- Create All Default Staff Accounts for E-Brave EOS
-- Run this script inside the Supabase SQL Editor
-- ============================================================

-- Enable pgcrypto extension for password hashing
create extension if not exists pgcrypto;

-- 1. Delete any existing user profiles to avoid conflicts
delete from auth.users where email in (
  'admin@ebrave.in', 
  'ops@ebrave.in', 
  'counsel@ebrave.in', 
  'content@ebrave.in'
);

-- 2. Insert all 4 users into auth.users (Passwords hashed using bcrypt)
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token,
  is_sso_user,
  email_change_token_current,
  email_change_confirm_status,
  reauthentication_token,
  is_anonymous
) values 
-- Super Admin (Password: admin123)
(
  '00000000-0000-0000-0000-000000000000',
  'd0d82915-d36c-4861-a1bf-cb9287c88b71',
  'authenticated',
  'authenticated',
  'admin@ebrave.in',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  '',
  false,
  '',
  0,
  '',
  false
),
-- Operations Manager (Password: ops123)
(
  '00000000-0000-0000-0000-000000000000',
  'd0d82915-d36c-4861-a1bf-cb9287c88b72',
  'authenticated',
  'authenticated',
  'ops@ebrave.in',
  crypt('ops123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  '',
  false,
  '',
  0,
  '',
  false
),
-- Counselor (Password: counsel123)
(
  '00000000-0000-0000-0000-000000000000',
  'd0d82915-d36c-4861-a1bf-cb9287c88b73',
  'authenticated',
  'authenticated',
  'counsel@ebrave.in',
  crypt('counsel123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  '',
  false,
  '',
  0,
  '',
  false
),
-- Content Manager (Password: content123)
(
  '00000000-0000-0000-0000-000000000000',
  'd0d82915-d36c-4861-a1bf-cb9287c88b74',
  'authenticated',
  'authenticated',
  'content@ebrave.in',
  crypt('content123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  '',
  false,
  '',
  0,
  '',
  false
);

-- 3. Insert matching profiles into public.profiles
insert into public.profiles (
  id,
  name,
  role,
  phone,
  status,
  joined_date
) values 
(
  'd0d82915-d36c-4861-a1bf-cb9287c88b71',
  'E-Brave Admin',
  'Super Admin',
  '+919999999999',
  'Active',
  current_date
),
(
  'd0d82915-d36c-4861-a1bf-cb9287c88b72',
  'Operations Manager',
  'Operations Manager',
  '+918888888888',
  'Active',
  current_date
),
(
  'd0d82915-d36c-4861-a1bf-cb9287c88b73',
  'Counselor',
  'Counselor',
  '+917777777777',
  'Active',
  current_date
),
(
  'd0d82915-d36c-4861-a1bf-cb9287c88b74',
  'Content Manager',
  'Content Manager',
  '+916666666666',
  'Active',
  current_date
);
