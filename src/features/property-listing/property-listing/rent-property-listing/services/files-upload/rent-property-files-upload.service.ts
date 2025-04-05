import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../../../app/shared/api-ends-points/admin-home-hunt-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class RentPropertyFilesUploadService {


  private httpService = inject(HttpClient)

  deleteUploadedFilesFromS3Bucket(files: any, propertyOwnerId: string): Observable<any> {
    return this.httpService.delete<any>(
      `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.deleteRentPropertyFiles}/${propertyOwnerId}`,
      {
        body: JSON.stringify(files),
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-HTTP-Method-Override': 'DELETE'
        })
      }
    );
  }

  regenerateFilesSignedUrl(propertyOwnerId: string, fileData: any): Observable<any> {
    return this.httpService.post<any>(
      `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.regenerateFilesSignedUrl}${propertyOwnerId}`,
      { body: fileData }
    );
  }
}
