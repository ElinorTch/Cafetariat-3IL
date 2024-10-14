import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommonEngine } from '@angular/ssr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() imagePath!: string;
  @Input() name!: string;
  @Input() price!: string;
  @Input() isDeleted!: boolean;
}
