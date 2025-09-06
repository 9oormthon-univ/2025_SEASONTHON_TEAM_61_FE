import { apiClient } from "@/lib/apiClient";

interface PostProfileProps {
    memberId:number;
    ageGroup: string;
    categories: string[];
}

export const PostProfileAPi = async ({ageGroup, categories, memberId}: PostProfileProps) => {
    const response = await apiClient.post('/api/v1/members/profile', {
        memberId: memberId,
        ageGroup: ageGroup,
        categories: categories
    });
    return response.data;
}   