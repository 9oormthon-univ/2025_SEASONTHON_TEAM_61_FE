import { apiClient } from '@/lib/apiClient';

/**
 * 카카오 인증 코드를 서버로 전송하여 로그인 처리
 * @param code 카카오에서 받은 인증 코드
 * @returns 로그인 결과
 */
export const kakaoAuthCode = async (code: string) => {
  try {
    const response = await apiClient.post('/kakao/auth/code', {
      code,
    });
    return response.data;
  } catch (error) {
    console.error('카카오 인증 코드 처리 실패:', error);
    throw error;
  }
};

/**
 * 카카오 로그아웃
 * @returns 로그아웃 결과
 */
export const kakaoLogout = async () => {
  try {
    const response = await apiClient.post('/kakao/auth/logout');
    return response.data;
  } catch (error) {
    console.error('카카오 로그아웃 실패:', error);
    throw error;
  }
};

/**
 * 사용자 정보 조회
 * @returns 사용자 정보
 */
export const getUserInfo = async () => {
  try {
    const response = await apiClient.get('/api/me');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};
