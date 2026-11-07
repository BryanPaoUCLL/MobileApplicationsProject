import { Redirect, Stack } from 'expo-router';
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
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="dashboard" options={{ title: t('navigation.dashboard') }} />
      <Stack.Screen name="details/[id]" options={{ title: t('navigation.details') }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
