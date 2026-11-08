-- The games catalogue is public app content. Anonymous visitors may read it,
-- while all catalogue writes remain restricted to authenticated owners.

create policy "Companies are readable by anonymous users"
on public.companies for select to anon using (true);

create policy "Games are readable by anonymous users"
on public.games for select to anon using (true);

create policy "Game companies are readable by anonymous users"
on public.game_companies for select to anon using (true);

create policy "Genres are readable by anonymous users"
on public.genres for select to anon using (true);

create policy "Game genres are readable by anonymous users"
on public.game_genres for select to anon using (true);

grant usage on schema public to anon;
grant select on table public.companies to anon;
grant select on table public.games to anon;
grant select on table public.game_companies to anon;
grant select on table public.genres to anon;
grant select on table public.game_genres to anon;
