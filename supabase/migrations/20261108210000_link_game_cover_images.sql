update public.games
set cover_image_path = case name
  when 'Apex Legends' then 'apex-legends.webp'
  when 'Fortnite' then 'fortnite.webp'
  when 'Genshin Impact' then 'genshin-impact.webp'
  when 'Honkai: Star Rail' then 'honkai-star-rail.webp'
  when 'League of Legends' then 'league-of-legends.webp'
  when 'Minecraft' then 'minecraft.webp'
  when 'Overwatch 2' then 'overwatch2.webp'
  when 'Valorant' then 'Valorant.webp'
  else cover_image_path
end
where name in (
  'Apex Legends',
  'Fortnite',
  'Genshin Impact',
  'Honkai: Star Rail',
  'League of Legends',
  'Minecraft',
  'Overwatch 2',
  'Valorant'
);
