import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(credentials: any): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiURL}/signin`, credentials)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  signUp(user: any): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiURL}/signup`, user)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
