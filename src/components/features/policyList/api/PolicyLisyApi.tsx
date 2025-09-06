import { apiClient } from "@/lib/apiClient";

interface GetPolicyListProps {
    page: number;
    size: number;
    category: string;
}

export const GetPolicyList = async ({page, size, category}: GetPolicyListProps) => {
    console.log("category", category);
   if(category === '전체') {
    const response = await apiClient.get(`/api/v1/policies?page=${page}&size=${size}`,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
   }    else{
    const response = await apiClient.get(`/api/v1/policies?category=${category}&page=${page}&size=${size}`,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
   }
   
   
}