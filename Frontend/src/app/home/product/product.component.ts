import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketComponent } from '../basket/basket.component';
import { ProductsService } from '../../products/data-access/products.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CategoriesService } from '../../categories/data-access/categories.service';
import { CategoryDropdownComponent } from '../../shared/components/category-dropdown/category-dropdown.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BasketComponent,
    ProductCardComponent,
    CategoryDropdownComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  _day!: number;
  @Input() set day(day: number) {
    this._day = day;
  }
  categories: any = [];

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
}
