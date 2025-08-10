import { Component, DestroyRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RentPropertyListingService } from '../../../services/rent-property-listing.service';
import { PropertyListing } from '../../../rent-property-listing-interfaces/property-listing-interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationPopupComponent } from "../../../../../../../app/shared/components/confirmation-popup/confirmation-popup.component";
import { ConfirmPopUpConfig } from '../../../../../../../app/shared/interfaces/confirmDialog.interface';
@Component({
  selector: 'app-delete-rent-listing',
  imports: [ButtonModule, ToastModule, ConfirmationPopupComponent],
  templateUrl: './delete-rent-listing.component.html',
  styleUrl: './delete-rent-listing.component.scss'
})
export class DeleteRentListingComponent {
  @ViewChild('confirmPopUp', { static: false }) confirmPopUp!: ConfirmationPopupComponent;

  @Output() isRentListingPropertyDeleted = new EventEmitter<boolean>();
  public isShowConfirmPopUpVisible = false // temparory solution

  private readonly messageService = inject(MessageService)
  private readonly RentPropertyListingService = inject(RentPropertyListingService)
  private readonly destroyRef = inject(DestroyRef)

  // its being used to delete the rent property listing in viewChild of rent-property-listing-table.component.ts
  public deleteRentListing(rentPropertyListData?: PropertyListing): void {
    const { header, message } = this.CreateMessageAndHeaderTitle();
    const confirmPopUpConfig: ConfirmPopUpConfig = this.confirmPopUp.confirmDialogConfiguration(header, message);
    const OnAccept = () => {
      this.onDeleteRentPropertyListing(rentPropertyListData?._id ?? '');
    };

    const OnReject = () => {
      this.isShowConfirmPopUpVisible = false
    };
    this.confirmPopUp.onDeleteConfirm({ ...confirmPopUpConfig, OnAccept, OnReject });
  }

  private onDeleteRentPropertyListing(propertyOwnerId: string): void {
    this.RentPropertyListingService.deleteRentPropertyListing(propertyOwnerId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Property Listing Deleted Successfully' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Delete Property Listing' });
      },
      complete: () => {
        this.isRentListingPropertyDeleted.emit(true);
        this.isShowConfirmPopUpVisible = false
      }
    });
  }

  private CreateMessageAndHeaderTitle(): Record<string, string> {
    const message = 'Please confirm to proceed';
    const header = 'Are tou sure';
    return { header, message }
  }
}
