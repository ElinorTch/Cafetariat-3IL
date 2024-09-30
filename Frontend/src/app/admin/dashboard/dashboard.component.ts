import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../shared/components/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { ReservationCardComponent } from '../../shared/components/reservation-card/reservation-card.component';
import { ReservationsService } from '../reservations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    DashboardCardComponent,
    ReservationCardComponent,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  reservations: any;
  selected: string = 'tout';
  pendingReservations: number = 0;
  completedReservations: number = 0;
  canceledReservations: number = 0;

  constructor(private reservationService: ReservationsService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(filter?: string): void {
    this.selected = filter ? filter : 'tout';
    this.reservationService.getReservation(filter).subscribe({
      next: (reservations: any) => {
        this.reservations = reservations;
        this.getStat();
      },
    });
  }

  getStat(): void {
    this.pendingReservations = 0;
    this.canceledReservations = 0;
    this.completedReservations = 0;
    for (let reservation of this.reservations) {
      if (reservation.status == 'pending') this.pendingReservations += 1;
      else if (reservation.status == 'canceled') this.canceledReservations += 1;
      else this.completedReservations += 1;
    }
  }

  getTotalPrice(reservation: any) {
    let total = 0;
    for (const reservationItem of reservation.reservationItem)
      total += reservationItem.total;
    return total;
  }
}
