import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  hugeBookmarkCheck01,
  hugeBookmarkRemove01,
  hugeBookmark01,
} from '@ng-icons/huge-icons';
import { ReservationsService } from '../data-access/reservations.service';
import { ProductsService } from '../../products/data-access/products.service';
import { getTotalPrice } from '../../utils/price';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule, ReactiveFormsModule],
  viewProviders: provideIcons({
    hugeBookmarkCheck01,
    hugeBookmarkRemove01,
    hugeBookmark01,
  }),
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.scss',
})
export class ReservationDetailsComponent {
  data = inject(DIALOG_DATA);
  reservation: any;
  products: any[] = [];

  form = new FormGroup({
    status: new FormControl(this.data.reservation.status || ''),
  });

  constructor(
    private reservationService: ReservationsService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.reservation = this.data.reservation;
    for (let product of this.reservation.reservationItem)
      this.getProduct(product.products);
  }

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe((data) => {
      this.products.push(data);
    });
  }

  updateStatus(event: any) {
    this.reservationService
      .updateSatus(this.reservation._id, event.target.value)
      .subscribe();
    window.location.reload();
  }

  getTotal() {
    return getTotalPrice(this.reservation);
  }
}
