import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'manage-products', component: ManageProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}