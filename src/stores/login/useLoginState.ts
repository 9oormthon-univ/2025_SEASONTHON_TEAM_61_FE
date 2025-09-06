import { create } from 'zustand';

interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  memberId: number | null;
  setTokens: (accessToken: string, refreshToken: string | null, memberId: number) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useLoginState = create<LoginState>((set, get) => ({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  memberId: null,

  setTokens: (accessToken, refreshToken, memberId) => {
    // 로컬 스토리지에 토큰과 사용자 ID 저장
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    localStorage.setItem('memberId', memberId.toString());

    set({
      accessToken,
      refreshToken,
      memberId,
      isLoggedIn: true,
    });
  },

  },

  initializeAuth: () => {
    // 페이지 로드 시 로컬 스토리지에서 토큰과 사용자 정보 복원
    try {

      const response = await fetch('/api/me', {
        method: 'GET',
        credentials: 'include', // 쿠키 전송
      });


      if (accessToken && memberIdStr) {
        const memberId = parseInt(memberIdStr, 10);
        set({
          isLoggedIn: true,
          accessToken,
          refreshToken,
          memberId,
        });
      }
    } catch (error) {
      console.error('인증 정보 복원 실패:', error);
      // 오류 발생 시 로컬 스토리지 클리어
      get().logout();
    }
  },
}));
