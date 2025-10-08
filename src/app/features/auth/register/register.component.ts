import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;
  selectedImage?: File;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: [''],
      locationId: [null, Validators.required],
      roleId: [2, Validators.required],
      status: ['ACTIVE']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const user = { ...this.registerForm.value };
    delete user.confirmPassword;

    this.userService.signup(user, this.selectedImage).subscribe({
      next: res => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        alert('Registration failed!');
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}