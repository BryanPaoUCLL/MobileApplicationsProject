import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Spinner } from '../../src/components/primitives/Spinner';
import { useAuthStore } from '../../src/state/useAuthStore';
import { useTranslation } from 'react-i18next';
import { getThemeColors } from '../../src/theme/theme';

export default function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const { t } = useTranslation();
  const colors = getThemeColors(useColorScheme());

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        tabBarActiveTintColor: colors.accentText,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="overview"
        options={{
          title: t('navigation.overview'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="stats-chart-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: t('navigation.games'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="game-controller-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="details/[id]"
        options={{
          href: null,
          headerShown: true,
          title: t('navigation.details'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
