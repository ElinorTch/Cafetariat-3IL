import { Component, OnInit } from '@angular/core';
//import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  commandes = [
    {
      nombreProduits: 5,
      dateReservation: '20/09/2024',
      datePaiement: '20/09/2024',
      prixTotal: 15
    },
    {
      nombreProduits: 5,
      dateReservation: '20/09/2024',
      datePaiement: '20/09/2024',
      prixTotal: 15
    },
    {
      nombreProduits: 5,
      dateReservation: '20/09/2024',
      datePaiement: '20/09/2024',
      prixTotal: 15
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
