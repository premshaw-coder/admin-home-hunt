import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiEndPoints } from '../constants/api-ends-points/admin-home-hunt-api-endpoints';
import { Token } from '../../../features/auth/interfaces/auth/auth-login.interface';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    text: string = 'aaa';
    http!: HttpClient;
    constructor() {
        this.http = inject(HttpClient)
    }

    public updateToken() {
        const token: Token = JSON.parse(localStorage.getItem('UserInfo') ?? '{}')?.token;
        if (!token) return of(null)
        return this.http.post<Token>(environment.baseUrl + ApiEndPoints.Auth.refreshAccessToken, { ...token })
            .pipe(map((user: any) => {
                localStorage.setItem('UserInfo', JSON.stringify(user))
                return user;
            }))
    }
}
