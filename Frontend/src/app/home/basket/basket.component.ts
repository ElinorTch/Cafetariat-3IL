import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from './data-access/basket.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})

export class BasketComponent {
  productsInBasket: any[] = [];
  showBasket: boolean = true;

  constructor(private basketService: BasketService) {}

  addProduct(product: any): void{
    this.productsInBasket.push(product);
  }

  ngOnInit(): void {
    this.basketService.currentProduct.subscribe(products => {
      this.productsInBasket = products;
    });
  }
  
  closeBasket(): void {
    this.showBasket = false;
  }

  clearBasket(): void {
    this.basketService.clearProductList;
  }

  removeProduct(index: number): void {
    this.basketService.clearProduct(index);
  }
  
  validateBasket(): void {
    if (this.productsInBasket.length === 0) {
      alert('Votre panier est vide');
    } else {
      this.basketService.addProductList(this.productsInBasket);
      this.basketService.clearProductList();
      alert('Commande validée !');
    }
  }
}
