import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../core/services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.emailOrMobileValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      rememberMe: [false]
    });

    // If credentials were saved (remember me), load them
    const savedUsername = localStorage.getItem('saved_username');
    const savedPassword = localStorage.getItem('saved_password');
    const savedRemember = localStorage.getItem('saved_remember');

    if (savedUsername && savedPassword && savedRemember === 'true') {
      this.loginForm.patchValue({
        username: savedUsername,
        password: savedPassword,
        rememberMe: true
      });
    }
  }

  // Custom validator: either a valid email OR a numeric mobile with up to 10 digits (and at least 6 to be reasonable)
  emailOrMobileValidator(control: AbstractControl): ValidationErrors | null {
    const v = (control.value || '').toString().trim();
    if (!v) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobileRegex = /^[0-9]{1,10}$/; // 1 to 10 digits allowed, will later show message if too short maybe
    if (emailRegex.test(v)) return null;
    if (mobileRegex.test(v)) return null;
    return { emailOrMobile: true };
  }

  // Convenience getters
  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }
  get rememberMe() { return this.loginForm.get('rememberMe')!; }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.serverError = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = {
      username: this.username.value,
      password: this.password.value
    };

    this.loading = true;

    this.userService.login(credentials)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res: any) => {
          // Assuming res contains data structure like { data: { token: '...', ... }, message: '...' }
          // Save username/password/token to localStorage per user's request.
          if (this.rememberMe.value) {
            localStorage.setItem('saved_username', credentials.username);
            localStorage.setItem('saved_password', credentials.password);
            localStorage.setItem('saved_remember', 'true');
          } else {
            localStorage.removeItem('saved_username');
            localStorage.removeItem('saved_password');
            localStorage.removeItem('saved_remember');
          }

          // Save token if available — per your instruction token storage should be commented out for now.
          // if (res && res.data && res.data.token) {
          //   localStorage.setItem('auth_token', res.data.token);
          // }

          // For now, if backend returns user details, you can store them or navigate:
          // localStorage.setItem('user', JSON.stringify(res.data.user));

          // Navigate to dashboard or home after successful login
          // this.router.navigate(['/dashboard']);
          console.log('Login response', res);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.serverError = err?.error?.message || err?.message || 'Login failed. Please try again.';
        }
      });
  }

  onForgotPassword() {
    // navigate to forgot password page or open modal
    // this.router.navigate(['/forgot-password']);
    console.log('Forgot password clicked');
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}