import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  hugeBookmarkCheck01,
  hugeBookmarkRemove01,
  hugeBookmark01,
} from '@ng-icons/huge-icons';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [
    provideIcons({ hugeBookmarkCheck01, hugeBookmarkRemove01, hugeBookmark01 }),
  ],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss',
})
export class ReservationCardComponent {
  @Input() numberOfProducts!: number;
  @Input() reservationDate!: Date;
  @Input() status: string = 'pending';
  @Input() price!: number;
}
