insert into public.genres (slug, name)
values ('gacha_game', 'Gacha game')
on conflict (slug) do update set name = excluded.name;

insert into public.game_genres (game_id, genre_slug)
select games.id, 'gacha_game'
from public.games
where games.name in ('Genshin Impact', 'Honkai: Star Rail')
on conflict (game_id, genre_slug) do nothing;
