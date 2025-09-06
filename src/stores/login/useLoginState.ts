import { create } from 'zustand';

interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useLoginState = create<LoginState>((set, get) => ({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,

  setTokens: (accessToken, refreshToken) => {
    // 로컬 스토리지에 토큰과 사용자 ID 저장
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    set({
      accessToken,
      refreshToken,
      isLoggedIn: true,
    });
  },

  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
  },

  logout: () => {
    // 로컬 스토리지에서 토큰과 사용자 정보 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    set({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    });
  },

  initializeAuth: () => {
    // 페이지 로드 시 로컬 스토리지에서 토큰과 사용자 정보 복원
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken) {
        set({
          isLoggedIn: true,
          accessToken,
          refreshToken,
        });
      }
    } catch (error) {
      console.error('인증 정보 복원 실패:', error);
      // 오류 발생 시 로컬 스토리지 클리어
      get().logout();
    }
  },
}));
