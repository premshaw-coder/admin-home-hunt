import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { AuthFormControl, AuthFormData } from '../../interfaces/auth/auth-login.form.interface';
import { AuthApiResponse } from '../../interfaces/auth/auth-login.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  imports: [InputTextModule, FloatLabelModule, CardModule, ButtonModule, FormsModule, ReactiveFormsModule, PasswordModule],
  providers: [AuthService, HttpClient, CommonToastService, MessageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!: FormGroup<AuthFormControl>

  private authService = inject(AuthService)
  private commonService = inject(CommonToastService)
  private destroyRef = inject(DestroyRef)

  constructor() { }

  ngOnInit(): void {
    this.setForm()
  }

  private setForm(): void {
    this.signUpForm = new FormGroup<AuthFormControl>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10), Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20),
      Validators.required]),
    })
  }

  onSubmit(signUpFormData: AuthFormData): void {
    if (this.signUpForm.valid) {
      signUpFormData = { ...signUpFormData, user_type: 'Property-Owner' }
      this.authService.signUpWithEmailAndPassword(signUpFormData)
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: async (res: AuthApiResponse) => {
            localStorage.setItem('UserInfo', JSON.stringify(res))
          },
          error: (err: { error: { errMsg: string; data: { message: string | undefined; }; }; }) => {
            this.commonService.errorToast(err.error.errMsg, err.error?.data?.message)
          },
          complete: () => {
            this.signUpForm.reset()
            console.log('Observable completed');
          },
        })
    }
    else {
      let data = this.signUpForm.controls
      console.log('invalid', this.signUpForm.value);
      if (data.email?.errors) this.commonService.showError('Email', 'Either Empty or Invalid')
      if (data.password?.errors) this.commonService.showError('Password', 'Either Empty or Invalid')
    }
  }

  private isFormInValid(): boolean {
    if (this.signUpForm.invalid) {
      if (!this.signUpForm.get('email')?.value && !this.signUpForm.get('password')?.value) {
        this.commonService.errorToast('All Fields are required');
        return true;
      }
      if (this.signUpForm.controls.email?.errors) {
        this.commonService.errorToast('Email', 'Either Empty or Invalid');
        return true;
      }
      if (this.signUpForm.controls.password?.errors) {
        this.commonService.errorToast('Password', 'Either Empty or Invalid');
        return true;
      }
    }
    return false
  }

}
