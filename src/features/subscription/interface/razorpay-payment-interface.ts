export interface RazorPayOrderCreation {
    amount: number;
    amount_due?: number;
    amount_paid?: number;
    attempts?: number;
    created_at?: number;
    currency?: string;
    entity?: string;
    id?: string;
    notes?: {
        userId: string;
    };
    offer_id?: string | null;
    receipt?: string;
    status?: string;
    billingCycle?: string;
    subscriptionCategory?: string;
}

export interface RazorPayPaymentDetails {
    razorpay_order_id: string
    razorpay_payment_id: string

    razorpay_signature: string
}

export interface RazorPayOrderCreationPayload {
    amount: number,
    receipt: string,
    payment_capture: number,
    userId: string
}