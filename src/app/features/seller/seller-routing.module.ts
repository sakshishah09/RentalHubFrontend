import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { RentalBookingsComponent } from './pages/rental-bookings/rental-bookings.component';
import { SellOrdersComponent } from './pages/sell-order.component/sell-order.component';
import { HistoryComponent } from './pages/history/history.component';
import { OverviewComponent } from './pages/overview/overview.component';
const routes: Routes = [
  {
    path: '',
    component: SellerDashboardComponent, // The layout with sidebar + topbar
    children: [
    { path: 'overview', component: OverviewComponent},
    { path: 'add-product', component: AddProductComponent },
    { path: 'manage-products', component: ManageProductsComponent },
    { path: 'sell-order', component: SellOrdersComponent },
    { path: 'rental-bookings', component: RentalBookingsComponent },
    { path: 'history', component: HistoryComponent },
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
  
    ]
  }
];

// const routes: Routes = [
//   { path: '', component: SellerDashboardComponent },
//   { path: 'add-product', component: AddProductComponent },
//   { path: 'manage-products', component: ManageProductsComponent },
//   { path: 'sell-order', component: SellOrdersComponent },
//   { path: 'rental-bookings', component: RentalBookingsComponent },
//   { path: 'history', component: HistoryComponent }
  
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}