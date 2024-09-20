import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = 'auth';

  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.URL}/signin`, user);
  }

  signUp(user: User): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.URL}/signup`, user);
  }
}
