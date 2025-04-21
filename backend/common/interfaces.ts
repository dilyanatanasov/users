export interface User {
    id: number;
    username: string;
    password: string;
    is_active: boolean;
}

export interface UserDTO {
    id: number;
    username: string;
    password: string;
    isActive: boolean;
}

export interface CreateUserDTO {
    username: string;
    password: string;
    isActive: boolean;
}

export interface UpdateUserDTO {
    username?: string;
    password?: string;
    isActive?: boolean;
}