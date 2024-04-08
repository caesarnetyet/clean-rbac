export interface ListUsersResponse {
    message: string;
    data: UserDTO[];
}

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    active: boolean;
    disableURL?: string;
    enableURL?: string;
    role: RoleDTO
}

interface RoleDTO {
    id: number;
    name: string;
}