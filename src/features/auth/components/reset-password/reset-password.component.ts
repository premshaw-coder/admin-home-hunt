import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { AuthFormControl, AuthFormData } from '../../interfaces/auth/auth-login.form.interface';
import { AuthApiResponse } from '../../interfaces/auth/auth-login.interface';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { matchPassword } from '../../../../app/shared/functions/validators.functions';
import { ActivatedRoute, Router } from '@angular/router';

interface ResetPasswordFormControl {
  newPassword?: FormControl<string | null | undefined>;
  confirmPassword?: FormControl<string | null | undefined>;
}

interface ResetPasswordFormData {
  newPassword: string | null | undefined;
  confirmPassword: string | null | undefined;
}

@Component({
  selector: 'app-reset-password',
  imports: [InputTextModule, FloatLabelModule, CardModule, ButtonModule, FormsModule,
    ReactiveFormsModule, PasswordModule, ToastModule],
  providers: [AuthService, HttpClient, CommonToastService, MessageService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup<ResetPasswordFormControl>
  private authService = inject(AuthService)
  private commonService = inject(CommonToastService)
  private destroyRef = inject(DestroyRef)
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private secret_key!: string;

  constructor() {
    this.activatedRoute.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.secret_key = data['secret_key'];
      if (!this.secret_key) this.router.navigate([''])
    })
  }

  ngOnInit(): void {
    this.setForm()
  }

  private setForm(): void {
    this.resetPasswordForm = new FormGroup<ResetPasswordFormControl>({
      newPassword: new FormControl('', [Validators.email, Validators.required]),
      confirmPassword: new FormControl('', [matchPassword, Validators.required])
    })
  }

  public onSubmit(): void {
    // let resetPasswordFormData: ResetPasswordFormData = this.resetPasswordForm.value;
    if (this.isFormInValid()) {
      return
    }
    if (this.secret_key)
      this.authService.resetPassword({ password: this.resetPasswordForm.value.newPassword || '', secret_key: this.secret_key })
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (res) => {
            localStorage.setItem('UserInfo', JSON.stringify(res))
            this.commonService.successToast('Password Reset Successfully')
            this.router.navigate(['']);
          },
          error: (err: { error: { errMsg: string; data: { message: string | undefined; }; }; }) => {
            this.commonService.errorToast(err.error.errMsg, err.error?.data?.message)
          },
          complete: () => {
            this.resetPasswordForm.reset();
          },
        })
  }
  private isFormInValid(): boolean {
    if (this.resetPasswordForm.invalid) {
      if (!this.resetPasswordForm.get('confirmPassword')?.value && !this.resetPasswordForm.get('newPassword')?.value) {
        this.commonService.errorToast('All Fields are required');
        return true;
      }
      if (this.resetPasswordForm.controls.newPassword?.errors) {
        this.commonService.errorToast('Password', 'Either Empty or Invalid');
        return true;
      }
      if (this.resetPasswordForm.controls.confirmPassword?.errors) {
        this.commonService.errorToast('Password', 'Either Empty or Not Matched');
        return true;
      }
    }
    return false
  }
}
