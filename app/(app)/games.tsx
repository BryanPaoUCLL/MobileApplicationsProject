import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen } from '../../src/components/primitives/Screen';
import { Text } from '../../src/components/primitives/Text';
import { AppHeader } from '../../src/components/AppHeader';
import { mockGameCatalog } from '../../src/data/mockSpending';
import { getThemeColors } from '../../src/theme/theme';
import { useAuthStore } from '../../src/state/useAuthStore';

export default function GamesScreen() {
  const colors = getThemeColors(useColorScheme());
  const { t } = useTranslation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = useMemo(
    () => Array.from(new Set(mockGameCatalog.flatMap((game) => game.genres))).sort(),
    [],
  );

  const filteredGames = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

    return mockGameCatalog.filter((game) => {
      const matchesGenre = selectedGenre === null || game.genres.includes(selectedGenre);
      const searchableText = [game.name, game.publisher, ...game.genres]
        .join(' ')
        .toLocaleLowerCase();
      const matchesSearch = normalizedQuery === '' || searchableText.includes(normalizedQuery);

      return matchesGenre && matchesSearch;
    });
  }, [searchQuery, selectedGenre]);

  return (
    <Screen padding="none">
      <AppHeader authenticated={isAuthenticated} />
      <View style={styles.page}>
        <View style={styles.intro}>
          <Text size="xl" weight="bold">
            {t('games.title')}
          </Text>
          <Text color={colors.mutedText}>{t('games.subtitle')}</Text>
        </View>

        <View style={styles.controls}>
          <TextInput
            accessibilityLabel={t('games.searchLabel')}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            onChangeText={setSearchQuery}
            placeholder={t('games.searchPlaceholder')}
            placeholderTextColor={colors.mutedText}
            returnKeyType="search"
            style={[
              styles.searchInput,
              {
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={searchQuery}
          />

          <View style={styles.filters}>
            <GenreFilter
              active={selectedGenre === null}
              label={t('games.allGenres')}
              onPress={() => setSelectedGenre(null)}
            />
            {genres.map((genre) => (
              <GenreFilter
                active={selectedGenre === genre}
                key={genre}
                label={genre}
                onPress={() => setSelectedGenre(genre)}
              />
            ))}
          </View>
        </View>

        <View style={styles.gameGrid}>
          {filteredGames.map((game) => (
            <View
              key={game.id}
              style={[
                styles.gameCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={[styles.gameArtwork, { backgroundColor: colors.accentSoft }]}>
                <Text size="xl" color={colors.accentText} weight="bold">
                  {game.name.charAt(0)}
                </Text>
              </View>

              <View style={styles.gameInfo}>
                <Text size="lg" weight="bold">
                  {game.name}
                </Text>
                <Text color={colors.mutedText}>{game.publisher}</Text>
                <View style={styles.genreList}>
                  {game.genres.map((genre) => (
                    <View
                      key={genre}
                      style={[styles.genreTag, { backgroundColor: colors.accentSoft }]}
                    >
                      <Text size="sm" color={colors.accentText} weight="bold">
                        {genre}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}

          {filteredGames.length === 0 && (
            <View style={[styles.emptyState, { borderColor: colors.border }]}>
              <Text size="lg" weight="bold" align="center">
                {t('games.noResultsTitle')}
              </Text>
              <Text color={colors.mutedText} align="center">
                {t('games.noResultsDescription')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}

interface GenreFilterProps {
  active: boolean;
  label: string;
  onPress: () => void;
}

function GenreFilter({ active, label, onPress }: GenreFilterProps) {
  const colors = getThemeColors(useColorScheme());

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        {
          backgroundColor: active ? colors.accent : colors.surface,
          borderColor: active ? colors.accent : colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text color={active ? colors.buttonText : colors.text} size="sm" weight="bold">
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    gap: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  intro: {
    gap: 6,
  },
  controls: {
    gap: 14,
  },
  searchInput: {
    width: '100%',
    minHeight: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 14,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    minHeight: 38,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 999,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gameCard: {
    flexGrow: 1,
    flexBasis: 260,
    minWidth: 0,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderRadius: 18,
  },
  gameArtwork: {
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  gameInfo: {
    gap: 3,
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  genreTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  emptyState: {
    width: '100%',
    gap: 8,
    padding: 32,
    borderWidth: 1,
    borderRadius: 18,
  },
  pressed: {
    opacity: 0.72,
  },
});
