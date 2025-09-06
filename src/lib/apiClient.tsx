import axios, { AxiosInstance } from 'axios';

console.log('환경변수:', process.env.NEXT_PUBLIC_BASE_URL);

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
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
          console.error('리프레시 토큰 갱신 오류:', refreshError);
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
