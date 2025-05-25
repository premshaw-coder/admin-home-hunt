import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../../../app/shared/constants/api-ends-points/admin-home-hunt-api-endpoints';
import { BehaviorSubject, map } from 'rxjs';
import { PropertyImage, PropertyListing } from '../../rent-property-listing-interfaces/property-listing-interface';
import { PropertyListingDeleteFilesApiResponse } from '../../rent-property-listing-interfaces/property-listing-delete-filesApi-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RentPropertyFilesUploadService {

  public refetchRentPropertTableData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly httpService = inject(HttpClient)

  public uploadFilesToS3Bucket(files: FormData, propertyOwnerId: string): Observable<PropertyImage[]> {
    return this.httpService.post<PropertyImage[]>(
      `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.uploadRentPropertyFiles}${propertyOwnerId}`,
      files
    );
  }

  public deleteUploadedFilesFromS3Bucket(files: { data: { Key: string; _id: string }[] }, propertyOwnerId: string): Observable<PropertyListing> {
    return this.httpService.delete<PropertyListingDeleteFilesApiResponse>(
      `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.deleteRentPropertyFiles}/${propertyOwnerId}`,
      {
        body: JSON.stringify(files),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-HTTP-Method-Override': 'DELETE'
        })
      }
    ).pipe(
      map((response: PropertyListingDeleteFilesApiResponse) => response.data as PropertyListing)
    );
  }

  public regenerateFilesSignedUrl(propertyOwnerId: string, fileData: PropertyImage[]): Observable<PropertyListing> {
    return this.httpService.post<PropertyListing>(
      `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.regenerateFilesSignedUrl}${propertyOwnerId}`,
      { fileData: fileData }
    );
  }
}
