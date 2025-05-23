import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service';
import { PropertyListing } from '../../../rent-property-listing-interfaces/property-listing-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef)

  deleteRentListing(rentPropertyListData?: PropertyListing) {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.onDeleteRentPropertyListing(rentPropertyListData?._id || '');
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  onDeleteRentPropertyListing(propertyOwnerId: string) {
    this.RentPropertyListingService.deleteRentPropertyListing(propertyOwnerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Property Listing Deleted Successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Property Listing' });
      },  
      complete: () => {
        this.isRentListingPropertyDeleted.emit(true);
      }
    });
  }
}
