import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { AuthFormControl } from '../../interfaces/auth/auth-login.form.interface';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [InputTextModule, FloatLabelModule, CardModule, ButtonModule, FormsModule,
    ReactiveFormsModule, PasswordModule, ToastModule],
  providers: [AuthService, HttpClient, CommonToastService, MessageService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup<AuthFormControl>
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
    this.resetPasswordForm = new FormGroup<AuthFormControl>({
      password: new FormControl('', [Validators.email, Validators.required]),
    })
  }

  public onSubmit(): void {
    // let resetPasswordFormData: ResetPasswordFormData = this.resetPasswordForm.value;
    if (this.isFormInValid()) {
      return
    }
    this.authService.resetPassword({ password: this.resetPasswordForm.value.password || '', secret_key: this.secret_key })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res: AuthApiResponse) => {
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
      if (this.resetPasswordForm.controls.password?.errors) {
        this.commonService.errorToast('Password', 'Either Empty or Invalid');
        return true;
      }
    }
    return false
  }
}
