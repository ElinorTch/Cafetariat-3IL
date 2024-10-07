import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/data-access/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { noAuthGuard } from './auth/data-access/no-auth.guard';
import { appResolver } from './app.resolver';
import { roleGuard } from './auth/data-access/role.guard';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { ProductComponent } from './home/product/product.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    resolve: [appResolver],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeLayoutComponent,
        children: [
          {
            path: 'day',
            component: ProductComponent,
          },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
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
];
