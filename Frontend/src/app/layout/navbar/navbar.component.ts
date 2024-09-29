import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeClipboard, hugeProductLoading } from '@ng-icons/huge-icons';
import { AuthService } from '../../auth/data-access/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  viewProviders: [
    provideIcons({
      hugeClipboard,
      hugeProductLoading,
    }),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.getUser();
  }

  private getUser(): void {
    this.auth.loadUser().subscribe((data) => {
      this.user = data;
    });
  }
}
