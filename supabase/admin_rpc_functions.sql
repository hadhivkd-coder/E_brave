-- ============================================================
-- E-Brave EOS: Secure Admin RPC APIs for User Management
-- Run this script inside the Supabase SQL Editor
-- ============================================================

-- Enable pgcrypto extension for password hashing
create extension if not exists pgcrypto;

-- 1. Function to create a new staff member securely
create or replace function public.create_new_staff_member(
  staff_email text,
  staff_password text,
  staff_name text,
  staff_role text,
  staff_phone text
)
returns jsonb
language plpgsql
security definer -- Elevates permissions to write to auth.users
as $$
declare
  new_user_id uuid;
  caller_role text;
begin
  -- Check if the caller is authenticated and is a Super Admin
  select role into caller_role 
  from public.profiles 
  where id = auth.uid();
  
  if caller_role is null or caller_role != 'Super Admin' then
    raise exception 'Access Denied: Only Super Admins can create new staff accounts.';
  end if;

  -- Validate input email
  if exists (select 1 from auth.users where email = staff_email) then
    raise exception 'Account with this email already exists.';
  end if;

  -- Generate a new UUID for the user
  new_user_id := gen_random_uuid();

  -- Insert into auth.users table
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
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    staff_email,
    crypt(staff_password, gen_salt('bf')),
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

  -- Insert into public.profiles table
  insert into public.profiles (
    id,
    name,
    role,
    phone,
    status,
    joined_date
  ) values (
    new_user_id,
    staff_name,
    staff_role,
    staff_phone,
    'Active',
    current_date
  );

  return jsonb_build_object(
    'success', true,
    'userId', new_user_id
  );
end;
$$;


-- 2. Function to delete a staff member securely
create or replace function public.delete_staff_member(
  staff_id uuid
)
returns jsonb
language plpgsql
security definer -- Elevates permissions to delete from auth.users
as $$
declare
  caller_role text;
begin
  -- Check if caller is authenticated and is a Super Admin
  select role into caller_role 
  from public.profiles 
  where id = auth.uid();
  
  if caller_role is null or caller_role != 'Super Admin' then
    raise exception 'Access Denied: Only Super Admins can delete staff accounts.';
  end if;

  -- Prevent self-deletion
  if auth.uid() = staff_id then
    raise exception 'Access Denied: You cannot delete your own account.';
  end if;

  -- Delete from public.profiles
  delete from public.profiles where id = staff_id;

  -- Delete from auth.users
  delete from auth.users where id = staff_id;

  return jsonb_build_object(
    'success', true
  );
end;
$$;


-- 3. Function to reset a staff member's password securely
create or replace function public.reset_staff_password(
  staff_id uuid,
  new_password text
)
returns jsonb
language plpgsql
security definer -- Elevates permissions to update auth.users
as $$
declare
  caller_role text;
begin
  -- Check if caller is authenticated and is a Super Admin
  select role into caller_role 
  from public.profiles 
  where id = auth.uid();
  
  if caller_role is null or caller_role != 'Super Admin' then
    raise exception 'Access Denied: Only Super Admins can reset user passwords.';
  end if;

  -- Update password in auth.users
  update auth.users
  set encrypted_password = crypt(new_password, gen_salt('bf')),
      updated_at = now()
  where id = staff_id;

  return jsonb_build_object(
    'success', true
  );
end;
$$;
