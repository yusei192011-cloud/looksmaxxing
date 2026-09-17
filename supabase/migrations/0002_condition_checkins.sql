-- Run this once in the Supabase Dashboard: Project > SQL Editor > New query > paste > Run.
-- Daily per-muscle-group condition self-report (soreness/pain), captured either
-- right before starting a workout or via a manual override on the Home screen's
-- recovery list. One row per user+group+day; re-checking the same day upserts
-- in place. Backs three features: excluding a sore/painful group from today's
-- rule-based menu, letting the automatic hours-based recovery estimate be
-- corrected by the user, and the History tab's calendar view.

create table if not exists public.condition_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  "group" text not null check ("group" in ('chest','back','shoulder','arms','legs','abs')),
  status text not null check (status in ('good','normal','sore','pain')),
  checkin_date date not null,
  created_at timestamptz not null default now(),
  unique (user_id, "group", checkin_date)
);

alter table public.condition_checkins enable row level security;

create policy "select own checkins" on public.condition_checkins
  for select using (auth.uid() = user_id);
create policy "insert own checkins" on public.condition_checkins
  for insert with check (auth.uid() = user_id);
create policy "update own checkins" on public.condition_checkins
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
