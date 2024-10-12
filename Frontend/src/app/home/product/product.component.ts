import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketComponent } from '../basket/basket.component';
import { ProductsService } from '../../products/data-access/products.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, BasketComponent, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() set day(day: number) {
    console.log(day);
  }

  constructor(private product: ProductsService) {}
}
