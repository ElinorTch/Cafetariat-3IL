import { Component } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../data-access/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9_-]{3,}@3il.fr$'),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  signUp(): void {
    this.authService.signUp(this.form.getRawValue()).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
