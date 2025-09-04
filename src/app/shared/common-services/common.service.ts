import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiEndPoints } from '../constants/api-ends-points/admin-home-hunt-api-endpoints';
import { AuthApiResponse, Token } from '../../../features/auth/interfaces/auth/auth-login.interface';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private readonly http = inject(HttpClient)

    public updateToken(): Observable<string> {
        const user: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}');
        if (!user?.token) return of()
        return this.http.post<Token>(environment.baseUrl + ApiEndPoints.Auth.refreshAccessToken, { ...user.token })
            .pipe(map((token: Token) => {
                user.token.accessToken = token.accessToken;
                localStorage.setItem('UserInfo', JSON.stringify(user))
                return token.accessToken;
            }))
    }
}
