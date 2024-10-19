import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProduct(id: string) {
    return this.http.get(`${this.api_URL}/products/${id}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.api_URL}/products`, productData);
  }
}
