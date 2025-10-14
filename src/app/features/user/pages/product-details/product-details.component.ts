import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  img: string;
  desc: string;
  priceRent: string;
  priceBuy: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { product: Product };
    if (state?.product) {
      this.product = state.product;
    } else {
      // fallback if accessed directly
      this.router.navigate(['/products']);
    }
  }

  bookNow() {
    alert(`Booking initiated for ${this.product.name}!`);
  }
}