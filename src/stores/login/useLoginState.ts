import { create } from 'zustand';

interface UserInfo {
  id: number;
  name: string;
  email?: string;
  [key: string]: any;
}

interface LoginState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

export const useLoginState = create<LoginState>((set, get) => ({
  isLoggedIn: false,
  userInfo: null,

  setUserInfo: (userInfo) => {
    set({
      userInfo,
      isLoggedIn: true,
    });
  },

  logout: () => {
    // 쿠키 기반 인증에서는 백엔드 로그아웃 API 호출
    fetch('http://localhost:8080/kakao/auth/logout', {
      method: 'POST',
      credentials: 'include', // 쿠키 전송
    }).finally(() => {
      set({
        isLoggedIn: false,
        userInfo: null,
      });
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    });
  },

  checkAuthStatus: async () => {
    try {
      const response = await fetch('http://localhost:8080/api/me', {
        method: 'GET',
        credentials: 'include', // 쿠키 전송
      });

      if (response.ok) {
        const userInfo = await response.json();
        set({
          isLoggedIn: true,
          userInfo,
        });
        return true;
      } else {
        set({
          isLoggedIn: false,
          userInfo: null,
        });
        return false;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('인증 상태 확인 실패:', error);
      set({
        isLoggedIn: false,
        userInfo: null,
      });
      return false;
    }
  },
}));
