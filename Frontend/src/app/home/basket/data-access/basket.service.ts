import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private productsInBasket: any[] = [];
  private productSource = new BehaviorSubject<string[]>(this.productsInBasket);
  currentProduct = this.productSource.asObservable();

  private api_URL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  addProduct(product: any) {
    this.productsInBasket.push(product);
    this.productSource.next(this.productsInBasket);
  }

  clearProductList() {
    this.productsInBasket = [];
    this.productSource.next(this.productsInBasket);
  }

  clearProduct(index: number) {
    console.log(typeof(index));
    console.log(this.productsInBasket[index]);
    this.productsInBasket.splice(index, 1);
    this.productSource.next(this.productsInBasket);
    console.log("Élément supprimé, nouveau tableau :", this.productsInBasket);
  }

  addProductList(productData: any) {
    console.log(productData);
    console.log(this.http.post<any>(`${this.api_URL}/reservations`, productData));
    //this.http.post<any>(`${this.api_URL}/reservations`, productData);
  }
}
