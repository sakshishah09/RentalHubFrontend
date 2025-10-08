import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SellerRoutingModule } from './seller-routing.module';

// Components
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { RentalBookingsComponent } from './pages/rental-bookings/rental-bookings.component';
import { SellOrdersComponent } from './pages/sell-order.component/sell-order.component';
import { HistoryComponent } from './pages/history/history.component';
import { OverviewComponent } from './pages/overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SellerRoutingModule,
    SellerDashboardComponent,
    AddProductComponent,
    ManageProductsComponent,
    SellOrdersComponent,
    RentalBookingsComponent,
    HistoryComponent,
    OverviewComponent
  ]
})
export class SellerModule {}