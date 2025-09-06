import { apiClient } from '@/lib/apiClient';

export const getSearch = async (query: string) => {
  const response = await apiClient.get(`/api/v1/policies?keyword=${query}`);
  return response.data?.content || response.data || [];
};
