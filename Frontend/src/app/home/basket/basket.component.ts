import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})

export class BasketComponent {
  showBasket: boolean = true;

  closeBasket(): void {
    this.showBasket = false;
  }
}
