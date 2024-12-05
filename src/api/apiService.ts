import apiClient from './apiClient';
import { ApiService, LoginResponse, NetworkResult } from './types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class RestApiService implements ApiService {
    private async send<T, U>(
        url: string,
        method: HttpMethod,
        payload?: U,
        params?: Record<string, any>,
    ): Promise<NetworkResult<T>> {
        try {
            const response = await apiClient.request<T>({
                url,
                method,
                ...(method === 'GET' && { params }), // Attach query parameters for GET
                ...(method !== 'GET' && { data: payload }), // Attach body payload for non-GET
            });

            return {
                status: 'SUCCESS',
                data: response.data,
            };
        } catch (error) {
            return {
                status: 'ERROR',
                message:
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred',
            };
        }
    }

    private async get<T>(
        url: string,
        params?: Record<string, any>,
    ): Promise<NetworkResult<T>> {
        return this.send<T, undefined>(url, 'GET', undefined, params);
    }

    private async post<T, U>(
        url: string,
        payload: U,
    ): Promise<NetworkResult<T>> {
        return this.send<T, U>(url, 'POST', payload);
    }

    private async put<T, U>(
        url: string,
        payload: U,
    ): Promise<NetworkResult<T>> {
        return this.send<T, U>(url, 'PUT', payload);
    }

    private async delete<T, U>(
        url: string,
        payload?: U,
    ): Promise<NetworkResult<T>> {
        return this.send<T, U>(url, 'DELETE', payload);
    }

    async login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<NetworkResult<LoginResponse>> {
        return this.post<LoginResponse, { username: string; password: string }>(
            '/integration/customer/token',
            {
                username: email,
                password,
            },
        );
    }
}

export const apiService = new RestApiService();
