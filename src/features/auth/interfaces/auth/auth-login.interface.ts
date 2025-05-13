export interface AuthApiResponse {
    name: string;
    email: string;
    auth_type: string;
    user_type: string;
    last_login: string;
    is_registered?: boolean;
    address: Address[]; // Address can be of various formats, keep it generic
    token: string;
    uuid?: string;
    id:string;
}
export interface Address {
    address?: string;
    city?: string;
    state?: string;
    zip?: number;
    country?: string;
}
export interface SubscriptionInfo {
    startDate: Date;
    endDate?: Date;
    subscriptionsType?: 'basic' | 'pro' | 'premium';
}
