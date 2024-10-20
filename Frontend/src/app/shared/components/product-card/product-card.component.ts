import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonEngine } from '@angular/ssr';
import { ReservationsService } from '../../../reservations/data-access/reservations.service';
import { AuthService } from '../../../auth/data-access/auth.service';

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
  @Input() disponibilityDays!: number[];
  @Input() day!: number;
  @Input() product!: any;

  showSuccess: boolean = false;

  constructor(
    private reservationService: ReservationsService,
    private authService: AuthService
  ) {}

  getDay() {
    return Number(this.day);
  }

  addItem(item: any) {
    const reservationItem = {
      userId: this.authService.getUser().sub,
      productId: item._id,
      quantity: 1,
      status: 'pending',
    };
    this.reservationService
      .addReservationItem(reservationItem)
      .subscribe((data) => {
        console.log(data);
      });
    
    this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
  }
}
