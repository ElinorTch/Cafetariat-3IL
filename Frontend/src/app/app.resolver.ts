import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { AuthService } from './auth/data-access/auth.service';
import { User } from './auth/data-access/user';

export const appResolver: ResolveFn<(User | null)[]> = () => {
  const auth = inject(AuthService);
  const observables = [auth.loggedIn ? auth.loadUser() : of(null)];

  return forkJoin(observables);
};
