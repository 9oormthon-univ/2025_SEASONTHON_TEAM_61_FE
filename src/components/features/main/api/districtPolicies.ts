import { apiClient } from '@/lib/apiClient';

export const getDistrictPolicies = async () => {
  const response = await apiClient.get('/api/district-policies');
  return response.data;
};
