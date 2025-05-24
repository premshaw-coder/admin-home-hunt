import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { FileUpload, FileUploadEvent, FileUploadHandlerEvent } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpEvent } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RentPropertyFilesUploadService } from '../../../services/files-upload/rent-property-files-upload.service';
import { environment } from '../../../../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../../../../app/shared/api-ends-points/admin-home-hunt-api-endpoints';
import { PropertyImage, PropertyListing } from '../../../rent-property-listing-interfaces/property-listing-interface';
import { fileCompression } from '../../../../../../../app/shared/reusable-function/file-compress';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rent-property-upload-media-files',
  imports: [FileUpload, ButtonModule, BadgeModule, ProgressBar, ToastModule, CommonModule, NgOptimizedImage, CardModule, Checkbox, FormsModule],
  providers: [MessageService],

  templateUrl: './rent-property-upload-media-files.component.html',
  styleUrl: './rent-property-upload-media-files.component.scss'
})
export class RentPropertyUploadMediaFilesComponent implements OnInit {
  files: File[] = [];
  totalSize = 0;
  totalSizePercent = 0;
  uploadedFilesToS3: PropertyImage[] = [];
  propertyOwnerId = '';
  uploadFilesUrl = '';
  isFilesUploadedToS3bucket = false;
  isRegeneratedSignedUrlFilesUploadedToS3bucket = false;

  public removeFiles: PropertyImage[] = [];
  public filesToDelete: boolean = false

  private dialogConfig = inject(DynamicDialogConfig)
  private S3FilesService = inject(RentPropertyFilesUploadService);
  private config = inject(PrimeNG);
  private messageService = inject(MessageService);
  public dialogRef = inject(DynamicDialogRef)
  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.propertyOwnerId = this.dialogConfig?.data?.propertyRentListData?._id;
    this.uploadFilesUrl = `${environment.baseUrl}${environment.apiVersion}${ApiEndPoints.uploadRentPropertyFiles}${this.propertyOwnerId}`;
    this.uploadedFilesToS3 = this.dialogConfig?.data?.propertyRentListData?.propertyDetails?.propertyImages
    this.regenerateFilesSignedUrl(this.uploadedFilesToS3);
  }

  choose(event: MouseEvent, callback: () => void): void {
    callback();
  }

  onRemoveTemplatingFile(event: Event, file: File, removeFileCallback: (event: Event, index: number) => void, index: number) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload(event: FileUploadEvent): void {
    const responseBody = (event.originalEvent && 'body' in event.originalEvent) ? event.originalEvent.body as PropertyListing : null;
    if (responseBody) {
      this.uploadedFilesToS3 = responseBody?.propertyDetails?.propertyImages || [];
      this.isFilesUploadedToS3bucket = true;
      this.dialogRef.close({
        action: 'file uploaded successfully',
        data: { isFilesUploadedToS3bucket: this.isFilesUploadedToS3bucket }
      });
    }
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000
    });
  }


  onSelectedFiles(event: { originalEvent: Event; files: File[] }): void {
    this.files = Array.isArray(event.files) ? event.files : [];

    this.files?.forEach((file: File) => {
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

  removeUploadedFiles() {
    this.filesToDelete = true;
    let payload: { data: { Key: string; _id: string }[] } = { data: [] };
    this.removeFiles.forEach((filesInfo: PropertyImage) => {
      payload.data.push({ "Key": "test/property-owner-rent/" + filesInfo.fileName, "_id": filesInfo._id || "" })
    })
    this.S3FilesService.deleteUploadedFilesFromS3Bucket(payload, this.propertyOwnerId).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: PropertyListing) => {
          this.removeFiles = [];
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Deleted Sucessfully', life: 3000 });
          this.uploadedFilesToS3 = res?.propertyDetails?.propertyImages || [];
        },
        error: (err: Error) => {
          console.error('Error Deleting File:', err);
        },
        complete: () => {
          this.S3FilesService.refetchRentPropertTableData.next(true);
          this.filesToDelete = false;
        }
      });

  }
  regenerateFilesSignedUrl(uploadedFilesToS3: PropertyImage[]): void {
    const payload: PropertyImage[] = uploadedFilesToS3?.filter((file: PropertyImage) => {
      const signedUrlExpirationDate: number = Date.parse(file.fileExpirationTime);
      const currentDate: number = Date.now();
      return currentDate > signedUrlExpirationDate;
    });

    if (payload?.length > 0) {
      this.S3FilesService.regenerateFilesSignedUrl(this.propertyOwnerId, payload).pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res: PropertyListing) => {
            this.uploadedFilesToS3 = res?.propertyDetails?.propertyImages || [];
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Regenerated Sucessfully', life: 3000 });
          },
          error: (err: Error) => {
            console.error('Error Regenerating File:', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Regenerating File', life: 3000 });
          },
          complete: () => {
            this.S3FilesService.refetchRentPropertTableData.next(true);
          }
        })
    }
  }

  uploadHandler(event: FileUploadHandlerEvent): void {
    // Create a new FormData instance for each upload
    const formData = new FormData();

    // Create a new array to hold promises for compressed files
    const compressedFiles: Promise<void>[] = [];

    // Call the fileCompress function and pass the event files
    fileCompression(event.files, formData, compressedFiles);

    // Wait for all compression promises to resolve
    Promise.all(compressedFiles)
      .then(() => {
        if (!formData.has('files')) {
          console.error('FormData is empty. No files were appended.');
          return;
        }
        this.uploadFilesToS3(formData, event);
      })
      .catch((error) => {
        console.error('Error during file compression:', error);
      });
  }

  uploadFilesToS3(formData: FormData, event: FileUploadHandlerEvent): void {
    // Make the HTTP request with the Bearer token
    this.S3FilesService.uploadFilesToS3Bucket(formData, this.propertyOwnerId).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const fileUploadEvent: FileUploadEvent = {
            files: event.files,
            originalEvent: { body: response } as HttpEvent<unknown>
          };
          this.onTemplatedUpload(fileUploadEvent); // Call the existing handler
        },
        error: (error) => {
          console.error('Error uploading files:', error);
        },
      });
  }
}



