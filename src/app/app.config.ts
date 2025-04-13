import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import { MyPreset } from './shared/primeNg-themes/primeng-themes';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(), provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes),
  providePrimeNG({
    theme: {
      preset: MyPreset,
    }
  })
  ]
};
