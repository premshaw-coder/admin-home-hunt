import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ApiStaticData } from '../../../../../../../app/shared/constants/api-static-data/api-static-data';
import { SelectModule } from 'primeng/select';
import { NgClass } from '@angular/common';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthApiResponse } from '../../../../../../auth/interfaces/auth/auth-login.interface';
import { PropertyDetails, PropertyListing } from '../../../rent-property-listing-interfaces/property-listing-interface';
import { PropertyListingForm } from '../../../rent-property-listing-interfaces/property-listing-form-interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rent-property-listing-form',
  imports: [StepperModule, ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule,
    ToggleSwitchModule, SelectModule, NgClass
  ],
  providers: [RentPropertyListingService, HttpClient],
  templateUrl: './rent-property-listing-form.component.html',
  styleUrl: './rent-property-listing-form.component.scss',
})
export class RentPropertyListingFormComponent implements OnInit {
  public RentPropertyListingForm!: FormGroup;
  private readonly bhktypeValues: PropertyListingForm[] = ApiStaticData.bhktypeValues;
  private readonly propertypeValues: PropertyListingForm[] = ApiStaticData.propertyTypeValues;
  private readonly propertyPreferredTenantsValues: PropertyListingForm[] = ApiStaticData.propertyPreferredTenantsValues;
  private readonly furnishingStatusValues: PropertyListingForm[] = ApiStaticData.furnishingStatusValues;
  private readonly propertyFacingValues: PropertyListingForm[] = ApiStaticData.propertyFacingValues;
  private readonly propertyParkingValues: PropertyListingForm[] = ApiStaticData.propertyParkingValues;
  private readonly userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}')
  private isEditMode!: boolean;
  private rentPropertyData!: PropertyListing

  public readonly dialogConfig = inject(DynamicDialogConfig)
  public readonly dialogRef = inject(DynamicDialogRef)
  private readonly messageService = inject(MessageService);
  private readonly rentPropertyListingService = inject(RentPropertyListingService)
  private readonly destroyRef = inject(DestroyRef)

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
    { id: 14, control: 'propertyPostedBy', placeholder: 'Enter Owner name' },
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
    this.testFormData()
    this.isEditMode = this.dialogConfig?.data?.edit ?? false;
    this.rentPropertyData = this.dialogConfig?.data?.propertyRentListData;
    this.patchFormData()
  }

  public onSubmit(): void {
    if (this.RentPropertyListingForm.invalid) return;
    else if (!this.isEditMode) {
      this.createRentPropertyListing(this.createPaylaod())
      return;
    }
    else this.editRentPropertyListing(this.createPaylaod())
  }

  private editRentPropertyListing(formData: PropertyListing): void {
    this.rentPropertyListingService.editRentPropertyListing(formData, this.rentPropertyData?._id ?? '').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Property listing edited sucessfully', life: 3000 });
      },
      error: (err: Error) => {
        console.error('Error occurred while editing rent property listing:', err);
      },
      complete: () => {
        this.RentPropertyListingForm.reset()
        this.dialogRef.close({ action: 'submit', data: 'Edit rent listing' });
      },
    });
  }

  private createPaylaod(): PropertyListing {
    const propertyDetailFormData = this.RentPropertyListingForm.get('propertyDetails')
    const formData: PropertyListing = {
      ...this.RentPropertyListingForm.value, propertyDetails: {
        ...propertyDetailFormData?.value,
        bhkType: this.getSelectedValueAsString('propertyDetails', 'bhkType'),
        propertyPreferredTenants: this.getSelectedValueAsString('propertyDetails', 'propertyPreferredTenants'),
        furnishingStatus: this.getSelectedValueAsString('propertyDetails', 'furnishingStatus'),
        propertyFacing: this.getSelectedValueAsString('propertyDetails', 'propertyFacing'),
        propertyParking: this.getSelectedValueAsString('propertyDetails', 'propertyParking'),
        propertyType: this.getSelectedValueAsString('propertyDetails', 'propertyType'),
        propertyCoveredArea: +propertyDetailFormData?.get('propertyCoveredArea')?.value,
        propertyOwner: this.userInfo?.uuid,
        propertyPostedBy: this.userInfo?.name
      }
    }
    return formData
  }

  private patchFormData(): void {
    // Patching the form with the provided data
    const rentPropertyDetailsData: PropertyDetails = this.rentPropertyData?.propertyDetails
    this.RentPropertyListingForm.patchValue(this.rentPropertyData);
    this.patchValueForSelectDropdownData('bhkType', this.bhktypeValues, rentPropertyDetailsData?.bhkType)
    this.patchValueForSelectDropdownData('furnishingStatus', this.furnishingStatusValues, rentPropertyDetailsData?.furnishingStatus)
    this.patchValueForSelectDropdownData('propertyFacing', this.propertyFacingValues, rentPropertyDetailsData?.propertyFacing)
    this.patchValueForSelectDropdownData('propertyParking', this.propertyParkingValues, rentPropertyDetailsData?.propertyParking)
    this.patchValueForSelectDropdownData('propertyType', this.propertypeValues, rentPropertyDetailsData?.propertyType)
    this.patchValueForSelectDropdownData('propertyPreferredTenants', this.propertyPreferredTenantsValues, rentPropertyDetailsData?.propertyPreferredTenants)
  }

  private patchValueForSelectDropdownData(FormControlName: string, selectOptionData: PropertyListingForm[], selectedData: string): void {
    const selectedDropdownFormData = selectOptionData.find((data: PropertyListingForm) => data.name === selectedData)
    this.RentPropertyListingForm.get('propertyDetails')?.get(FormControlName)?.patchValue(selectedDropdownFormData);
  }

  private testFormData() {
    // Assuming these are the values to be patched
    const propertyData = {
      propertyFullAddress: {
        propertyCityName: 'Bengaluru',
        houseNumber: '123',
        street: 'Main Street',
        area: 'Koramangala',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        pincode: '560034',
        landmark: 'Near Forum Mall',
        latitude: '12.9352',
        longitude: '77.6245'
      },
      propertyDetails: {
        propertyName: 'Cozy Apartment',
        propertyDescription: 'A cozy 2BHK apartment in the heart of the city',
        propertyOwner: 'John Doe',
        propertyPostedBy: 'John Doe',
        propertyCost: '35000',
        availability: 'Immediate',
        bhkType: this.bhktypeValues[0],
        propertyType: this.propertypeValues[0],
        propertySecurityDeposit: '100000',
        propertyPostedOnDate: '2025-02-26',
        propertyCoveredArea: '1200',
        propertyPreferredTenants: this.propertyPreferredTenantsValues[0],
        furnishingStatus: this.furnishingStatusValues[0],
        propertyFacing: this.propertyFacingValues[0],
        propertTotalBathroom: '2',
        propertyParking: this.propertyParkingValues[0],
        propertyFloors: '3'
      },
      propertyAmnities: {
        waterSupply: true,
        attachedBathroom: true,
        security: true,
        lift: true
      }
    };

    // Patching the form with the provided data
    this.RentPropertyListingForm.patchValue(propertyData);

  }

  private initiliseForm(): void {
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
  }

  private getSelectedValueAsString(formGroupName: string, FormControlName: string): string {
    const selectedValue = this.RentPropertyListingForm.get(formGroupName)?.get(FormControlName)?.value ?? {}
    return selectedValue?.['name'] ?? "";
  }

  private createRentPropertyListing(formData: PropertyListing): void {
    this.rentPropertyListingService.createRentPropertyListing(formData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Property listing created sucessfully', life: 3000 });
      },
      error: (err: Error) => {
        this.messageService.add({ severity: 'info', summary: 'Error', detail: err.message, life: 3000 });
      },
      complete: () => {
        this.RentPropertyListingForm.reset()
        this.dialogRef.close({ action: 'submit', data: 'Create rent listing' });
      },
    });
  }

}
