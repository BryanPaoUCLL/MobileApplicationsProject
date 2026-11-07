import { create } from 'zustand';
import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
  subscribeToAuthChanges,
} from '../services/authService';
import type { User } from '../types/User';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

let unsubscribeFromAuthChanges: (() => void) | undefined;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  initialize: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();
      set({
        user,
        isAuthenticated: user !== null,
        isLoading: false,
        isInitialized: true,
      });

      if (unsubscribeFromAuthChanges === undefined) {
        unsubscribeFromAuthChanges = subscribeToAuthChanges((updatedUser) => {
          set({
            user: updatedUser,
            isAuthenticated: updatedUser !== null,
          });
        });
      }
    } catch {
      set({ isLoading: false, isInitialized: true });
    }
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await loginService(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutService();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
