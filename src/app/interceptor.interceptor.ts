import { HttpRequest, HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthApiResponse } from '../features/auth/interfaces/auth/auth-login.interface';
import { RoutesPaths } from './shared/constants/application-routes/app-routes';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../features/subscription/services/subscription.service';
import { CommonService } from './shared/common-services/common.service';

let count = 0;

export const MyHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  let commonService: CommonService = inject(CommonService);
  const router = inject(Router);
  const subscriptionService = inject(SubscriptionService)
  const userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}')
  const access_token = userInfo.token?.accessToken
  let cloned = req;
  if (access_token) {
    cloned = req.clone({
      setHeaders: {
        "Accept": "*/*",
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Headers": "*",
        authorization: `Bearer ${access_token}`,
      },
    });
  }
  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if ([401, 403].includes(error.status)) {
        if (error.status === 403 && error.error?.subscriptionExpired && error.error?.message === 'Subscription expired') {
          const payload = {
            endDate: new Date(error.error.subscriptionEndDate).toISOString()
          }
          subscriptionService.checkAndExpireSubscribedUser(userInfo.id ?? '', payload).subscribe()
          router.navigate([RoutesPaths.BasePath + RoutesPaths.Subscription])
        }
        else {
          count++;
          if (count > 2) return throwError(() => error);
          return commonService.updateToken().pipe(
            switchMap(() => {
              count = 0;
              let access_token = userInfo.token?.accessToken;
              const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${access_token}`)
              });
              return next(clonedRequest);
            })
          );
        }
      }
      return throwError(() => error);
    })
  )
}
