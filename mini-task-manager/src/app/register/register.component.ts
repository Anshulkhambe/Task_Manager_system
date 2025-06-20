import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  backendError: string = ''; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z0-9]*$/) 
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator 
    });

    
    this.password?.valueChanges.subscribe(() => {
      if (this.confirmPassword) {
        this.confirmPassword.updateValueAndValidity({ emitEvent: false });
        this.confirmPassword.markAsTouched(); 
      }
    });

    this.confirmPassword?.valueChanges.subscribe(() => {
      this.registerForm.updateValueAndValidity();
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword || password.value === null || confirmPassword.value === null) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null; 
  }

  get username(): AbstractControl | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  handleSubmit(): void {
    this.backendError = ''; 

    if (this.registerForm.valid) {
      console.log('Registration Form Submitted!', this.registerForm.value);

      
      const registrationData = {
        username: this.username?.value,
        email: this.email?.value,
        password: this.password?.value,// Send confirmPassword to backend for server-side validation
      };

      this.http.post('http://localhost:8081/user/newuser', registrationData)
        .subscribe({
          next: (response) => {
            alert("Registration successfully!");
          console.log(response);

          Swal.fire({
            icon: 'success',
            title: 'Register Successful!',
            text: 'Thank you for Registering!',
          });

            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed:', error);
            if (error.error && typeof error.error === 'string') {
                this.backendError = error.error; 
            } else if (error.error && error.error.message) {
                this.backendError = error.error.message; 
            } else {
                this.backendError = 'An unexpected error occurred during registration. Please try again.';
            }
          }
        });

    } else {
      this.registerForm.markAllAsTouched();
      console.log('Registration form is invalid.');
    }
  }

  handleReset(): void {
    this.registerForm.reset();
    this.backendError = ''; 
  }
}