import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { Table } from 'primeng/table';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
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
  imports: [TableModule, ToastModule, IconFieldModule, ButtonModule,
    SplitButtonModule, MultiSelectModule, FormsModule],
  templateUrl: './rent-property-listing-table.component.html',
  styleUrl: './rent-property-listing-table.component.scss'
})
export class RentPropertyListingTableComponent implements OnInit {



  @ViewChild('dt') dt!: Table;

  cols!: Column[];
  selectedColumns!: Column[];

  exportColumns!: ExportColumn[];
  items: ({ label: string; icon: string; command: () => void; separator?: undefined; } | { separator: boolean; label?: undefined; icon?: undefined; command?: undefined; })[];
  products!: any[];

  constructor(
    private RentPropertyListingService: RentPropertyListingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) {
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
      this.cd.markForCheck();
    });
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    this.selectedColumns = this.cols;
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  showMenu(event: Event, splitBtn: SplitButton) {
    // Prevent default click action
    event.preventDefault();

    // Show the menu
    if (splitBtn.menu && !splitBtn.menu.visible) {
      splitBtn.menu.toggle(event);
    }
  }
}
