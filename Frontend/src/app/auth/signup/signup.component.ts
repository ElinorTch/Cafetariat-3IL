import { Component } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}
