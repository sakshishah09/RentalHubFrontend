import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-sell-orders',
  templateUrl: './sell-order.component.html',
  styleUrls: ['./sell-order.component.scss'],
  imports: [CommonModule,RouterModule] 
})
export class SellOrdersComponent implements OnInit {

  orders = [
    { id: 1, productName: 'Laptop Dell XPS', buyerName: 'John Doe', priceForSale: 1200, status: 'Pending', date: new Date() },
    { id: 2, productName: 'iPhone 14', buyerName: 'Alice', priceForSale: 999, status: 'Approved', date: new Date() }
  ];

  selectedOrder: any;
  actionType: string = '';
  modalInstance: any;

  ngOnInit() {}

  openConfirmModal(order: any, type: string) {
    this.selectedOrder = order;
    this.actionType = type;
    const modalEl = document.getElementById('confirmModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  confirmAction() {
    if (this.actionType === 'approve') {
      this.selectedOrder.status = 'Approved';
    } else if (this.actionType === 'cancel') {
      this.selectedOrder.status = 'Cancelled';
    }
    this.modalInstance.hide();
  }

  refreshOrders() {
    console.log('Refreshing orders...');
  }
}

