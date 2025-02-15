import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PasswordModule } from 'primeng/password';
import { AuthFormData, AuthFormControl } from '../../interfaces/auth/auth-login.form.interface';
import { AuthApiResponse } from '../../interfaces/auth/auth-login.interface';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, FloatLabelModule, CardModule, ButtonModule, FormsModule,
    ReactiveFormsModule, PasswordModule, ToastModule],
  providers: [AuthService, HttpClient, CommonToastService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

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
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20),
      Validators.required]),
    })
  }

  public onSubmit(): void {
    let loginFormData: AuthFormData = this.loginForm.value
    if (this.isFormInValid()) {
      return
    }
    this.authService.loginWithEmailAndPassword(loginFormData)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: async (res: AuthApiResponse) => {
          localStorage.setItem('UserInfo', JSON.stringify(res))
          this.commonService.successToast('Login Successful')
        },
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
      if (this.loginForm.controls.password?.errors) {
        this.commonService.errorToast('Password', 'Either Empty or Invalid');
        return true;
      }
    }
    return false
  }
}
