import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

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
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([JwtInterceptor]), withFetch()),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideLottieOptions({ player: () => player }),
    provideCacheableAnimationLoader(),
  ],
};
