-- Guest invitation table for personalized wedding invitations
-- Run this after schema.sql to add guest management functionality

create table if not exists public.guests (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null check (char_length(slug) between 8 and 80),
  name text not null check (char_length(name) between 2 and 80),
  phone text,
  guest_type text default 'guest' check (guest_type in ('family', 'friends', 'colleagues', 'vip', 'guest')),
  max_companions integer default 0 check (max_companions between 0 and 10),
  invited_at timestamptz not null default timezone('utc'::text, now()),
  opened_at timestamptz
);

alter table public.guests enable row level security;

-- Revoke default privileges first
revoke all privileges on table public.guests from public, anon, authenticated;

-- Anonymous users can only read basic guest info by slug (for invitation lookup)
grant select (slug, name, max_companions) on table public.guests to anon;

drop policy if exists "Public can read guest by slug" on public.guests;
create policy "Public can read guest by slug"
on public.guests for select
to anon
using (true);

-- Index for fast slug lookup
create index if not exists guests_slug_idx on public.guests (slug);

-- Optional: link guest_messages to guests table for analytics
-- Uncomment if you want to track which guest sent which RSVP
-- alter table public.guest_messages add column if not exists guest_id uuid references public.guests(id);
-- create index if not exists guest_messages_guest_id_idx on public.guest_messages (guest_id);
