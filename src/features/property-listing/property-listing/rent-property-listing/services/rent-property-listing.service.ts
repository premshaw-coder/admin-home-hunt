import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../../app/shared/api-ends-points/admin-home-hunt-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class RentPropertyListingService {

  private httpService = inject(HttpClient)

  createRentPropertyListing(rentListinginfo: any): Observable<any> {
    return this.httpService.post<any>(environment.baseUrl + environment.apiVersion + ApiEndPoints.addRentListing, { ...rentListinginfo });
  }

  editRentPropertyListing(rentListinginfo: any, docId:string): Observable<any> {
    return this.httpService.put<any>(environment.baseUrl + environment.apiVersion + ApiEndPoints.editRentListing + docId, { ...rentListinginfo });
  }

  getAllRentPropertyListingByProperOwner(propertyOwnerUUID: string): Observable<any> {
    return this.httpService.get<any>(environment.baseUrl + environment.apiVersion + ApiEndPoints.getAllRentPropertyListingByProperOwner + propertyOwnerUUID);
  }
}
