import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private api_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createReservation(reservation: any) {
    return this.http.post(`${this.api_URL}/reservations`, reservation);
  }

  getReservation(filter?: string) {
    const options = filter
      ? { params: new HttpParams().set('status', filter) }
      : {};
    return this.http.get(`${this.api_URL}/reservations`, options);
  }

  updateSatus(id: string, filter?: string) {
    const options = filter
      ? { params: new HttpParams().set('status', filter) }
      : {};
    return this.http.post(`${this.api_URL}/reservations/${id}`, {}, options);
  }

  getReservationItem(id: string) {
    return this.http.get(`${this.api_URL}/reservationsItem/${id}`);
  }

  getReservationItemByUser(userId: string) {
    return this.http.get(`${this.api_URL}/reservationsItem/user/${userId}`);
  }

  addReservationItem(item: any) {
    return this.http.post(`${this.api_URL}/reservationsItem`, item);
  }
}
