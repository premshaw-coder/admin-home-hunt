const BASE_AUTH = 'auth';
const BASE_SUBSCRIPTION = 'subscription';

export const RoutesPaths = {
    // Application Base Path
    BasePath: '/',

    // Authentication Routes
    Auth: {
        base: BASE_AUTH,
        login: `${BASE_AUTH}/login`,
        signUp: `${BASE_AUTH}/sign-up`,
        resetPassword: `${BASE_AUTH}/reset-pass word`,
    },

    // Property Listing Routes
    PropertyListing: {
        create: 'property-listing',
        rent: 'rent',
        sell: 'sell',
        lease: 'lease',
    },

    // Subscription Routes
    Subscription: BASE_SUBSCRIPTION,
} as const;
