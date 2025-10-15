import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog';
import { BookingSaveRequest, BookingService } from '../../../../core/services/booking-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule] ,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  product = {
    id: 1,  // example productId, replace dynamically
    name: 'Canon DSLR Camera',
    description: 'Professional camera for rent. Capture your best shots!',
    pricePerDay: 500,
    image: 'https://via.placeholder.com/400x400?text=Product+Image'
  };

  totalAmount: number = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      paymentMethod: ['COD', Validators.required]
    });

    this.bookingForm.valueChanges.subscribe(() => this.calculateTotal());
  }

  /** ✅ Calculate total based on date difference */
  calculateTotal() {
    const fromDate = new Date(this.bookingForm.get('fromDate')?.value);
    const toDate = new Date(this.bookingForm.get('toDate')?.value);

    if (fromDate && toDate && toDate > fromDate) {
      const days = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
      this.totalAmount = days * this.product.pricePerDay;
    } else {
      this.totalAmount = 0;
    }
  }

  /** ✅ Open confirmation dialog and send booking */
  confirmBooking() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBooking();
      }
    });
  }

  /** ✅ Save booking to backend */
  saveBooking() {
    const request: BookingSaveRequest = {
      userId: 1, // Replace with logged-in user id
      productId: this.product.id,
      fromDate: this.bookingForm.value.fromDate,
      toDate: this.bookingForm.value.toDate
    };

    this.loading = true;

    this.bookingService.createBooking(request)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          alert('✅ Booking confirmed successfully!');
          this.router.navigate(['/thank-you']);
        },
        error: (err) => {
          console.error('❌ Booking failed:', err);
          alert('Booking failed. Please try again.');
        }
      });
  }
}
