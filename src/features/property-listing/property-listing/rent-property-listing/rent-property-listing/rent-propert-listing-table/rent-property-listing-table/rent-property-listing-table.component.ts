import { Component, DestroyRef, inject, OnInit, Type } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RentPropertyListingFormComponent } from '../rent-property-listing-form/rent-property-listing-form.component';
import { DialogConfig } from '../../../../../property-listing-types/dialog-config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-rent-property-listing-table',
  imports: [TableModule, ButtonModule, SplitButtonModule,
    MultiSelectModule, FormsModule],
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
          this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        },
      },
    ];
  }

  ngOnInit(): void {
    this.RentPropertyListingService.getAllRentPropertyListingByProperOwner(this.userInfo?.uuid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.products = res
      },
      error: (err: { error: { errMsg: string; data: { message: string | undefined; }; }; }) => {
      },
      complete: () => {

      },
    });;
    this.cols = [
      { field: 'propertyCityName', header: 'Property Full Address' },
      { field: 'propertyName', header: 'Property Name' },
      { field: 'availability', header: 'Availability' },
      { field: 'propertyCost', header: 'Property Cost' },
      { field: 'bhkType', header: 'Bhk Type' },
      { field: 'propertyType', header: 'Property Type' },
      { field: 'propertySecurityDeposit', header: 'Security Deposit' },
    ];

    this.selectedColumns = this.cols;
  }

  //this function is to be removed
  showMenu(event: Event, splitBtn: SplitButton, rowIndex: number) {
    // Prevent default click action
    event.preventDefault();

    // Show the menu
    if (splitBtn.menu && !splitBtn.menu.visible) {
      splitBtn.menu.toggle(event);
    }
  }

  createRentListing() {
    let dialogConfigObj: DialogConfig = {
      data: { create: true },
      header: 'Add New Rent Property Listing',
      width: '90%',
      height: '80%',
      showHeader: true,
      closeOnEscape: true,
      dismissableMask: true,
      closable: true
    }
    this.dialogConfig(RentPropertyListingFormComponent, dialogConfigObj)
  }

  editRentListing(propertyRentListData: any) {
    let dialogConfigObj: DialogConfig = {
      data: { edit: true, propertyRentListData: propertyRentListData },
      header: 'Edit Rent Property Listing',
      width: '90%',
      height: '80%',
      showHeader: true,
      closeOnEscape: true,
      dismissableMask: true,
      closable: true
    }
    this.dialogConfig(RentPropertyListingFormComponent, dialogConfigObj)
  }

  dialogConfig(component: Type<any>, dialogConfigObj: DialogConfig) {
    let dialogConfig = new DynamicDialogConfig();
    let ref: DynamicDialogRef;
    dialogConfig.appendTo = "body";
    dialogConfig.data = dialogConfigObj?.data
    dialogConfig.header = dialogConfigObj?.header;
    dialogConfig.width = dialogConfigObj?.width;
    dialogConfig.height = dialogConfigObj?.height;
    dialogConfig.showHeader = dialogConfigObj?.showHeader;
    dialogConfig.closeOnEscape = dialogConfigObj?.closeOnEscape;
    dialogConfig.dismissableMask = dialogConfigObj?.dismissableMask;
    dialogConfig.closable = dialogConfigObj?.closable;
    ref = this.dialogService.open(component, dialogConfig)
    return ref
  }

  getTableRowIndex(event: any, rowIndex: any) {
    this.rowPropertyRentIndex = rowIndex
    console.log(this.rowPropertyRentIndex)
  }
}
