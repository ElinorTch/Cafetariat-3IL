import { Component, inject, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../shared/components/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { ReservationCardComponent } from '../../shared/components/reservation-card/reservation-card.component';
import { ReservationsService } from '../../reservations/data-access/reservations.service';
import { CommonModule } from '@angular/common';
import { Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { ReservationDetailsComponent } from '../../reservations/reservation-details/reservation-details.component';
import { getTotalPrice } from '../../utils/price';
import { CategoryDropdownComponent } from '../../shared/components/category-dropdown/category-dropdown.component';

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
  dialog = inject(Dialog);

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

  getTotalOfPrice(reservation: any) {
    return getTotalPrice(reservation);
  }

  openDialog(reservation: any) {
    this.dialog.open(ReservationDetailsComponent, {
      minWidth: '300px',
      data: {
        reservation,
      },
    });
  }
}
