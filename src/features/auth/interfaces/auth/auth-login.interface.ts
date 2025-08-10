export interface AuthApiResponse {
    readonly name: string;
    readonly email: string;
    readonly auth_type: string;
    readonly user_type: string;
    readonly last_login: string;
    readonly is_registered?: boolean;
    readonly address: Address[]; // Address can be of various formats, keep it generic
    readonly token: string;
    readonly uuid?: string;
    readonly id?: string;
}
export interface Address {
    readonly address?: string;
    readonly city?: string;
    readonly state?: string;
    readonly zip?: number;
    readonly country?: string;
}
export interface SubscriptionInfo {
    readonly startDate: Date;
    readonly endDate?: Date;
    readonly subscriptionsType?: 'basic' | 'pro' | 'premium';
}
