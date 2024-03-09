export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse{
  token: string;
  message: string;
}

export enum LoginErrorStatus {
    TwoFactorRequired = 302,
}