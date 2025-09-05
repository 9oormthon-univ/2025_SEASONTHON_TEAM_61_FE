import { apiClient } from "@/lib/apiClient";

export function login() {
    return apiClient.post('/api/me');
}