import { PropertyListingForm } from "../../../../features/property-listing/property-listing/rent-property-listing/rent-property-listing-interfaces/property-listing-form-interface";
export const ApiStaticData = {
    bhktypeValues: [
        { name: '1 BHK', code: '1 BHK' },
        { name: '2 BHK', code: '2 BHK' },
        { name: '3 BHK', code: '3 BHK' },
        { name: '4 BHK', code: '4 BHK' },
        { name: '4 BHK+', code: '4 BHK+' }
    ] as PropertyListingForm[],

    availabilityValues: [
        { name: 'Immediate', code: 'Immediate' },
        { name: 'Within 30 Days', code: 'Within 30 Days' },
        { name: 'Within 45 days', code: 'Within 45 days' },
        { name: 'More than 45 days', code: 'More than 45 days' },

    ] as PropertyListingForm[],

    bathroomValues: [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
        { name: '3', code: '3' },
        { name: '4', code: '4' },
        { name: '4+', code: '4+' },

    ] as PropertyListingForm[],

    floorValues: [
        { name: 'Ground', code: 'Ground' },
        { name: '1-5', code: '1-5' },
        { name: '6-10', code: '6-10' },
        { name: '11-15', code: '11-15' },
        { name: '15+', code: '15+' },

    ] as PropertyListingForm[],

    propertyTypeValues: [
        { name: 'Flats', code: 'Flats' },
        { name: 'Apartment', code: 'Apartment' },
        { name: 'House', code: 'House' },
        { name: 'Villa', code: 'Villa' },
        { name: 'Independent House', code: 'Independent House' },
        { name: 'Farm House', code: 'Farm House' },
    ] as PropertyListingForm[],

    propertyPreferredTenantsValues: [
        { name: 'Family', code: 'Family' }, { name: 'Bachelors', code: 'Bachelors' }
    ] as PropertyListingForm[],

    furnishingStatusValues: [
        { name: 'Full-furnished', code: 'Full-furnished' }, { name: 'Semi-furnished', code: 'Semi-furnished' },
        { name: 'Un-furnished', code: 'Un-furnished' }
    ] as PropertyListingForm[],

    propertyFacingValues: [
        { name: 'East', code: 'East' },
        { name: 'West', code: 'West' },
        { name: 'North', code: 'North' },
        { name: 'South', code: 'South' },
        { name: 'North - East', code: 'North - East' },
        { name: 'North - West', code: 'North - West' },
        { name: 'South - East', code: 'South - East' },
        { name: 'South - West', code: 'South - West' }
    ] as PropertyListingForm[],

    propertyParkingValues: [
        { name: '2wheeler', code: '2wheeler' }, { name: '4wheeler', code: '4wheeler' }
    ] as PropertyListingForm[],

    amenitiesValues: [
        { name: 'Water Supply', code: 'Water Supply' },
        { name: 'Attached Bathroom', code: 'Attached Bathroom' },
        { name: 'Security', code: 'Security' },
        { name: 'Lift', code: 'Lift' },
        { name: 'Power Back Up', code: 'Power Back Up' },
        { name: 'Park', code: 'Park' },
        { name: 'Kids Play Area', code: 'Kids Play Area' },
        { name: 'Swimming Pool', code: 'Swimming Pool' }
    ] as PropertyListingForm[]
}