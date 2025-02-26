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
  private bhktypeValues = ApiStaticData.bhktypeValues;
  private propertypeValues = ApiStaticData.propertyTypeValues;
  private propertyPreferredTenantsValues = ApiStaticData.propertyPreferredTenantsValues;
  private furnishingStatusValues = ApiStaticData.furnishingStatusValues;
  private propertyFacingValues = ApiStaticData.propertyFacingValues;
  private propertyParkingValues = ApiStaticData.propertyParkingValues;
  
  
  public propertyFullAddressFormData = [
    { id: 1, control: 'propertyCityName', placeholder: 'Enter city' },
    { id: 2, control: 'houseNumber', placeholder: 'Enter house number' },
    { id: 3, control: 'street', placeholder: 'Enter street' },
    { id: 4, control: 'area', placeholder: 'Enter area' },
    { id: 5, control: 'city', placeholder: 'Enter city' },
    { id: 6, control: 'state', placeholder: 'Enter state' },
    { id: 7, control: 'country', placeholder: 'Enter country' },
    { id: 8, control: 'pincode', placeholder: 'Enter pincode' },
    { id: 9, control: 'landmark', placeholder: 'Enter landmark' },
    { id: 10, control: 'latitude', placeholder: 'Enter latitude' },
    { id: 11, control: 'longitude', placeholder: 'Enter longitude' },
  ];
  
  public propertyDetailsFormInputData = [
    { id: 12, control: 'propertyName', placeholder: 'Enter property' },
    { id: 13, control: 'propertyDescription', placeholder: 'Enter description' },
    { id: 14, control: 'propertyOwner', placeholder: 'Enter Owner' },
    { id: 15, control: 'propertyCost', placeholder: 'Enter Cost' },
    { id: 16, control: 'availability', placeholder: 'Enter availability' },
    { id: 17, control: 'propertySecurityDeposit', placeholder: 'Enter security eposit' },
    { id: 18, control: 'propertyCoveredArea', placeholder: 'covered area' },
    { id: 19, control: 'propertTotalBathroom', placeholder: 'Enter total bathroom' },
    { id: 20, control: 'propertyFloors', placeholder: 'Enter floors' },
  ];
  
  public propertyDetailsFormSelectData = [
    { id: 21, control: 'bhkType', placeholder: 'Enter bhk', values: this.bhktypeValues },
    { id: 22, control: 'furnishingStatus', placeholder: 'Enter furnishing', values: this.furnishingStatusValues },
    { id: 23, control: 'propertyFacing', placeholder: 'Enter Facing', values: this.propertyFacingValues },
    { id: 24, control: 'propertyParking', placeholder: 'Enter Parking', values: this.propertyParkingValues },
    { id: 25, control: 'propertyType', placeholder: 'Enter Type', values: this.propertypeValues },
    { id: 26, control: 'propertyPreferredTenants', placeholder: 'Enter preferred tenants', values: this.propertyPreferredTenantsValues },
  ]
  
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
