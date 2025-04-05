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
    regenerateFilesSignedUrl: '/re-generate-signed-url/',
    uploadRentPropertyFiles: '/property-rent/files-upload/',
}