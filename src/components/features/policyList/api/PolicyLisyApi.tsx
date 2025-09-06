import { apiClient } from "@/lib/apiClient";

export const GetPolicyList = async () => {
    const response = await apiClient.get('/api/v1/polices');

    console.log(response);
    
}