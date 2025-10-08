import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeBannerComponent } from './pages/home/home-banner/home-banner.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  // No declarations because they’re standalone
  imports: [
    CommonModule,
    UserRoutingModule,
    CarouselModule,

    // Standalone components imported here
    HomeComponent,
    HomeBannerComponent,
    CategoriesComponent,
    ProfileComponent,
    ProductDetailsComponent
  ]
})
export class UserModule {}