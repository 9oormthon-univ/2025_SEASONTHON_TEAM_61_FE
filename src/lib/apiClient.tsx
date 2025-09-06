import axios, { AxiosInstance } from 'axios';

// 프록시를 통한 API 호출을 위한 설정
const getBaseURL = () => {
  // 개발 환경에서는 프록시를 통해 호출
  if (process.env.NODE_ENV === 'development') {
    return ''; // 프록시를 사용하므로 baseURL을 비워둠
  }

  // 프로덕션에서는 직접 API 서버 호출
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cheer-up.net';
};

console.log('환경변수:', {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
console.log('API Base URL:', getBaseURL());

export const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 만료 시 자동 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 리프레시 토큰으로 갱신 시도
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const refreshResponse = await apiClient.post('/auth/refresh', { refreshToken });
          const { accessToken: newAccessToken } = refreshResponse.data;

          localStorage.setItem('accessToken', newAccessToken);

          // 원래 요청 재시도
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient.request(error.config);
        } catch (refreshError) {
          console.error('리프레시 토큰 갱신 실패:', refreshError);
          // 리프레시 토큰도 만료된 경우 로그아웃
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
