import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../../home/basket/data-access/basket.service';
import { BasketComponent } from '../../../home/basket/basket.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, BasketComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent{
  @Input() imagePath!: string;
  @Input() name!: string;
  @Input() price!: string;
  @Input() isDeleted!: boolean;
  @Input() disponibilityDays!: number[];
  @Input() day!: number;

  showSuccess: boolean = false;

  constructor(private basketService: BasketService) {}

  getDay(){
    return Number(this.day)
  }

  addToBasket() {
    const product = {
      name: this.name,
      price: this.price,
      imagePath: this.imagePath,
      day: this.day
    };

    this.basketService.addProduct(product);

    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }
}
