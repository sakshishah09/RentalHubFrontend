import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// Standalone components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardComponent,  
    UsersComponent,
    ProductsComponent
  ]
})
export class AdminModule {}