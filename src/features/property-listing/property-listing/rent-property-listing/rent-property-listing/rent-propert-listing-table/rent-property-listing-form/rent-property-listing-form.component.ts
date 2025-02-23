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
  ngOnInit() {
    this.RentPropertyListingForm = new FormGroup({
      propertyCityName: new FormControl('', Validators.required),
      propertyFullAddress: new FormGroup({
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
  }

  onSubmit() {
    console.log(this.RentPropertyListingForm.value);
  }
}
