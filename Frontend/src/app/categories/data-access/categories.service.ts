import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.api_URL}/categories`);
  }

  getCategoryById(id: string){
    return this.http.get(`${this.api_URL}/categories/${id}`)
  }

  createCategory(categoryData: any): Observable<any>{
    return this.http.put<any>(`${this.api_URL}/categories`, categoryData);
  }
}
