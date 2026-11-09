import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../../src/components/AppHeader';
import { SpendingTabBar } from '../../src/components/SpendingTabBar';
import { Screen } from '../../src/components/primitives/Screen';
import { Text } from '../../src/components/primitives/Text';
import { mockPurchases, type PurchaseCategory } from '../../src/data/mockSpending';
import { useAuthStore } from '../../src/state/useAuthStore';
import { getThemeColors } from '../../src/theme/theme';
import { formatCurrency } from '../../src/utils/formatCurrency';

export default function StatisticsScreen() {
  const colors = getThemeColors(useColorScheme());
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? 'en';
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const purchases = isAuthenticated ? mockPurchases : [];
  const totalSpentMinor = purchases.reduce((total, purchase) => total + purchase.amountMinor, 0);
  const averageSpentMinor = purchases.length > 0 ? Math.round(totalSpentMinor / purchases.length) : 0;

  const categoryTotals = purchases.reduce<Partial<Record<PurchaseCategory, number>>>((totals, purchase) => {
    totals[purchase.category] = (totals[purchase.category] ?? 0) + purchase.amountMinor;
    return totals;
  }, {});

  const gameTotals = purchases.reduce<Record<string, number>>((totals, purchase) => {
    totals[purchase.gameName] = (totals[purchase.gameName] ?? 0) + purchase.amountMinor;
    return totals;
  }, {});

  const topGames = Object.entries(gameTotals).sort(([, first], [, second]) => second - first);

  return (
    <Screen padding="none" scrollable={false}>
      <AppHeader authenticated={isAuthenticated} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.page}>
          <View style={styles.intro}>
            <Text size="xl" weight="bold">
              {t('statistics.title')}
            </Text>
            <Text color={colors.mutedText}>{t('statistics.subtitle')}</Text>
          </View>

          <View style={styles.summaryGrid}>
            <StatisticCard
              label={t('statistics.totalSpent')}
              value={formatCurrency(totalSpentMinor, 'EUR', language)}
            />
            <StatisticCard
              label={t('statistics.averagePurchase')}
              value={formatCurrency(averageSpentMinor, 'EUR', language)}
            />
          </View>

          {isAuthenticated ? (
            <>
              <View style={styles.section}>
                <Text size="lg" weight="bold">
                  {t('statistics.byCategory')}
                </Text>
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  {(Object.entries(categoryTotals) as Array<[PurchaseCategory, number]>).map(
                    ([category, amount]) => {
                      const percentage = totalSpentMinor > 0 ? (amount / totalSpentMinor) * 100 : 0;

                      return (
                        <View key={category} style={styles.breakdownRow}>
                          <View style={styles.rowLabel}>
                            <Text weight="bold">{t(`categories.${category}`)}</Text>
                            <Text color={colors.mutedText}>{formatCurrency(amount, 'EUR', language)}</Text>
                          </View>
                          <View style={[styles.track, { backgroundColor: colors.border }]}>
                            <View
                              style={[
                                styles.fill,
                                { backgroundColor: colors.accent, width: `${percentage}%` },
                              ]}
                            />
                          </View>
                        </View>
                      );
                    },
                  )}
                </View>
              </View>

              <View style={styles.section}>
                <Text size="lg" weight="bold">
                  {t('statistics.byGame')}
                </Text>
                <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  {topGames.map(([game, amount], index) => (
                    <View key={game} style={styles.gameRow}>
                      <View style={[styles.rank, { backgroundColor: colors.accentSoft }]}>
                        <Text color={colors.accentText} weight="bold">
                          {index + 1}
                        </Text>
                      </View>
                      <View style={styles.gameName}>
                        <Text weight="bold">{game}</Text>
                      </View>
                      <Text>{formatCurrency(amount, 'EUR', language)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View style={[styles.loginPrompt, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text size="lg" weight="bold" align="center">
                {t('statistics.loginPromptTitle')}
              </Text>
              <Text color={colors.mutedText} align="center">
                {t('statistics.loginPromptDescription')}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/login')}
                style={({ pressed }) => [
                  styles.loginButton,
                  { backgroundColor: pressed ? colors.accentPressed : colors.accent },
                  pressed && styles.pressed,
                ]}
              >
                <Text color={colors.buttonText} weight="bold">
                  {t('landing.loginCta')}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <SpendingTabBar activeTab="statistics" />
    </Screen>
  );
}

interface StatisticCardProps {
  label: string;
  value: string;
}

function StatisticCard({ label, value }: StatisticCardProps) {
  const colors = getThemeColors(useColorScheme());

  return (
    <View style={[styles.summaryCard, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
      <Text color={colors.accentText} size="sm" weight="bold">
        {label}
      </Text>
      <Text size="xl" weight="bold">
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    flexGrow: 1,
    flexBasis: 220,
    gap: 8,
    padding: 20,
    borderWidth: 1,
    borderRadius: 18,
  },
  section: {
    gap: 12,
  },
  card: {
    gap: 18,
    padding: 20,
    borderWidth: 1,
    borderRadius: 18,
  },
  breakdownRow: {
    gap: 8,
  },
  rowLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  track: {
    height: 10,
    overflow: 'hidden',
    borderRadius: 999,
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
  gameRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rank: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  gameName: {
    flex: 1,
  },
  loginPrompt: {
    minHeight: 300,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 18,
  },
  loginButton: {
    minHeight: 48,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderRadius: 14,
  },
  pressed: {
    opacity: 0.72,
  },
});
