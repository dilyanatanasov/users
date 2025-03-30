export type User = {
    id: number,
    username: string,
    password: string,
    isActive: boolean,
}

export type CreateUser = {
    username: string,
    password: string,
    isActive: boolean,
}