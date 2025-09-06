import { apiClient } from "@/lib/apiClient";

export const GetDetailPolicy = async (id: string) => {
  const response = await apiClient.get(`/api/v1/policies/${id}`);
  return response.data;
};