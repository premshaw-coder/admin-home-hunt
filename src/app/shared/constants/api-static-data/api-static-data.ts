import { PropertyListingForm } from "../../../../features/property-listing/property-listing/rent-property-listing/rent-property-listing-interfaces/property-listing-form-interface";

export const ApiStaticData = {
    bhktypeValues: [
        { name: '1BHK', code: '1BHK' },
        { name: '2BHK', code: '2BHK' },
        { name: '3BHK', code: '3BHK' },
        { name: '4BHK', code: '4BHK' },
        { name: '5BHK', code: '5BHK' }
    ] as PropertyListingForm[],
    propertyTypeValues: [
        { name: 'Flats', code: 'Flats' },
        { name: 'Apartment', code: 'Apartment' },
        { name: 'House', code: 'House' },
        { name: 'Villa', code: 'Villa' },
        { name: 'Commercial', code: 'Commercial' }
    ] as PropertyListingForm[],
    propertyPreferredTenantsValues: [
        { name: 'family', code: 'family' }, { name: 'bachelors', code: 'bachelors' }
    ] as PropertyListingForm[],
    furnishingStatusValues: [
        { name: 'furnished', code: 'furnished' }, { name: 'semi-furnished', code: 'semi-furnished' },
        { name: 'unfurnished', code: 'unfurnished' }
    ] as PropertyListingForm[],
    propertyFacingValues: [
        { name: 'east', code: 'east' },
        { name: 'west', code: 'west' },
        { name: 'north', code: 'north' },
        { name: 'south', code: 'south' },
        { name: 'north - east', code: 'north - east' },
        { name: 'north - west', code: 'north - west' },
        { name: 'south - east', code: 'south - east' },
        { name: 'south - west', code: 'south - west' }
    ] as PropertyListingForm[],
    propertyParkingValues: [
        { name: '2wheeler', code: '2wheeler' }, { name: '4wheeler', code: '4wheeler' }, { name: 'both', code: 'both' }
    ] as PropertyListingForm[],
    provertyAvailabilityValues: [
        { name: 'Immediate', code: 0 },
        { name: 'Within 30 days', code: 1 },
        { name: 'Within 45 days', code: 2 },
        { name: 'More than 45 days', code: 3 },
    ] as PropertyListingForm[]
}