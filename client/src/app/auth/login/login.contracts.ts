export interface LoginRequest {
  email: string;
  password: string;
  'g-recaptcha-response': string | null;
}

export interface LoginResponse{
  token: string;
  message: string;
}

export enum LoginErrorStatus {
    TwoFactorRequired = 302,
}