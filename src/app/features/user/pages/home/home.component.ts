import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { CategoriesComponent } from '../categories/categories.component';
import { WhyChooseUsComponent } from '../../../../shared/components/why-choose-us/why-choose-us.component';

@Component({
  selector: 'app-home',
  standalone: true,              
  imports: [
    CommonModule,              
    HomeBannerComponent,        
    CategoriesComponent,
    WhyChooseUsComponent,     
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}