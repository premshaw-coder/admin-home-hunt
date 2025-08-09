export interface PropertyListing {
    propertyFullAddress: PropertyFullAddress;
    propertyAmnities: PropertyAmnities;
    propertyDetails: PropertyDetails;
    propertyReviews?: PropertyReview[]; // Adjust if you define a structure for reviews
    _id?: string;
    __v?: number;
}

export interface PropertyFullAddress {
    propertyCityName: string;
    houseNumber: string;
    street: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
    landmark: string;
    latitude: number;
    longitude: number;
    _id?: string;
}

export interface PropertyAmnities {
    waterSupply: boolean;
    attachedBathroom: boolean;
    security: boolean;
    lift: boolean;
    _id?: string;
}

export interface PropertyImage {
    fileName: string;
    url: string;
    fileSize: number;
    fileUploadedTime: string; // Can be `Date` if parsed
    fileExpirationTime: string; // Can be `Date` if parsed
    _id?: string;
}

export interface PropertyReview {
    reviewUser?: string;      // Optional field, as `required: false`
    reviewText?: string;      // Optional field
    reviewRating?: number;    // Optional field
}

export interface PropertyDetails {
    propertyName: string;
    propertyDescription: string;
    propertyOwner: string;
    propertyPostedBy: string;
    propertyCost: number;
    availability: 0 | 1 | 2 | 3;
    bhkType: string;
    propertyType: string;
    propertySecurityDeposit: number;
    propertyPostedOnDate: string; // Use `Date` if it's converted before use
    propertyCoveredArea: number;
    propertyPreferredTenants: string;
    furnishingStatus: string;
    propertyFacing: string;
    propertTotalBathroom: number;
    propertyParking: string;
    propertyFloors: number;
    _id?: string;
    propertyImages?: PropertyImage[]; // You can replace `any` with a proper image type if needed
}
