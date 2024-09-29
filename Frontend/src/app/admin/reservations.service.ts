import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private api_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReservation(filter?: string) {
    const options = filter
      ? { params: new HttpParams().set('status', filter) }
      : {};
    return this.http.get(`${this.api_URL}/reservations`, options);
  }
}
