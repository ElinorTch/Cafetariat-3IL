import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../data-access/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9_-]{3,}@3il.fr$'),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  signIn(): void {
    this.authService.login(this.form.getRawValue()).subscribe({
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
