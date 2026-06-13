-- ============================================================
-- Phase 5 Financial Engine
-- ============================================================

-- Create the generalized Accounting Ledger
create table public.accounting_ledger (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id), -- Who logged this
  transaction_type text not null check (transaction_type in ('Revenue', 'Expense')),
  category text not null, -- e.g. 'Ad Spend', 'Subscription', 'Consultation Fee'
  amount numeric not null check (amount > 0),
  description text not null,
  transaction_date date not null default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.accounting_ledger enable row level security;

-- Insert some realistic mock expenses so the Super Admin sees data immediately
insert into public.accounting_ledger (transaction_type, category, amount, description, transaction_date) values
('Expense', 'Ad Spend', 45000, 'Meta Ads Campaign (June)', current_date - interval '2 days'),
('Expense', 'Subscription', 2500, 'Zoom Pro Annual', current_date - interval '5 days'),
('Expense', 'Operational', 12000, 'Counselor Base Payout', current_date - interval '10 days'),
('Revenue', 'Other Revenue', 15000, 'B2B Workshop Fees', current_date - interval '3 days');

-- Note: True "Revenue" largely comes from the existing `payments` table (tied to student IDs). 
-- The frontend will aggregate `payments` (as Revenue) + `accounting_ledger` (Expenses + Misc Revenue) to calculate true Net Profit.
