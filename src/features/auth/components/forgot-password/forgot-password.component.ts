import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFormControl, AuthFormData } from '../../interfaces/auth/auth-login.form.interface';

@Component({
  selector: 'app-forgot-password',
  imports: [InputTextModule, FloatLabelModule, CardModule, ButtonModule, FormsModule,
    ReactiveFormsModule, PasswordModule, ToastModule],
  providers: [AuthService, HttpClient, CommonToastService, MessageService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public loginForm!: FormGroup<AuthFormControl>
  private authService = inject(AuthService)
  private commonService = inject(CommonToastService)
  private destroyRef = inject(DestroyRef)

  constructor() { }

  ngOnInit(): void {
    this.setForm()
  }

  private setForm(): void {
    this.loginForm = new FormGroup<AuthFormControl>({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  public onSubmit(): void {
    let loginFormData: AuthFormData = this.loginForm.value;
    if (this.isFormInValid()) {
      return
    }
    this.authService.forgotPassword(loginFormData.email || '')
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res: string) => this.commonService.successToast(res),
        error: (err: { error: { errMsg: string; data: { message: string | undefined; }; }; }) => {
          this.commonService.errorToast(err.error.errMsg, err.error?.data?.message)
        },
        complete: () => {
          this.loginForm.reset()
        },
      })
  }
  private isFormInValid(): boolean {
    if (this.loginForm.invalid) {
      if (!this.loginForm.get('email')?.value && !this.loginForm.get('password')?.value) {
        this.commonService.errorToast('All Fields are required');
        return true;
      }
      if (this.loginForm.controls.email?.errors) {
        this.commonService.errorToast('Email', 'Either Empty or Invalid');
        return true;
      }
    }
    return false
  }
}
