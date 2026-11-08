-- Turn games and companies into a shared catalogue while retaining user_id as
-- optional provenance for user-contributed records. Purchases and products
-- remain private to their owner, but may reference any catalogue game.

alter table public.products
  drop constraint if exists products_game_id_user_id_fkey;

alter table public.stores
  drop constraint if exists stores_company_id_user_id_fkey;

alter table public.game_companies
  drop constraint if exists game_companies_game_id_user_id_fkey,
  drop constraint if exists game_companies_company_id_user_id_fkey;

alter table public.games
  alter column user_id drop not null;

alter table public.companies
  alter column user_id drop not null;

alter table public.game_companies
  alter column user_id drop not null;

alter table public.products
  add constraint products_game_id_fkey
  foreign key (game_id) references public.games (id) on delete restrict;

alter table public.stores
  add constraint stores_company_id_fkey
  foreign key (company_id) references public.companies (id) on delete set null;

alter table public.game_companies
  add constraint game_companies_game_id_fkey
    foreign key (game_id) references public.games (id) on delete cascade,
  add constraint game_companies_company_id_fkey
    foreign key (company_id) references public.companies (id) on delete cascade;

drop index if exists public.games_user_name_unique;
drop index if exists public.companies_user_name_unique;

create unique index games_name_unique
  on public.games (lower(name));

create unique index companies_name_unique
  on public.companies (lower(name));

create table public.genres (
  slug text primary key check (slug ~ '^[a-z][a-z0-9_]*$'),
  name text not null check (char_length(trim(name)) between 1 and 80),
  created_at timestamptz not null default now()
);

create unique index genres_name_unique
  on public.genres (lower(name));

create table public.game_genres (
  game_id uuid not null references public.games (id) on delete cascade,
  genre_slug text not null references public.genres (slug) on update cascade on delete restrict,
  created_at timestamptz not null default now(),
  primary key (game_id, genre_slug)
);

create index game_genres_genre_game_idx
  on public.game_genres (genre_slug, game_id);

insert into public.genres (slug, name)
values
  ('action_rpg', 'Action RPG'),
  ('battle_royale', 'Battle royale'),
  ('hero_shooter', 'Hero shooter'),
  ('moba', 'MOBA'),
  ('open_world', 'Open world'),
  ('sandbox', 'Sandbox'),
  ('shooter', 'Shooter'),
  ('strategy', 'Strategy'),
  ('survival', 'Survival'),
  ('tactical_shooter', 'Tactical shooter'),
  ('turn_based_rpg', 'Turn-based RPG');

insert into public.companies (name)
select seed.name
from (
  values
    ('Blizzard Entertainment'),
    ('Electronic Arts'),
    ('Epic Games'),
    ('HoYoverse'),
    ('Mojang Studios'),
    ('Riot Games')
) as seed(name)
where not exists (
  select 1 from public.companies existing
  where lower(existing.name) = lower(seed.name)
);

insert into public.games (name)
select seed.name
from (
  values
    ('Apex Legends'),
    ('Fortnite'),
    ('Genshin Impact'),
    ('Honkai: Star Rail'),
    ('League of Legends'),
    ('Minecraft'),
    ('Overwatch 2'),
    ('Valorant')
) as seed(name)
where not exists (
  select 1 from public.games existing
  where lower(existing.name) = lower(seed.name)
);

insert into public.game_companies (game_id, company_id, role, is_primary, user_id)
select game.id, company.id, 'publisher', true, null
from (
  values
    ('Apex Legends', 'Electronic Arts'),
    ('Fortnite', 'Epic Games'),
    ('Genshin Impact', 'HoYoverse'),
    ('Honkai: Star Rail', 'HoYoverse'),
    ('League of Legends', 'Riot Games'),
    ('Minecraft', 'Mojang Studios'),
    ('Overwatch 2', 'Blizzard Entertainment'),
    ('Valorant', 'Riot Games')
) as seed(game_name, company_name)
join public.games game on lower(game.name) = lower(seed.game_name)
join public.companies company on lower(company.name) = lower(seed.company_name)
on conflict (game_id, company_id, role)
do update set is_primary = excluded.is_primary;

insert into public.game_genres (game_id, genre_slug)
select game.id, seed.genre_slug
from (
  values
    ('Apex Legends', 'battle_royale'),
    ('Apex Legends', 'shooter'),
    ('Fortnite', 'battle_royale'),
    ('Fortnite', 'shooter'),
    ('Genshin Impact', 'action_rpg'),
    ('Genshin Impact', 'open_world'),
    ('Honkai: Star Rail', 'strategy'),
    ('Honkai: Star Rail', 'turn_based_rpg'),
    ('League of Legends', 'moba'),
    ('League of Legends', 'strategy'),
    ('Minecraft', 'sandbox'),
    ('Minecraft', 'survival'),
    ('Overwatch 2', 'hero_shooter'),
    ('Overwatch 2', 'shooter'),
    ('Valorant', 'shooter'),
    ('Valorant', 'tactical_shooter')
) as seed(game_name, genre_slug)
join public.games game on lower(game.name) = lower(seed.game_name)
on conflict (game_id, genre_slug) do nothing;

drop policy if exists "Companies are owned by their user" on public.companies;
drop policy if exists "Games are owned by their user" on public.games;
drop policy if exists "Game companies are owned by their user" on public.game_companies;

create policy "Companies are readable by authenticated users"
on public.companies for select to authenticated using (true);

create policy "Users can insert their own companies"
on public.companies for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own companies"
on public.companies for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own companies"
on public.companies for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "Games are readable by authenticated users"
on public.games for select to authenticated using (true);

create policy "Users can insert their own games"
on public.games for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own games"
on public.games for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own games"
on public.games for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "Game companies are readable by authenticated users"
on public.game_companies for select to authenticated using (true);

create policy "Users can insert their own game companies"
on public.game_companies for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own game companies"
on public.game_companies for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own game companies"
on public.game_companies for delete to authenticated
using ((select auth.uid()) = user_id);

alter table public.genres enable row level security;
alter table public.game_genres enable row level security;

create policy "Genres are readable by authenticated users"
on public.genres for select to authenticated using (true);

create policy "Game genres are readable by authenticated users"
on public.game_genres for select to authenticated using (true);

create policy "Owners can attach genres to their games"
on public.game_genres for insert to authenticated
with check (
  exists (
    select 1
    from public.games
    where games.id = game_genres.game_id
      and games.user_id = (select auth.uid())
  )
);

create policy "Owners can remove genres from their games"
on public.game_genres for delete to authenticated
using (
  exists (
    select 1
    from public.games
    where games.id = game_genres.game_id
      and games.user_id = (select auth.uid())
  )
);

revoke all privileges on table public.genres from anon, authenticated;
revoke all privileges on table public.game_genres from anon, authenticated;

grant select on table public.genres to authenticated;
grant select, insert, delete on table public.game_genres to authenticated;
