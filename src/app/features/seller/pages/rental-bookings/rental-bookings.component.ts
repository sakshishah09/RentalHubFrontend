import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-rental-bookings',
  templateUrl: './rental-bookings.component.html',
  styleUrls: ['./rental-bookings.component.scss'],
  imports: [CommonModule ,RouterModule] 
})
export class RentalBookingsComponent implements OnInit {

  bookings = [
    { id: 101, productName: 'Canon Camera', renterName: 'Rahul', pricePerDay: 30, days: 5, totalPrice: 150, status: 'Pending' },
    { id: 102, productName: 'Projector HD', renterName: 'Simran', pricePerDay: 20, days: 3, totalPrice: 60, status: 'Confirmed' }
  ];

  selectedBooking: any;
  actionType: string = '';
  modalInstance: any;

  ngOnInit() {}

  openConfirmModal(booking: any, type: string) {
    this.selectedBooking = booking;
    this.actionType = type;
    const modalEl = document.getElementById('bookingModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  confirmAction() {
    if (this.actionType === 'confirm') {
      this.selectedBooking.status = 'Confirmed';
    } else if (this.actionType === 'cancel') {
      this.selectedBooking.status = 'Cancelled';
    }
    this.modalInstance.hide();
  }

  refreshBookings() {
    console.log('Refreshing bookings...');
  }
}

