const BASE_PROPERTY_RENT = '/property-rent';
const BASE_RAZORPAY_PAYMENT = 'razorpay';

export const ApiEndPoints = {
    //auth endpoints
    Auth: {
        login: 'login',
        signUp: 'signup',
        regenerateJwtToken: 're-generate-jwt-token/',
    },

    //rent property list endpoint
    RentProperty: {
        addListing: `${BASE_PROPERTY_RENT}/add-house`,
        editListing: `${BASE_PROPERTY_RENT}/update-house-by-propertyOwner/`,
        getAllPropertyListingByByOwner: `${BASE_PROPERTY_RENT}/get-all-house-by-propertyOwner/`,
        deleteS3Files: `${BASE_PROPERTY_RENT}/delete-files`,
        deleteListing: `${BASE_PROPERTY_RENT}/delete-house/`,
        regenerateS3FilesSignedUrl: `${BASE_PROPERTY_RENT}/re-generate-signed-url/`,
        uploadS3Files: `${BASE_PROPERTY_RENT}/files-upload/`,
    },

    //subscription endpoints
    Subscription: {
        status: 'subscription_status/',
        checkAndExpireUser: 'expire_subscribed_user/',
        subscriptionPlanByUserCategory: 'v1/offers/get-subscription-plan-category/'
    },

    // Razorpay payment endpoints
    RazorpayPayment: {
        createOrder: `${BASE_RAZORPAY_PAYMENT}/order`,
        verifyPayment: `${BASE_RAZORPAY_PAYMENT}/verify-payment`,
    },
} as const;