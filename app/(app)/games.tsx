import { StyleSheet, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen } from '../../src/components/primitives/Screen';
import { Text } from '../../src/components/primitives/Text';
import { mockGames } from '../../src/data/mockSpending';
import { getThemeColors } from '../../src/theme/theme';
import { formatCurrency } from '../../src/utils/formatCurrency';

export default function GamesScreen() {
  const colors = getThemeColors(useColorScheme());
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? 'en';

  return (
    <Screen padding="lg">
      <View style={styles.page}>
        <View style={styles.intro}>
          <Text size="xl" weight="bold">
            {t('games.title')}
          </Text>
          <Text color={colors.mutedText}>{t('games.subtitle')}</Text>
        </View>

        <View style={styles.gameGrid}>
          {mockGames.map((game) => (
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
              </View>

              <View style={[styles.gameFooter, { borderColor: colors.border }]}>
                <View>
                  <Text size="sm" color={colors.mutedText}>
                    {t('games.totalSpent')}
                  </Text>
                  <Text weight="bold">
                    {formatCurrency(game.totalSpentMinor, game.currency, language)}
                  </Text>
                </View>
                <Text size="sm" color={colors.mutedText}>
                  {t('games.purchaseCount', { count: game.purchaseCount })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    gap: 24,
  },
  intro: {
    gap: 6,
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
  gameFooter: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    borderTopWidth: 1,
  },
});
