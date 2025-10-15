import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  product = {
    name: 'Canon DSLR Camera',
    description: 'Professional camera for rent. Capture your best shots!',
    pricePerDay: 500,
    total: 1500,
    image: 'https://via.placeholder.com/400x400?text=Product+Image'
  };

  constructor(private dialog: MatDialog, private router: Router) { }

  confirmBooking() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call API here
        setTimeout(() => {
          this.router.navigate(['/thank-you']);
        }, 500);
      }
    });
  }
}
