alter table public.games
add column cover_image_path text
check (
  cover_image_path is null
  or char_length(trim(cover_image_path)) between 1 and 500
);
