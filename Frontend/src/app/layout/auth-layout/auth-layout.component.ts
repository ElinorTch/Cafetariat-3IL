import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [LottieComponent, RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  options: AnimationOptions = {
    path: '/assets/balloon.json',
    loop: false,
  };
}
