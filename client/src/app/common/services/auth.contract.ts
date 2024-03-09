interface Role{
    id: number;
    name: string;
}

export enum UserRole {
    Admin = 1,
    User = 2
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}
