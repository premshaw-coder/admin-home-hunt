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

  loginWithEmailAndPassword(loginUserData: AuthFormData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.baseUrl + ApiEndPoints.login, loginUserData)
  }

  signUpWithEmailAndPassword(signUpUserData: AuthFormData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.baseUrl + ApiEndPoints.signUp, signUpUserData)
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('UserInfo')
  }
}