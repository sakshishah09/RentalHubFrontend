import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDashboardComponent } from '../../seller-dashboard/seller-dashboard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {
  products = [
    {
      id: 1,
      name: 'Wooden Chair',
      size: 'Medium',
      color: 'Brown',
      priceForSale: 1200,
      pricePerDay: 50,
      available: true,
      category: 'Furniture',
      subcategory: 'Chair'
    },
    {
      id: 2,
      name: 'LED Lamp',
      size: 'Small',
      color: 'White',
      priceForSale: 700,
      pricePerDay: 25,
      available: false,
      category: 'Electronics',
      subcategory: 'Lamp'
    }
  ];

  toggleAvailability(product: any) {
    product.available = !product.available;
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
