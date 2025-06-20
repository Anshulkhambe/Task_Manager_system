import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z0-9]*$/)
      ]],
      password: ['', Validators.required]
    });
  }

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  handleSubmit(): void {
    this.loginError = '';

    if (this.loginForm.valid) {
      console.log('Login Form Submitted!', this.loginForm.value);

      const { username, password } = this.loginForm.value;

      this.authService.login({ username, password }).subscribe({
        next: (response: any) => {
          alert("Login successfully!");
          console.log('Backend response:', response);

          if (response && response.username) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'Thank you for Login!',
              timer: 1500,
              showConfirmButton: false
            });
            sessionStorage.setItem('user', response.username);
            this.router.navigate(['/dashboard']);
          } else {
            console.warn('Login successful but no username found in response:', response);
            this.loginError = 'Login successful, but user data not fully received. Please try again or contact support.';
            Swal.fire({
              icon: 'warning',
              title: 'Login Partial Success!',
              text: this.loginError,
            });
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed:', error);
          if (error.status === 401 || error.status === 400) {
            this.loginError = 'Invalid username or password.';
          } else if (error.error && typeof error.error === 'string') {
            this.loginError = error.error;
          } else if (error.error && error.error.message) {
            this.loginError = error.error.message;
          } else {
            this.loginError = 'An unexpected error occurred. Please try again later.';
          }
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: this.loginError,
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Login form is invalid.');
      this.loginError = 'Please fill in all required fields correctly.';
    }
  }

  handleReset(): void {
    this.loginForm.reset();
    this.loginError = '';
  }
}