import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './category-dropdown.component.html',
  styleUrl: './category-dropdown.component.scss'
})
export class CategoryDropdownComponent{
  @Input() name!: string;
  @Input() isDeleted!: boolean;
  @Input() products!: any[];
  @Input() day!: number;

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
