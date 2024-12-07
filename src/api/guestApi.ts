import { apiService } from './apiService';
import { ApiResponse, LoginResponse } from './types';

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<ApiResponse<LoginResponse>> {
    return apiService.post<
        LoginResponse,
        { username: string; password: string }
    >('/integration/customer/token', 'GUEST', {
        username: email,
        password,
    });
}
