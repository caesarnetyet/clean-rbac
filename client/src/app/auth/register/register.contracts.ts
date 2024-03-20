export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    'g-recaptcha-response': string | null;
}

export type RegisterValidationErrors = {[field: string]: string}

export interface RegisterResponse {
    message: string,
    errors?: RegisterValidationErrors
}
