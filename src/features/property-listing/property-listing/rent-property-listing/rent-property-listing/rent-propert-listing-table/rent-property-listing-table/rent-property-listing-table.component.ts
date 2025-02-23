import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RentPropertyListingFormComponent } from '../rent-property-listing-form/rent-property-listing-form.component';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
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
  private ref: DynamicDialogRef | undefined;

  private dialogService = inject(DialogService)
  private RentPropertyListingService = inject(RentPropertyListingService)
  private messageService = inject(MessageService)

  constructor() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
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
    this.RentPropertyListingService.getProducts().then((data) => {
      this.products = data;
      // this.cd.markForCheck();
    });
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    this.selectedColumns = this.cols;
  }

  //this function is to be removed
  showMenu(event: Event, splitBtn: SplitButton) {
    // Prevent default click action
    event.preventDefault();

    // Show the menu
    if (splitBtn.menu && !splitBtn.menu.visible) {
      splitBtn.menu.toggle(event);
    }
  }

  createRentListing() {
    let dialogConfig = new DynamicDialogConfig();
    dialogConfig.appendTo = "body";
    dialogConfig.header = 'Add New Rent Property Listing';
    dialogConfig.width = '90%';
    dialogConfig.height = '80%';
    dialogConfig.showHeader = true;
    dialogConfig.closeOnEscape = true;
    dialogConfig.dismissableMask = true;
    dialogConfig.closable = true;
    this.ref = this.dialogService.open(RentPropertyListingFormComponent, dialogConfig)
  }
}
