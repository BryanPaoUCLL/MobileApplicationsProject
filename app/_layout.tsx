import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLocales } from 'expo-localization';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../src/state/useAuthStore';
import i18n, { getSupportedLanguage } from '../src/i18n';

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const locales = useLocales();
  const language = getSupportedLanguage(locales[0]?.languageCode ?? null);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (i18n.resolvedLanguage !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (Platform.OS !== 'web' || !('serviceWorker' in navigator)) {
      return;
    }

    if (__DEV__) {
      void navigator.serviceWorker.getRegistrations().then(async (registrations) => {
        await Promise.all(registrations.map((registration) => registration.unregister()));

        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames
              .filter((cacheName) => cacheName.startsWith('lavish-gamers-'))
              .map((cacheName) => caches.delete(cacheName)),
          );
        }
      });

      return;
    }

    const registerServiceWorker = () => {
      void navigator.serviceWorker.register('/service-worker.js').catch(() => undefined);
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
      return;
    }

    window.addEventListener('load', registerServiceWorker);

    return () => window.removeEventListener('load', registerServiceWorker);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Slot />
    </SafeAreaProvider>
  );
}
