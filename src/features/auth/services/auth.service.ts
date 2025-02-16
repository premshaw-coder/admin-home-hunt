import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';
import { ApiEndPoints } from '../../../app/shared/api-ends-points/admin-home-hunt-api-endpoints';
import { AuthApiResponse } from '../interfaces/auth/auth-login.interface';
import { AuthFormData } from '../interfaces/auth/auth-login.form.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)

  constructor() {
    console.log(environment.from);
  }

  loginWithEmailAndPassword(loginUserData: AuthFormData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.backendUrl + ApiEndPoints.login, loginUserData)
  }

  signUpWithEmailAndPassword(signUpUserData: AuthFormData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.backendUrl + ApiEndPoints.signUp, signUpUserData)
  }

  forgotPassword(email?: string): Observable<string> {
    return this.http.get<string>(environment.backendUrl + ApiEndPoints.requestResetPassword + email)
  }

  resetPassword(data: { password: string, secret_key: String }): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.backendUrl + ApiEndPoints.resetPassword, data)
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('UserInfo')
  }
}