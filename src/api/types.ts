import { AxiosError } from 'axios';

export interface ApiService {
    login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<ApiResponse<LoginResponse>>;
}

export interface ApiErrorResponse<T> {
    ok: false;
    originalError: AxiosError;
}

export interface ApiOkResponse<T> {
    ok: true;
    data?: T;
}

export type ApiResponse<T, U = T> = ApiErrorResponse<U> | ApiOkResponse<T>;

export type LoginResponse = string;
