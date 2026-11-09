import { Stack } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Spinner } from '../../src/components/primitives/Spinner';
import { useAuthStore } from '../../src/state/useAuthStore';
import { getThemeColors } from '../../src/theme/theme';

export default function AppLayout() {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const colors = getThemeColors(useColorScheme());

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="overview" />
      <Stack.Screen name="statistics" />
      <Stack.Screen name="games" />
      <Stack.Screen name="details/[id]" />
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
