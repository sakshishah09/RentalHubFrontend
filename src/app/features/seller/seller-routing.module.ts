import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { RentalBookingsComponent } from './pages/rental-bookings/rental-bookings.component';
import { HistoryComponent } from './pages/history/history.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SellOrdersComponent } from './pages/sell-order.component/sell-order.component';

const routes: Routes = [
  {
    path: '',
    component: SellerDashboardComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'sell-order', component: SellOrdersComponent },
      { path: 'rental-bookings', component: RentalBookingsComponent },
      { path: 'history', component: HistoryComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}