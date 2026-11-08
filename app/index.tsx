import { router } from 'expo-router';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../src/components/AppHeader';
import { Screen } from '../src/components/primitives/Screen';
import { Text } from '../src/components/primitives/Text';
import { useAuthStore } from '../src/state/useAuthStore';
import { getThemeColors } from '../src/theme/theme';

const featureKeys = ['track', 'compare', 'understand'] as const;

export default function LandingScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const colors = getThemeColors(useColorScheme());
  const { t } = useTranslation();

  return (
    <Screen padding="none">
      <AppHeader authenticated={isAuthenticated} />

      <View style={styles.page}>
        <View style={styles.hero}>
          <Text size="xl" weight="bold" align="center">
            {t('landing.title')}
          </Text>
          <Text size="lg" color={colors.mutedText} align="center">
            {t('landing.description')}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(isAuthenticated ? '/overview' : '/login')}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: pressed ? colors.accentPressed : colors.accent },
              pressed && styles.pressed,
            ]}
          >
            <Text color={colors.buttonText} weight="bold">
              {isAuthenticated ? t('navigation.overview') : t('landing.loginCta')}
            </Text>
          </Pressable>
        </View>

        <View style={styles.features}>
          {featureKeys.map((featureKey) => (
            <View
              key={featureKey}
              style={[
                styles.featureCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text size="sm" color={colors.accentText} weight="bold">
                {t(`landing.features.${featureKey}.eyebrow`)}
              </Text>
              <Text size="lg" weight="bold">
                {t(`landing.features.${featureKey}.title`)}
              </Text>
              <Text color={colors.mutedText}>
                {t(`landing.features.${featureKey}.description`)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text size="sm" color={colors.mutedText} align="center">
            {t('landing.footer')}
          </Text>
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
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  hero: {
    alignItems: 'center',
    gap: 20,
    paddingTop: 72,
    paddingBottom: 64,
  },
  primaryButton: {
    minHeight: 50,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    flexGrow: 1,
    flexBasis: 240,
    gap: 10,
    padding: 22,
    borderWidth: 1,
    borderRadius: 18,
  },
  footer: {
    paddingTop: 48,
  },
});
