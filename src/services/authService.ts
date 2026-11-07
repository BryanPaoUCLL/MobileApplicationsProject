import type { Session } from '@supabase/supabase-js';
import type { User } from '../types/User';
import { getSupabaseClient } from '../lib/supabase';

function mapSessionToUser(session: Session): User {
  const { user } = session;
  const email = user.email ?? '';
  const displayName = user.user_metadata.full_name;

  return {
    id: user.id,
    email,
    name: typeof displayName === 'string' ? displayName : email.split('@')[0],
    token: session.access_token,
  };
}

export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error !== null) {
    throw error;
  }
  if (data.session === null) {
    throw new Error('Supabase did not return an authentication session.');
  }

  return mapSessionToUser(data.session);
}

export async function logout(): Promise<void> {
  const { error } = await getSupabaseClient().auth.signOut();

  if (error !== null) {
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await getSupabaseClient().auth.getSession();

  if (error !== null) {
    throw error;
  }

  return data.session === null ? null : mapSessionToUser(data.session);
}

export function subscribeToAuthChanges(
  onUserChange: (user: User | null) => void,
): () => void {
  const { data } = getSupabaseClient().auth.onAuthStateChange((_event, session) => {
    onUserChange(session === null ? null : mapSessionToUser(session));
  });

  return () => data.subscription.unsubscribe();
}
