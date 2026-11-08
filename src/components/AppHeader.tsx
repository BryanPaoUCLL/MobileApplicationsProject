import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  Image,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../state/useAuthStore';
import { getThemeColors } from '../theme/theme';
import { Text } from './primitives/Text';

interface AppHeaderProps {
  authenticated?: boolean;
}

export function AppHeader({ authenticated = false }: AppHeaderProps) {
  const colors = getThemeColors(useColorScheme());
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const logout = useAuthStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = width < 700;

  const navigate = (path: '/' | '/login' | '/overview' | '/games') => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    router.replace('/');
  };

  return (
    <>
      <View style={[styles.headerBar, { backgroundColor: colors.surface, borderColor: colors.border }]}> 
        <View style={styles.headerContent}>
          <View style={styles.headerLeading}>
            {isMobile && (
              <Pressable
                accessibilityLabel={t('navigation.openMenu')}
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => setIsMenuOpen(true)}
                style={({ pressed }) => [
                  styles.menuButton,
                  { backgroundColor: colors.accentSoft },
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.menuLine, { backgroundColor: colors.accentText }]} />
                <View style={[styles.menuLine, { backgroundColor: colors.accentText }]} />
                <View style={[styles.menuLine, { backgroundColor: colors.accentText }]} />
              </Pressable>
            )}

            <Pressable
              accessibilityLabel={t('navigation.home')}
              accessibilityRole="button"
              onPress={() => navigate('/')}
              style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
            >
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                source={require('../../assets/favicon.png')}
                style={styles.brandMark}
              />
              <Text size="lg" weight="bold">
                Lavish Gamers
              </Text>
            </Pressable>
          </View>

          {!isMobile &&
            (authenticated ? (
              <View style={styles.desktopNavigation}>
                <Pressable onPress={() => navigate('/')} style={styles.desktopLink}>
                  <Text weight="bold">{t('navigation.home')}</Text>
                </Pressable>
                <Pressable onPress={() => navigate('/overview')} style={styles.desktopLink}>
                  <Text weight="bold">{t('navigation.overview')}</Text>
                </Pressable>
                <Pressable onPress={() => navigate('/games')} style={styles.desktopLink}>
                  <Text weight="bold">{t('navigation.games')}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => void handleLogout()}
                  style={({ pressed }) => [
                    styles.actionButton,
                    { backgroundColor: colors.accentSoft },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text color={colors.accentText} weight="bold">
                    {t('common.logout')}
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.desktopNavigation}>
                <Pressable onPress={() => navigate('/')} style={styles.desktopLink}>
                  <Text weight="bold">{t('navigation.home')}</Text>
                </Pressable>
                <Pressable onPress={() => navigate('/overview')} style={styles.desktopLink}>
                  <Text weight="bold">{t('navigation.overview')}</Text>
                </Pressable>
                <Pressable onPress={() => navigate('/games')} style={styles.desktopLink}>
                  <Text weight="bold">{t('navigation.games')}</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => navigate('/login')}
                  style={({ pressed }) => [
                    styles.actionButton,
                    { backgroundColor: colors.accentSoft },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text color={colors.accentText} weight="bold">
                    {t('common.login')}
                  </Text>
                </Pressable>
              </View>
            ))}
        </View>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsMenuOpen(false)}
        transparent
        visible={isMenuOpen}
      >
        <View style={styles.menuOverlay}>
          <SafeAreaView style={[styles.menuPanel, { backgroundColor: colors.background }]}> 
            <View style={[styles.menuHeader, { borderColor: colors.border }]}> 
              <Text size="lg" weight="bold">
                {t('navigation.menu')}
              </Text>
              <Pressable
                accessibilityLabel={t('navigation.closeMenu')}
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => setIsMenuOpen(false)}
                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
              >
                <Ionicons color={colors.text} name="close" size={28} />
              </Pressable>
            </View>

            <View style={styles.menuItems}>
              {authenticated ? (
                <>
                  <MenuItem label={t('navigation.home')} onPress={() => navigate('/')} />
                  <MenuItem label={t('navigation.overview')} onPress={() => navigate('/overview')} />
                  <MenuItem label={t('navigation.games')} onPress={() => navigate('/games')} />
                  <MenuItem label={t('common.logout')} onPress={() => void handleLogout()} />
                </>
              ) : (
                <>
                  <MenuItem label={t('navigation.home')} onPress={() => navigate('/')} />
                  <MenuItem label={t('navigation.overview')} onPress={() => navigate('/overview')} />
                  <MenuItem label={t('navigation.games')} onPress={() => navigate('/games')} />
                  <MenuItem label={t('common.login')} onPress={() => navigate('/login')} />
                </>
              )}
            </View>
          </SafeAreaView>

          <Pressable
            accessibilityLabel={t('navigation.closeMenu')}
            accessibilityRole="button"
            onPress={() => setIsMenuOpen(false)}
            style={styles.menuBackdrop}
          />
        </View>
      </Modal>
    </>
  );
}

interface MenuItemProps {
  label: string;
  onPress: () => void;
}

function MenuItem({ label, onPress }: MenuItemProps) {
  const colors = getThemeColors(useColorScheme());

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        { borderColor: colors.border },
        pressed && { backgroundColor: colors.surface },
      ]}
    >
      <Text size="lg" weight="bold">
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    width: '100%',
    borderBottomWidth: 1,
  },
  headerContent: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerLeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 12,
  },
  menuLine: {
    width: 20,
    height: 2,
    borderRadius: 999,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 36,
    height: 36,
  },
  desktopNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  desktopLink: {
    minHeight: 44,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    minHeight: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  menuPanel: {
    width: '82%',
    maxWidth: 320,
  },
  menuHeader: {
    minHeight: 72,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  menuItems: {
    padding: 16,
    gap: 8,
  },
  menuItem: {
    minHeight: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  menuBackdrop: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
