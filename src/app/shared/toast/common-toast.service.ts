import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonToastService {
  private messageService = inject(MessageService)

  constructor() {
  }

  successToast(summary: string, detail?: string, timer: number = 5, clearToast: boolean = true):void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'success', summary, detail, life: timer * 1000 });
  }

  infoToast(summary: string, detail?: string, timer: number = 5, clearToast: boolean = true):void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'info', summary, detail, life: timer * 1000 });
  }

  warnToast(summary: string, detail?: string, timer: number = 5, clearToast: boolean = true):void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'warn', summary, detail, life: timer * 1000 });
  }

  errorToast(summary: string, detail?: string, timer: number = 5, clearToast: boolean = true):void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'error', summary, detail, life: timer * 1000 });
  }

  contrastToast(summary: string, detail?: string, timer: number = 5, clearToast: boolean = true):void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'contrast', summary, detail, life: timer * 1000 });
  }

  secondaryToast(summary: string, detail?: string, timer: number = 5, clearToast: boolean = true): void {
    if (clearToast) this.messageService.clear()
    this.messageService.add({ severity: 'secondary', summary, detail, life: timer * 1000 });
  }

  showError(summary: string, detail: string, life: number = 5): void {
    this.messageService.add({ severity: 'error', summary, detail, life: life * 1000 });
  }
}
