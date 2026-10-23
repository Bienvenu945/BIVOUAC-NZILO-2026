-- Livre d'or collectif BIVOUAC NZILO 2026
-- À exécuter dans Supabase > SQL Editor.
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 50),
  message text not null check (char_length(message) between 1 and 500),
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.guestbook enable row level security;

-- Tout visiteur peut lire uniquement les messages approuvés.
drop policy if exists "Public can read published guestbook entries" on public.guestbook;
create policy "Public can read published guestbook entries"
on public.guestbook for select
to anon, authenticated
using (status = 'published');

-- Tout visiteur peut soumettre un message en attente de modération.
drop policy if exists "Public can submit pending guestbook entries" on public.guestbook;
create policy "Public can submit pending guestbook entries"
on public.guestbook for insert
to anon, authenticated
with check (
  status = 'pending'
  and char_length(trim(name)) between 1 and 50
  and char_length(trim(message)) between 1 and 500
);

-- Pas de politique publique UPDATE/DELETE : les visiteurs ne peuvent pas modérer.
grant select, insert on public.guestbook to anon, authenticat
  ed;
