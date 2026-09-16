-- Run this once in the Supabase Dashboard: Project > SQL Editor > New query > paste > Run.
-- Creates the user_profiles table backing the onboarding wizard (nickname,
-- training experience, body type, goal, weekly frequency, height/weight
-- snapshot) with row-level security so each user can only read/write their
-- own row.

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  experience text not null check (experience in ('complete_beginner','beginner','intermediate','advanced')),
  body_type text not null check (body_type in ('skinny','average','chubby','overweight')),
  goal text not null check (goal in ('lose_weight','lean_muscle','bulk','health')),
  frequency int not null check (frequency between 1 and 7),
  height_cm numeric not null check (height_cm between 140 and 210),
  weight_kg numeric check (weight_kg between 30 and 150),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

create policy "select own profile" on public.user_profiles
  for select using (auth.uid() = id);
create policy "insert own profile" on public.user_profiles
  for insert with check (auth.uid() = id);
create policy "update own profile" on public.user_profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_set_updated_at on public.user_profiles;
create trigger user_profiles_set_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();
