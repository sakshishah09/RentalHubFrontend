import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryDetailsPageComponent } from './pages/category-details/category-details-page.component';
import { BookingComponent } from './pages/booking/booking.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryDetailsPageComponent },
  {path: 'booking', component: BookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }