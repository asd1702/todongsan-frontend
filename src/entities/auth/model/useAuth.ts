import { useAuthStore } from './auth.store';

export function useAuth() {
  const {
    isAuthenticated,
    accessToken,
    refreshToken,
    memberId,
    nickname,
    role,
    login,
    logout,
    updateToken,
    updateProfile,
  } = useAuthStore();

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    memberId,
    nickname,
    role,
    login,
    logout,
    updateToken,
    updateProfile,
  };
}
