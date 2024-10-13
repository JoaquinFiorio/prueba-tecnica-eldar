export interface UserResponse {
    findUser: UserInfo
}

export interface UserInfo {
    id?: string;
    username: string;
    name: string;
    last_name: string;
    rol: string;
    createdAt: Date;
}