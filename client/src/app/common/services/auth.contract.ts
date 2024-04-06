interface Role{
    id: number;
    name: string;
}

export enum UserRole {
    Admin = 1,
    Coordinator = 2,
    User = 3
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
