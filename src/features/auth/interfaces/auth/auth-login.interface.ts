export interface AuthApiResponse {
    name: string;
    email: string;
    auth_type: string;
    user_type: string;
    last_login: string;
    is_registered?: boolean;
    address: any[]; // Address can be of various formats, keep it generic
    token: string;
    uuid?: string;
}