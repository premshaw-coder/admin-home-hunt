import { Component, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmPopUpConfig } from '../../interfaces/confirmDialog.interface';

@Component({
  selector: 'app-confirmation-popup',
  imports: [ConfirmDialog, ButtonModule],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.scss'
})
export class ConfirmationPopupComponent {
  private readonly confirmationService = inject(ConfirmationService)

  public onDeleteConfirm(confirmPopUpConfig: ConfirmPopUpConfig): void {
    this.confirmationService.confirm({
      header: confirmPopUpConfig.header,
      message: confirmPopUpConfig.message,
      accept: () => {
        confirmPopUpConfig.OnAccept();
      },
      reject: () => {
        confirmPopUpConfig.OnReject()
      },
    });
  }

  public confirmDialogConfiguration(header:string, message:string): ConfirmPopUpConfig {
    const confirmPopUpConfig = {
      header,
      message,
      OnAccept: () => {/* No action needed on reject */ },
      OnReject: () => { /* No action needed on reject */ }
    }
    return confirmPopUpConfig
  }
}
