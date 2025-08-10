import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { RentPropertyListingFormComponent } from '../rent-property-listing-form/rent-property-listing-form.component';
import { DialogConfig } from '../../../../../property-listing-types/dialog-config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { openDialog, dialogConfigObj } from '../../../../../../../app/shared/reusable-function/common-function';
import { RentPropertyUploadMediaFilesComponent } from '../rent-property-upload-media-files/rent-property-upload-media-files.component';
import { DeleteRentListingComponent } from "../delete-rent-listing/delete-rent-listing.component";
import { RentPropertyFilesUploadService } from '../../../services/files-upload/rent-property-files-upload.service';
import { AuthApiResponse } from '../../../../../../auth/interfaces/auth/auth-login.interface';
import { PropertyListing } from '../../../rent-property-listing-interfaces/property-listing-interface';
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
  @ViewChild('deleteRentListingComponentRef') deleteRentListingComponentRef!: DeleteRentListingComponent;
  @ViewChild(RentPropertyUploadMediaFilesComponent) rentPropertyUploadMediaFilesComponent!: RentPropertyUploadMediaFilesComponent;

  public cols!: Column[];
  public selectedColumns!: Column[];
  public items: ({ label: string; icon: string; command: () => void; separator?: undefined; } | { separator: boolean; label?: undefined; icon?: undefined; command?: undefined; })[];
  public products!: PropertyListing[];
  private rowPropertyRentIndex!: number
  private readonly userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}')

  private readonly dialogService = inject(DialogService)
  private readonly RentPropertyListingService = inject(RentPropertyListingService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly S3FilesService = inject(RentPropertyFilesUploadService);



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
      { field: 'propertyFullAddress.city', header: 'City', propertyName: 'city' },
      { field: 'propertyDetails.propertyName', header: 'Property Name', propertyName: 'propertyName' },
      { field: 'propertyDetails.availability', header: 'Availability', propertyName: 'availability' },
      { field: 'propertyDetails.propertyCost', header: 'Property Cost', propertyName: 'propertyCost' },
      { field: 'propertyDetails.bhkType', header: 'Bhk Type', propertyName: 'bhkType' },
      { field: 'propertyDetails.propertyType', header: 'Property Type', propertyName: 'propertyType' },
      { field: 'propertyDetails.propertySecurityDeposit', header: 'Security Deposit', propertyName: 'propertySecurityDeposit' },
    ];

    this.selectedColumns = this.cols;
    this.onRegeneratedSignedUrlFilesUploadedToS3bucket()
  }

  public createRentListing(): void {
    const dialogConfig: DialogConfig = dialogConfigObj(false)
    const createRentListingDialogRef = openDialog(RentPropertyListingFormComponent, dialogConfig, this.dialogService)
    createRentListingDialogRef.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: { action: string; data: string }) => {
      if (res?.data === 'Create rent listing') this.getAllRentPropertyListingByProperOwner()
    })
  }

  public getTableRowIndex(rowIndex: number): void {
    this.rowPropertyRentIndex = rowIndex
  }

  public updateRentListingTableDataOnRentPropertyDelete(): void {
    this.getAllRentPropertyListingByProperOwner()
  }

  private onRegeneratedSignedUrlFilesUploadedToS3bucket(): void {
    this.S3FilesService.refetchRentPropertyTableData.asObservable().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: boolean) => {
      if (res) this.getAllRentPropertyListingByProperOwner()
    })
  }

  private confirmDeleteRentListing(rentPropertyListData: PropertyListing): void {
    this.deleteRentListingComponentRef.isShowConfirmPopUpVisible = true;
    setTimeout(()=>{
      this.deleteRentListingComponentRef.deleteRentListing(rentPropertyListData)
    },0)
  }

  private uploadFiles(propertyRentListData: PropertyListing): void {
    const dialogConfig: DialogConfig = dialogConfigObj(true, propertyRentListData)
    const RentPropertyUploadFilesDialogRef = openDialog(RentPropertyUploadMediaFilesComponent, dialogConfig, this.dialogService)
    RentPropertyUploadFilesDialogRef.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: { action: string; data: { isFilesUploadedToS3bucket: boolean } }) => {
      if (res?.data?.isFilesUploadedToS3bucket) this.getAllRentPropertyListingByProperOwner()
    })
  }

  private editRentListing(propertyRentListData: PropertyListing): void {
    const dialogConfig: DialogConfig = dialogConfigObj(true, propertyRentListData)
    const editRentListingDialogRef = openDialog(RentPropertyListingFormComponent, dialogConfig, this.dialogService);
    editRentListingDialogRef.onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: { action: string; data: string }) => {
      if (res.data === 'Edit rent listing') this.getAllRentPropertyListingByProperOwner()
    })
  }

  private getAllRentPropertyListingByProperOwner(): void {
    this.RentPropertyListingService.getAllRentPropertyListingByProperOwner(this.userInfo?.uuid ?? '')
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res: PropertyListing[]) => {
          this.products = res
        },
      });
  }
}
