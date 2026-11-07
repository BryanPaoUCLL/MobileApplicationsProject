import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

import type { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let client: SupabaseClient<Database> | undefined;
let isAppStateListenerRegistered = false;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (supabaseUrl === undefined || supabasePublishableKey === undefined) {
    throw new Error(
      'Supabase is not configured. Copy .env.example to .env and add the project URL and publishable key.',
    );
  }

  if (client === undefined) {
    client = createClient<Database>(supabaseUrl, supabasePublishableKey, {
      auth: {
        ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }

  if (Platform.OS !== 'web' && !isAppStateListenerRegistered) {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        client?.auth.startAutoRefresh();
      } else {
        client?.auth.stopAutoRefresh();
      }
    });
    isAppStateListenerRegistered = true;
  }

  return client;
}
