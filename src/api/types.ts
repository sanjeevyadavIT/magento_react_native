export interface ApiService {
  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<NetworkResult<LoginResponse>>;
}

export type NetworkResult<T> =
  | {status: 'SUCCESS'; data: T}
  | {status: 'ERROR'; message: string};

export type LoginResponse = string;
