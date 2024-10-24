import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth-service';


@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error', err);
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}