import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service';
@Component({
  selector: 'app-delete-rent-listing',
  imports: [ConfirmDialog, ButtonModule, ToastModule],
  templateUrl: './delete-rent-listing.component.html',
  styleUrl: './delete-rent-listing.component.scss'
})
export class DeleteRentListingComponent {
  @Output() isRentListingPropertyDeleted = new EventEmitter<boolean>();
  private confirmationService = inject(ConfirmationService)
  private messageService = inject(MessageService)
  private RentPropertyListingService = inject(RentPropertyListingService)

  deleteRentListing(rentPropertyListData?: any) {
    console.log('Delete Rent Property Listing:', rentPropertyListData);
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.onDeleteRentPropertyListing(rentPropertyListData._id);
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  onDeleteRentPropertyListing(propertyOwnerId: any) {
    console.log('Delete Rent Property Listing:', propertyOwnerId);
    this.RentPropertyListingService.deleteRentPropertyListing(propertyOwnerId).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Property Listing Deleted Successfully' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Property Listing' });
      },  
      complete: () => {
        this.isRentListingPropertyDeleted.emit(true);
      }
    });
  }
}
