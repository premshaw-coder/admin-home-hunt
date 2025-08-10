export interface SubscriptionStatus {
    userId: string;
    subscription_status: string;
    message: string;
    subscriptionInfo?: SubscriptionInfo;
}

export interface SubscriptionInfo {
    startDate: Date;
    endDate: Date;
    subscriptionsType: 'basic' | 'pro' | 'premium';
    transactionId: string;
}