import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, UserRole } from '@/shared/types/auth';

interface AuthStore extends AuthState {
  // Actions
  login: (params: {
    accessToken: string;
    refreshToken: string;
    memberId: number;
    nickname: string;
    role: UserRole;
  }) => void;
  logout: () => void;
  updateToken: (accessToken: string, refreshToken: string) => void;
  updateProfile: (nickname: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial State
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      memberId: null,
      nickname: null,
      role: null,

      // Actions
      login: ({ accessToken, refreshToken, memberId, nickname, role }) => {
        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          memberId,
          nickname,
          role,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          memberId: null,
          nickname: null,
          role: null,
        });
      },

      updateToken: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },

      updateProfile: (nickname) => {
        set({ nickname });
      },
    }),
    {
      name: 'auth-storage',
      // 민감한 정보는 localStorage에 저장하지 않음
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        memberId: state.memberId,
        nickname: state.nickname,
        role: state.role,
      }),
    }
  )
);