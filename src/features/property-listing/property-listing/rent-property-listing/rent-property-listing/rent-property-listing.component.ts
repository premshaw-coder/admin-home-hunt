import { Component } from '@angular/core';
import { RentPropertyListingTableComponent } from "./rent-propert-listing-table/rent-property-listing-table/rent-property-listing-table.component";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-rent-property-listing',
  imports: [RentPropertyListingTableComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './rent-property-listing.component.html',
  styleUrl: './rent-property-listing.component.scss'
})
export class RentPropertyListingComponent {

}
