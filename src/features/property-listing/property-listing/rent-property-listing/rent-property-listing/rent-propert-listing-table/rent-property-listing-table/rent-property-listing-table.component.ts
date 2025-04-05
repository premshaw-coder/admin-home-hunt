import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { RentPropertyListingFormComponent } from '../rent-property-listing-form/rent-property-listing-form.component';
import { DialogConfig } from '../../../../../property-listing-types/dialog-config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { openDialog, dialogConfigObj } from '../../../../../../../app/shared/reusable-function/common-function';
import { RentPropertyUploadMediaFilesComponent } from '../rent-property-upload-media-files/rent-property-upload-media-files.component';
import { DeleteRentListingComponent } from "../delete-rent-listing/delete-rent-listing.component";
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
  propertyName?: string;
}

@Component({
  selector: 'app-rent-property-listing-table',
  imports: [TableModule, ButtonModule, SplitButtonModule, MultiSelectModule, FormsModule, DeleteRentListingComponent],
  providers: [DialogService],
  templateUrl: './rent-property-listing-table.component.html',
  styleUrl: './rent-property-listing-table.component.scss'
})
export class RentPropertyListingTableComponent implements OnInit {
  public cols!: Column[];
  public selectedColumns!: Column[];
  public items: ({ label: string; icon: string; command: () => void; separator?: undefined; } | { separator: boolean; label?: undefined; icon?: undefined; command?: undefined; })[];
  public products!: any[];
  private userInfo: any = JSON.parse(localStorage.getItem('UserInfo') || '')
  public rowPropertyRentIndex!: number

  @ViewChild('deleteRentListingComponentRef') deleteRentListingComponentRef!: DeleteRentListingComponent;

  private dialogService = inject(DialogService)
  private RentPropertyListingService = inject(RentPropertyListingService)
  private messageService = inject(MessageService)
  private destroyRef = inject(DestroyRef)


  constructor() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.editRentListing(this.products[this.rowPropertyRentIndex])
        },
      },
      {
        separator: true,
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.confirmDeleteRentListing(this.products[this.rowPropertyRentIndex])
        },
      },
      {
        label: 'Upload files',
        icon: 'pi pi-times',
        command: () => {
          this.uploadFiles(this.products[this.rowPropertyRentIndex])
        },
      },
    ];
  }

  ngOnInit(): void {
    this.getAllRentPropertyListingByProperOwner()
    this.cols = [
      { field: 'propertyFullAddress.propertyCityName', header: 'Property Full Address', propertyName: 'propertyCityName' },
      { field: 'propertyDetails.propertyName', header: 'Property Name', propertyName: 'propertyName' },
      { field: 'propertyDetails.availability', header: 'Availability', propertyName: 'availability' },
      { field: 'propertyDetails.propertyCost', header: 'Property Cost', propertyName: 'propertyCost' },
      { field: 'propertyDetails.bhkType', header: 'Bhk Type', propertyName: 'bhkType' },
      { field: 'propertyDetails.propertyType', header: 'Property Type', propertyName: 'propertyType' },
      { field: 'propertyDetails.propertySecurityDeposit', header: 'Security Deposit', propertyName: 'propertySecurityDeposit' },
    ];

    this.selectedColumns = this.cols;
  }

  getAllRentPropertyListingByProperOwner() {
    this.RentPropertyListingService.getAllRentPropertyListingByProperOwner(this.userInfo?.uuid)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res: any) => {
          this.products = res
        },
        error: (err: { error: { errMsg: string; data: { message: string | undefined; }; }; }) => {
        },
        complete: () => {

        },
      });
  }


  public createRentListing() {
    let dialogConfig: DialogConfig = dialogConfigObj(false)
    const createRentListingDialogRef = openDialog(RentPropertyListingFormComponent, dialogConfig, this.dialogService)
    createRentListingDialogRef.onClose.subscribe((res: any) => {
      console.log('Dialog closed with result create:', res);
      if (res.data = 'Create rent listing') this.getAllRentPropertyListingByProperOwner()
    })
  }

  private editRentListing(propertyRentListData: any) {
    let dialogConfig: DialogConfig = dialogConfigObj(true, propertyRentListData)
    const editRentListingDialogRef = openDialog(RentPropertyListingFormComponent, dialogConfig, this.dialogService);
    editRentListingDialogRef.onClose.subscribe((res: any) => {
      console.log('Dialog closed with result edit:', res);
      if (res.data = 'Edit rent listing') this.getAllRentPropertyListingByProperOwner()
    })
  }

  public getTableRowIndex(rowIndex: any) {
    this.rowPropertyRentIndex = rowIndex
    console.log(this.rowPropertyRentIndex)
  }

  uploadFiles(propertyRentListData: any) {
    console.log('propertyRentListData', propertyRentListData)
    let dialogConfig: DialogConfig = dialogConfigObj(true, propertyRentListData)
    openDialog(RentPropertyUploadMediaFilesComponent, dialogConfig, this.dialogService)
  }

  confirmDeleteRentListing(rentPropertyListData: any) {
    this.deleteRentListingComponentRef.deleteRentListing(rentPropertyListData)
  }
}
