import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../../reservations/data-access/reservations.service';
import { AuthService } from '../../auth/data-access/auth.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  showBasket: boolean = true;
  reservationItem: any = [];

  constructor(
    private reservationService: ReservationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getReservationItem();
  }

  closeBasket(): void {
    this.showBasket = false;
  }

  getReservationItem() {
    this.reservationService
      .getReservationItemByUser(this.authService.getUser().sub)
      .subscribe((data) => {
        console.log(data);
        this.reservationItem = data;
      });
  }

  createReservation() {
    const reservation = {
      userId: this.authService.getUser().sub,
      reservationItem: this.reservationItem,
      status: 'pending',
    };
    this.reservationService.createReservation(reservation).subscribe((data) => {
      console.log(data);
    });
  }
}
