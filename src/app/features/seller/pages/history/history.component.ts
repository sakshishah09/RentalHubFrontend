import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDashboardComponent } from '../../seller-dashboard/seller-dashboard.component';
import { RouterModule } from '@angular/router';

interface Order {
  id: number;
  productName: string;
  type: 'sell' | 'rent';
  date: string;
  price: number;
  status: 'completed' | 'returned' | 'cancelled';
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  filter: 'all' | 'sell' | 'rent' = 'all';

  orders: Order[] = [
    { id: 1, productName: 'Wooden Chair', type: 'sell', date: '2025-09-15', price: 1200, status: 'completed' },
    { id: 2, productName: 'LED Lamp', type: 'rent', date: '2025-09-17', price: 50, status: 'returned' },
    { id: 3, productName: 'Sofa Set', type: 'sell', date: '2025-09-18', price: 5000, status: 'completed' },
    { id: 4, productName: 'Hair Dryer', type: 'rent', date: '2025-09-20', price: 20, status: 'cancelled' }
  ];

  setFilter(filter: 'all' | 'sell' | 'rent') {
    this.filter = filter;
  }

  get filteredOrders() {
    if (this.filter === 'all') return this.orders;
    return this.orders.filter(o => o.type === this.filter);
  }
}
