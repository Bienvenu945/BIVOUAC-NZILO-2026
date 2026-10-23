-- Photos des participants : envoi, validation par l'administrateur, publication.

create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

create table if not exists public.photo_submissions (
  id uuid primary key default gen_random_uuid(),
  path text not null unique check (path ~ '^[0-9a-f-]{36}\.(jpg|png|webp)$'),
  author text check (char_length(author) <= 60),
  caption text check (char_length(caption) <= 200),
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now()
);
alter table public.photo_submissions enable row level security;

-- 1. CORRECTION ICI : On supprime les règles existantes avant de les recréer
drop policy if exists "envoi en attente" on public.photo_submissions;
drop policy if exists "lecture des photos publiées" on public.photo_submissions;
drop policy if exists "admin gère les photos" on public.photo_submissions;

create policy "envoi en attente" on public.photo_submissions
  for insert to anon, authenticated with check (status = 'pending');
create policy "lecture des photos publiées" on public.photo_submissions
  for select to anon, authenticated using (status = 'published');
create policy "admin gère les photos" on public.photo_submissions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Dossiers de stockage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('photos-pending', 'photos-pending', false, 5242880, array['image/jpeg','image/png','image/webp']),
  ('photos-public',  'photos-public',  true,  5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- 2. CORRECTION ICI : Même chose pour le stockage
drop policy if exists "envoi fichier en attente" on storage.objects;
drop policy if exists "admin gère les fichiers" on storage.objects;

create policy "envoi fichier en attente" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'photos-pending' and name ~ '^[0-9a-f-]{36}\.jpg$');
create policy "admin gère les fichiers" on storage.objects
  for all to authenticated
  using (bucket_id in ('photos-pending','photos-public') and public.is_admin())
  with check (bucket_id in ('photos-pending','photos-public') and public.is_admin());

-- ÉTAPE 2 : 
-- Pour cette partie, ne garde QUE la ligne avec ton email, sans les tirets (--) devant.
-- Remplace bien par TON adresse email.
insert into public.admins (user_id) select id from auth.users where email = 'bienvenukalenga07@gmail.com';
