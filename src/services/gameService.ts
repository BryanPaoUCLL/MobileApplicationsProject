import { getSupabaseClient } from '../lib/supabase';

const GAME_IMAGES_BUCKET = 'game-images';

export interface GameCatalogItem {
  id: string;
  name: string;
  publisher: string | null;
  genres: string[];
  coverImageUrl: string | null;
}

export async function getGameCatalog(): Promise<GameCatalogItem[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('games')
    .select(`
      id,
      name,
      cover_image_path,
      game_companies (
        is_primary,
        role,
        companies (name)
      ),
      game_genres (
        genres (name)
      )
    `)
    .order('name');

  if (error !== null) {
    throw error;
  }

  return data.map((game) => {
    const publishers = game.game_companies.filter(
      (relationship) => relationship.role === 'publisher',
    );
    const publisher =
      publishers.find((relationship) => relationship.is_primary)?.companies?.name ??
      publishers[0]?.companies?.name ??
      null;
    const genres = game.game_genres
      .map((relationship) => relationship.genres?.name)
      .filter((name): name is string => name !== undefined)
      .sort((first, second) => first.localeCompare(second));
    const coverImageUrl =
      game.cover_image_path === null
        ? null
        : supabase.storage.from(GAME_IMAGES_BUCKET).getPublicUrl(game.cover_image_path).data
            .publicUrl;

    return {
      id: game.id,
      name: game.name,
      publisher,
      genres,
      coverImageUrl,
    };
  });
}
