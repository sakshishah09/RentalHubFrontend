import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.emailOrMobileValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      rememberMe: [false]
    });

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

  emailOrMobileValidator(control: AbstractControl): ValidationErrors | null {
    const v = (control.value || '').toString().trim();
    if (!v) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobileRegex = /^[0-9]{6,10}$/;
    if (emailRegex.test(v) || mobileRegex.test(v)) return null;
    return { emailOrMobile: true };
  }

  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }
  get rememberMe() { return this.loginForm.get('rememberMe')!; }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = {
      username: this.username.value,
      password: this.password.value
    };

    this.loading = true;
    this.serverError = null;

    this.userService.login(credentials)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res: any) => {
          if (this.rememberMe.value) {
            localStorage.setItem('saved_username', credentials.username);
            localStorage.setItem('saved_password', credentials.password);
            localStorage.setItem('saved_remember', 'true');
          } else {
            localStorage.removeItem('saved_username');
            localStorage.removeItem('saved_password');
            localStorage.removeItem('saved_remember');
          }

          // ✅ Use AuthService now
          this.authService.login();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.serverError = err?.error?.message || 'Login failed. Please try again.';
        }
      });
  }

    goToRegister() {
    this.router.navigate(['auth/register']);
  }

  onForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}