import { PropertyListingForm } from "../../../../features/property-listing/property-listing/rent-property-listing/rent-property-listing-interfaces/property-listing-form-interface";
import { SubscriptionInfoDetails } from "../../../../features/subscription/interface/subscription-info-details.interface";

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


    subscriptionInfoData: [
        // 1 Month Plans
        [
            {
                id: 1,
                duration: '1 Month',
                amount: 1000,
                title: 'Basic',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            },
            {
                id: 2,
                duration: '1 Month',
                amount: 2000,
                title: 'Premium',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            },
            {
                id: 3,
                duration: '1 Month',
                amount: 3000,
                title: 'Pro',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            }
        ],

        // 2 Months Plans
        [
            {
                id: 4,
                duration: '2 Months',
                amount: 4000,
                title: 'Basic',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            },
            {
                id: 5,
                duration: '2 Months',
                amount: 5000,
                title: 'Premium',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            },
            {
                id: 6,
                duration: '2 Months',
                amount: 6000,
                title: 'Pro',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            }
        ],

        // 3 Months Plans
        [
            {
                id: 7,
                duration: '3 Months',
                amount: 7000,
                title: 'Basic',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            },
            {
                id: 8,
                duration: '3 Months',
                amount: 8000,
                title: 'Premium',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            },
            {
                id: 9,
                duration: '3 Months',
                amount: 9000,
                title: 'Pro',
                features: [
                    'Access to basic features',
                    'Limited storage',
                    'Standard support'
                ]
            }
        ]
    ] as SubscriptionInfoDetails[][]
}