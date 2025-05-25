import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.development';
import { ApiEndPoints } from '../../../app/shared/constants/api-ends-points/admin-home-hunt-api-endpoints';
import { AuthApiResponse } from '../interfaces/auth/auth-login.interface';
import { AuthFormData } from '../interfaces/auth/auth-login.form.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)

  public loginWithEmailAndPassword(loginUserData: AuthFormData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.baseUrl + ApiEndPoints.login, loginUserData)
  }

  public signUpWithEmailAndPassword(signUpUserData: AuthFormData): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(environment.baseUrl + ApiEndPoints.signUp, signUpUserData)
  }

  public regenerateJwtToken(userId: string): Observable<AuthApiResponse> {
    return this.http.get<AuthApiResponse>(environment.baseUrl + ApiEndPoints.regenerateJwtToken + userId,)
  }

  public isUserAuthenticated(): boolean {
    return !!localStorage.getItem('UserInfo')
  }
}