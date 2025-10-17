import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryDetailsPageComponent } from './pages/category-details/category-details-page.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    CarouselModule,
    HomeComponent,
    HomeBannerComponent,
    CategoriesComponent,
    CategoryDetailsPageComponent,
    ProfileComponent,
    ProductComponent,
    ProductDetailsComponent
  ]
})
export class UserModule { }