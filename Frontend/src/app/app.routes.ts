import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/data-access/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signup',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'signin',
        component: SigninComponent,
      },
    ],
  },
  { path: 'test', component: SignupComponent, canActivate: [AuthGuard] },
];
