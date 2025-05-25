import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonToastService {
  private messageService = inject(MessageService)

  public successToast(summary: string, detail?: string, timer = 5, clearToast = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'success', summary, detail, life: timer * 1000 });
  }

  public infoToast(summary: string, detail?: string, timer = 5, clearToast = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'info', summary, detail, life: timer * 1000 });
  }

  public warnToast(summary: string, detail?: string, timer = 5, clearToast = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'warn', summary, detail, life: timer * 1000 });
  }

  public errorToast(summary: string, detail?: string, timer = 5, clearToast = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'error', summary, detail, life: timer * 1000 });
  }

  public contrastToast(summary: string, detail?: string, timer = 5, clearToast = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'contrast', summary, detail, life: timer * 1000 });
  }

  public secondaryToast(summary: string, detail?: string, timer = 5, clearToast = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'secondary', summary, detail, life: timer * 1000 });
  }

  public showError(summary: string, detail: string, life = 5): void {
    this.messageService.add({ severity: 'error', summary, detail, life: life * 1000 });
  }
}
