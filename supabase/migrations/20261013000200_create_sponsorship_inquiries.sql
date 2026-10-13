create table if not exists public.sponsorship_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  job_title text,
  work_email text not null,
  phone text not null,
  industry text not null,
  partnership_interest text not null,
  preferred_experience text,
  estimated_budget text,
  goals text not null,
  sponsorship_deck_requested boolean not null default false
);

alter table public.sponsorship_inquiries enable row level security;
revoke all on table public.sponsorship_inquiries from anon, authenticated;
grant all on table public.sponsorship_inquiries to service_role;
