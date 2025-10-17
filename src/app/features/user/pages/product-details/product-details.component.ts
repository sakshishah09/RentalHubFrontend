import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description?: string;
  images?: string[];
  pricePerDay?: number;
  priceForSale?: number;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { product: Product };
    if (state?.product) {
      this.product = state.product;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        // Fetch product by ID from backend if needed
        console.log('Fetch product by ID:', id);
      } else {
        this.router.navigate(['/categories']);
      }
    }
  }

  bookNow() {
    alert(`Booking initiated for ${this.product.name}!`);
  }
}