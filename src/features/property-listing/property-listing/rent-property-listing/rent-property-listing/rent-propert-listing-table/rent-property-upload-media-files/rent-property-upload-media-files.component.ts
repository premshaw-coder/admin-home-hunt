import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { RentPropertyFilesUploadService } from '../../../services/files-upload/rent-property-files-upload.service';
import { environment } from '../../../../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../../../../app/shared/api-ends-points/admin-home-hunt-api-endpoints';
@Component({
  selector: 'app-rent-property-upload-media-files',
  imports: [FileUpload, ButtonModule, BadgeModule, ProgressBar, ToastModule, HttpClientModule, CommonModule],
  providers: [MessageService],
  templateUrl: './rent-property-upload-media-files.component.html',
  styleUrl: './rent-property-upload-media-files.component.scss'
})
export class RentPropertyUploadMediaFilesComponent implements OnInit {
  files = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  uploadedFilesToS3: any;
  propertyOwnerId: string = '';
  uploadFilesUrl: string = '';

  private dialogConfig = inject(DynamicDialogConfig)
  private S3FilesService = inject(RentPropertyFilesUploadService);
  private config = inject(PrimeNG);
  private messageService = inject(MessageService);

  constructor() { }

  ngOnInit(): void {
    console.log('Dialog Config:', this.dialogConfig.data.propertyRentListData._id);
    this.propertyOwnerId = this.dialogConfig.data.propertyRentListData._id;
    this.uploadFilesUrl = `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.uploadRentPropertyFiles}${this.propertyOwnerId}`;
    this.uploadedFilesToS3 = this.dialogConfig?.data?.propertyRentListData?.propertyDetails?.propertyImages
  }

  choose(event: any, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload(event: any) {
    if (event && event.originalEvent && event.originalEvent.body) {
      this.uploadedFilesToS3 = event?.originalEvent?.body?.propertyDetails?.propertyImages;
      console.log('API Response:', this.uploadedFilesToS3);
    }
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    this.files.forEach((file: any) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: () => void) {
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes || '';
    if (bytes === 0) return `0 ${sizes[0]}`;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${formattedSize} ${sizes[i]}`;
  }

  removeUploadedFile(filesInfo: any) {
    let payload = {}
    payload = { "data": [{ "Key": "test/property-owner-rent/" + filesInfo.fileName, "_id": filesInfo._id }] }
    console.log('Payload:', payload);

    this.S3FilesService.deleteUploadedFilesFromS3Bucket(payload, this.propertyOwnerId).subscribe({
      next: (res) => {
        console.log('File Deleted:', res);
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Deleted Sucessfully', life: 3000 });
        this.uploadedFilesToS3 = res?.data?.propertyDetails?.propertyImages;
      },
      error: (err) => {
        console.error('Error Deleting File:', err);
      }
    });

  }
}
