-- ============================================================
-- Create Default Super Admin User for E-Brave EOS
-- Run this script inside the Supabase SQL Editor
-- ============================================================

-- Enable pgcrypto extension for password hashing
create extension if not exists pgcrypto;

-- 1. Insert user into auth.users
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
  updated_at
) values (
  '00000000-0000-0000-0000-000000000000',
  'd0d82915-d36c-4861-a1bf-cb9287c88b71', -- Fixed UUID for consistency
  'authenticated',
  'authenticated',
  'admin@ebrave.in',
  crypt('admin123', gen_salt('bf')),     -- Hashes password 'admin123' using bcrypt
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
) on conflict (id) do nothing;

-- 2. Insert matching profile into public.profiles
insert into public.profiles (
  id,
  name,
  role,
  phone,
  status,
  joined_date
) values (
  'd0d82915-d36c-4861-a1bf-cb9287c88b71',
  'E-Brave Admin',
  'Super Admin',
  '+919999999999',
  'Active',
  current_date
) on conflict (id) do nothing;
