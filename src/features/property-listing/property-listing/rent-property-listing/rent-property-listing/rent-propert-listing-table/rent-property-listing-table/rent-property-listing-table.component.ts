import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-rent-property-listing-table',
  imports: [TableModule, ButtonModule, SplitButtonModule, MultiSelectModule, FormsModule],
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
  public showMenu(event: Event, splitBtn: SplitButton, rowIndex: number) {
    // Prevent default click action
    event.preventDefault();

    // Show the menu
    if (splitBtn.menu && !splitBtn.menu.visible) {
      splitBtn.menu.toggle(event);
    }
  }

  public createRentListing() {
    let dialogConfig: DialogConfig = dialogConfigObj(false)
    openDialog(RentPropertyListingFormComponent, dialogConfig, this.dialogService)
  }

  private editRentListing(propertyRentListData: any) {
    let dialogConfig: DialogConfig = dialogConfigObj(true, propertyRentListData)
    openDialog(RentPropertyListingFormComponent, dialogConfig, this.dialogService)
  }

  public getTableRowIndex(rowIndex: any) {
    this.rowPropertyRentIndex = rowIndex
    console.log(this.rowPropertyRentIndex)
  }
}
