import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getThemeColors } from '../theme/theme';
import { Text } from './primitives/Text';

type SpendingTab = 'overview' | 'statistics';

interface SpendingTabBarProps {
  activeTab: SpendingTab;
}

export function SpendingTabBar({ activeTab }: SpendingTabBarProps) {
  const colors = getThemeColors(useColorScheme());
  const { t } = useTranslation();

  const tabs: Array<{
    key: SpendingTab;
    icon: 'wallet-outline' | 'bar-chart-outline';
    path: '/overview' | '/statistics';
  }> = [
    { key: 'overview', icon: 'wallet-outline', path: '/overview' },
    { key: 'statistics', icon: 'bar-chart-outline', path: '/statistics' },
  ];

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.bar, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <View style={styles.content}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              key={tab.key}
              onPress={() => {
                if (!isActive) {
                  router.replace(tab.path);
                }
              }}
              style={({ pressed }) => [
                styles.tab,
                isActive && { backgroundColor: colors.accentSoft },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                color={isActive ? colors.accentText : colors.mutedText}
                name={tab.icon}
                size={22}
              />
              <Text color={isActive ? colors.accentText : colors.mutedText} size="sm" weight="bold">
                {t(`navigation.${tab.key}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    borderTopWidth: 1,
  },
  content: {
    width: '100%',
    maxWidth: 960,
    minHeight: 68,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderRadius: 14,
  },
  pressed: {
    opacity: 0.72,
  },
});
