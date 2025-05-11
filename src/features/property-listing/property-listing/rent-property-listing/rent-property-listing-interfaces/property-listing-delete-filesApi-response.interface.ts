import { PropertyListing } from "./property-listing-interface";

export interface PropertyListingDeleteFilesApiResponse {
    success: boolean;
    message: string;
    data: PropertyListing;
}