import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ApiStaticData } from '../../../../../../../app/shared/api-static-data/api-static-data';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-rent-property-listing-form',
  imports: [StepperModule, ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule,
    ToggleSwitchModule, SelectModule
  ],
  templateUrl: './rent-property-listing-form.component.html',
  styleUrl: './rent-property-listing-form.component.scss'
})
export class RentPropertyListingFormComponent {
  RentPropertyListingForm!: FormGroup;
  public bhktypeValues = ApiStaticData.bhktypeValues;
  public propertypeValues = ApiStaticData.propertyTypeValues;
  public propertyPreferredTenantsValues = ApiStaticData.propertyPreferredTenantsValues;
  public furnishingStatusValues = ApiStaticData.furnishingStatusValues;
  public propertyFacingValues = ApiStaticData.propertyFacingValues;
  public propertyParkingValues = ApiStaticData.propertyParkingValues;

  public propertyFullAddressFormData = [
    { id: 1, name: 'propertyCityName', placeholder: 'Enter city' },
    { id: 2, name: 'houseNumber', placeholder: 'Enter house number' },
    { id: 3, name: 'street', placeholder: 'Enter street' },
    { id: 4, name: 'area', placeholder: 'Enter area' },
    { id: 5, name: 'city', placeholder: 'Enter city' },
    { id: 6, name: 'state', placeholder: 'Enter state' },
    { id: 7, name: 'country', placeholder: 'Enter country' },
    { id: 8, name: 'pincode', placeholder: 'Enter pincode' },
    { id: 9, name: 'landmark', placeholder: 'Enter landmark' },
    { id: 10, name: 'latitude', placeholder: 'Enter latitude' },
    { id: 11, name: 'longitude', placeholder: 'Enter longitude' },
  ];

  public propertyDetailsFormInputData = [
    { id: 11, name: 'propertyName', placeholder: 'Enter property' },
    { id: 12, name: 'propertyDescription', placeholder: 'Enter description' },
    { id: 13, name: 'street', placeholder: 'Enter street' },
    { id: 14, name: 'area', placeholder: 'Enter area' },
    { id: 15, name: 'city', placeholder: 'Enter city' },
    { id: 16, name: 'state', placeholder: 'Enter state' },
    { id: 17, name: 'country', placeholder: 'Enter country' },
    { id: 18, name: 'pincode', placeholder: 'Enter pincode' },
    { id: 19, name: 'landmark', placeholder: 'Enter landmark' },
    { id: 20, name: 'latitude', placeholder: 'Enter latitude' },
    { id: 21, name: 'longitude', placeholder: 'Enter longitude' },
  ];


  ngOnInit() {
    this.initiliseForm()
  }

  initiliseForm() {
    this.RentPropertyListingForm = new FormGroup({
      propertyFullAddress: new FormGroup({
        propertyCityName: new FormControl('', Validators.required),
        houseNumber: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
        landmark: new FormControl('', Validators.required),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
      }),
      propertyDetails: new FormGroup({
        propertyName: new FormControl('', Validators.required),
        propertyDescription: new FormControl('', Validators.required),
        propertyOwner: new FormControl('', Validators.required),
        propertyPostedBy: new FormControl('', Validators.required),
        propertyCost: new FormControl('', Validators.required),
        availability: new FormControl('', Validators.required),
        bhkType: new FormControl('', Validators.required),
        propertyType: new FormControl('', Validators.required),
        propertySecurityDeposit: new FormControl('', Validators.required),
        propertyPostedOnDate: new FormControl('', Validators.required),
        propertyCoveredArea: new FormControl('', Validators.required),
        propertyPreferredTenants: new FormControl('', Validators.required),
        furnishingStatus: new FormControl('', Validators.required),
        propertyFacing: new FormControl('', Validators.required),
        propertTotalBathroom: new FormControl('', Validators.required),
        propertyParking: new FormControl('', Validators.required),
        propertyFloors: new FormControl('', Validators.required),
      }),
      propertyAmnities: new FormGroup({
        waterSupply: new FormControl('', Validators.required),
        attachedBathroom: new FormControl('', Validators.required),
        security: new FormControl('', Validators.required),
        lift: new FormControl('', Validators.required)
      }),
    });

    console.log(this.RentPropertyListingForm.get('propertyFullAddress'));
  }

  onSubmit() {
    console.log(this.RentPropertyListingForm.value);
  }
}
