-- Project 10K — multi-user schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query → Run).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.
-- Security model: every table has RLS enabled and policies scoped to auth.uid().

-- ─────────────────────────────────────────────────────────────
-- PROFILES (1:1 with auth.users, folds in user settings)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id                   uuid primary key references auth.users(id) on delete cascade,
  display_name         text not null default '',
  primary_focus        text,
  weekly_target_hours  numeric not null default 20,
  inactivity_penalty   boolean not null default false,
  grace_period_hours   int not null default 48,
  avatar_url           text,
  created_at           timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- DISCIPLINES (the "active journeys" / cards)
-- ─────────────────────────────────────────────────────────────
create table if not exists public.disciplines (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  category      text,
  focus         text,
  icon          text,
  target_hours  int not null default 10000,
  archived      boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- SESSIONS (every logged session — the single source of truth)
-- All hours / streaks / % are derived from this table.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.sessions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  discipline_id  uuid not null references public.disciplines(id) on delete cascade,
  sub_category   text,
  session_date   date not null,
  duration_hours numeric not null check (duration_hours > 0),
  intensity      text check (intensity in ('low','medium','high')),
  notes          text,
  created_at     timestamptz not null default now()
);

create index if not exists disciplines_user_idx on public.disciplines(user_id);
create index if not exists sessions_user_idx     on public.sessions(user_id);
create index if not exists sessions_disc_idx      on public.sessions(discipline_id);

-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY — the security boundary. Without this the
-- public anon key would expose every user's rows.
-- ─────────────────────────────────────────────────────────────
alter table public.profiles    enable row level security;
alter table public.disciplines enable row level security;
alter table public.sessions    enable row level security;

drop policy if exists "own profile"     on public.profiles;
drop policy if exists "own disciplines" on public.disciplines;
drop policy if exists "own sessions"    on public.sessions;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own disciplines" on public.disciplines
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own sessions" on public.sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- AUTO-CREATE a profile row on signup
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
