import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { WhyChooseUsComponent } from '../../../../shared/components/why-choose-us/why-choose-us.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,              
  imports: [
    CommonModule,              
    HomeBannerComponent,  
    ProductComponent,
    WhyChooseUsComponent,     
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}