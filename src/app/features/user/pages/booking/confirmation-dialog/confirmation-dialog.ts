import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,],
  template: `
    <h2 mat-dialog-title>Confirm Booking</h2>
    <mat-dialog-content>
      Are you sure you want to confirm this booking?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">No</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Yes</button>
    </mat-dialog-actions>
  `
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}