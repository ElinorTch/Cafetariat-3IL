import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { JwtInterceptor } from './auth/data-access/jwt.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {
  provideLottieOptions,
  provideCacheableAnimationLoader,
} from 'ngx-lottie';
import player from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([JwtInterceptor]), withFetch()),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideLottieOptions({ player: () => player }),
    provideCacheableAnimationLoader(),
  ],
};
