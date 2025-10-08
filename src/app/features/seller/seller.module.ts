import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';

// Standalone components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    DashboardComponent,
    AddProductComponent,
    ManageProductsComponent
  ]
})
export class SellerModule {}