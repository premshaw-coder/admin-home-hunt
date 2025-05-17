import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { MyPreset } from './shared/primeNg-themes/primeng-themes';
import { MessageService } from 'primeng/api';
import { MyHttpInterceptor } from './interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(), MessageService, provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(withInterceptorsFromDi(), withInterceptors([MyHttpInterceptor])), provideRouter(routes),
  providePrimeNG({
    theme: {
      preset: MyPreset,
    }
  })
  ]
};
