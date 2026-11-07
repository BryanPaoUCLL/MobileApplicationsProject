import { ScrollView, View, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getThemeColors } from '../../theme/theme';

interface ScreenProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  scrollable?: boolean;
}

export function Screen({ children, padding = 'md', scrollable = true }: ScreenProps) {
  const colors = getThemeColors(useColorScheme());
  const insets = useSafeAreaInsets();
  const paddingValue = paddingValues[padding];
  const safeAreaStyle = {
    paddingTop: paddingValue + insets.top,
    paddingBottom: paddingValue + insets.bottom,
  };

  if (!scrollable) {
    return (
      <View
        style={[
          styles.container,
          styles[padding],
          safeAreaStyle,
          { backgroundColor: colors.background },
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, styles[padding], safeAreaStyle]}
    >
      {children}
    </ScrollView>
  );
}

const paddingValues = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { flex: 1 },
  content: { flexGrow: 1 },
  none: {},
  sm: { padding: 8 },
  md: { padding: 16 },
  lg: { padding: 24 },
});
