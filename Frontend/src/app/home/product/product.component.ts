import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, BasketComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
