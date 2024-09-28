import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../shared/components/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { ReservationCardComponent } from '../shared/components/reservation-card/reservation-card.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, DashboardCardComponent, ReservationCardComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  commandes = [
    {
      nombreProduits: 5,
      dateReservation: '20/09/2024',
      datePaiement: '20/09/2024',
      prixTotal: 15,
    },
    {
      nombreProduits: 5,
      dateReservation: '20/09/2024',
      datePaiement: '20/09/2024',
      prixTotal: 15,
    },
    {
      nombreProduits: 5,
      dateReservation: '20/09/2024',
      datePaiement: '20/09/2024',
      prixTotal: 15,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
