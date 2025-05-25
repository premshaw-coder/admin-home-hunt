export const ApiEndPoints = {
    //auth endpoints
    login: 'login',
    signUp: 'signup',

    //rent property list endpoint
    addRentListing: '/property-rent/add-house',
    editRentListing: '/property-rent/update-house-by-propertyOwner/',
    getAllRentPropertyListingByProperOwner: '/property-rent/get-all-house-by-propertyOwner/',
    deleteRentPropertyFiles: '/property-rent/delete-files',
    deleteRentProperty: '/property-rent/delete-house/',
    regenerateFilesSignedUrl: '/property-rent/re-generate-signed-url/',
    uploadRentPropertyFiles: '/property-rent/files-upload/',
    subscriptionStatus: 'subscription_status/',
    checkAndExpireSubscribedUser: 'expire_subscribed_user/',
    regenerateJwtToken: 're-generate-jwt-token/',

    createRazorpayOrder: 'razorpay/order',
    verifyRazorPayPayment: 'razorpay/verify-payment'
}

// const BASE_PROPERTY_RENT = '/property-rent';

// export const ApiEndPoints = {
//     auth: {
//         login: 'login',
//         signUp: 'signup',
//         regenerateJwtToken: 're-generate-jwt-token/',
//     },
//     rentProperty: {
//         add: `${BASE_PROPERTY_RENT}/add-house`,
//         edit: `${BASE_PROPERTY_RENT}/update-house-by-propertyOwner/`,
//         getAllByOwner: `${BASE_PROPERTY_RENT}/get-all-house-by-propertyOwner/`,
//         deleteFiles: `${BASE_PROPERTY_RENT}/delete-files`,
//         delete: `${BASE_PROPERTY_RENT}/delete-house/`,
//         regenerateFilesSignedUrl: `${BASE_PROPERTY_RENT}/re-generate-signed-url/`,
//         uploadFiles: `${BASE_PROPERTY_RENT}/files-upload/`,
//     },
//     subscription: {
//         status: 'subscription_status/',
//         checkAndExpire: 'expire_subscribed_user/',
//     },
// };