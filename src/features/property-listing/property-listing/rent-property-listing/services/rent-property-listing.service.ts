import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../../app/shared/constants/api-ends-points/admin-home-hunt-api-endpoints';
import { PropertyListing } from '../rent-property-listing-interfaces/property-listing-interface';
import { PropertyDeleteResponse } from '../rent-property-listing-interfaces/property-delete-response-interface';

@Injectable({
  providedIn: 'root'
})
export class RentPropertyListingService {

  private readonly httpService = inject(HttpClient)

  public createRentPropertyListing(rentListinginfo: PropertyListing): Observable<PropertyListing> {
    return this.httpService.post<PropertyListing>(environment.baseUrl + environment.apiVersion + ApiEndPoints.addRentListing, { ...rentListinginfo });
  }

  public editRentPropertyListing(rentListinginfo: PropertyListing, docId: string): Observable<PropertyListing> {
    return this.httpService.put<PropertyListing>(environment.baseUrl + environment.apiVersion + ApiEndPoints.editRentListing + docId, { ...rentListinginfo });
  }

  public getAllRentPropertyListingByProperOwner(propertyOwnerUUID: string): Observable<PropertyListing[]> {
    return this.httpService.get<PropertyListing[]>(environment.baseUrl + environment.apiVersion + ApiEndPoints.getAllRentPropertyListingByProperOwner + propertyOwnerUUID);
  }

  public deleteRentPropertyListing(propertyOwnerId: string): Observable<PropertyDeleteResponse> {
    return this.httpService.delete<PropertyDeleteResponse>(environment.baseUrl + environment.apiVersion + ApiEndPoints.deleteRentProperty + propertyOwnerId);
  }
}
