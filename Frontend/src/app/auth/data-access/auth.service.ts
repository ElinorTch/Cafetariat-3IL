import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../../local/storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:3000/auth';
  private user: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: any): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiURL}/signin`, credentials)
      .pipe(
        map((response) => {
          this.storage.setItem('access_token', response.token);
          return response;
        })
      );
  }

  signUp(user: any): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiURL}/signup`, user)
      .pipe(
        map((response) => {
          this.storage.setItem('access_token', response.token);
          return response;
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.clear();
    }
  }

  getUser() {
    console.log(this.user);
    return this.user;
  }

  public get loggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.storage.getItem('access_token');
      return token !== null && !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getToken(): string | null {
    return this.storage.getItem('access_token');
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiURL}/me`);
  }

  loadUser(): Observable<any> {
    if (this.user) return of(this.user);

    return this.me().pipe(
      map((user: any) => {
        this.user = user;
        return user.user;
      })
    );
  }
}
