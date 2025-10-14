import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  img: string;
  desc: string;
  priceRent: string;
  priceBuy: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  showAll = false;

  products: Product[] = [
    { name: 'Sofa', img: 'assets/products/Sofa.jpg', desc: 'Comfortable 3-seater sofa', priceRent: '$50/month', priceBuy: '$300' },
    { name: 'Dining Table', img: 'assets/products/Dining Table.webp', desc: 'Wooden dining table', priceRent: '$30/month', priceBuy: '$150' },
    { name: 'Bed', img: 'assets/products/Bed.webp', desc: 'Queen size bed', priceRent: '$40/month', priceBuy: '$250' },
    { name: 'Laptop', img: 'assets/products/Laptop.avif', desc: 'High performance laptop', priceRent: '$60/month', priceBuy: '$500' },
    { name: 'Camera', img: 'assets/products/Camera.jpg', desc: 'DSLR Camera', priceRent: '$35/month', priceBuy: '$250' },
    { name: 'Guitar', img: 'assets/products/Guitar.jpg', desc: 'Acoustic Guitar', priceRent: '$20/month', priceBuy: '$120' },
    { name: 'Chair', img: 'assets/products/Chair.jpg', desc: 'Ergonomic chair', priceRent: '$15/month', priceBuy: '$80' },
    { name: 'Microwave', img: 'assets/products/Microwave.avif', desc: '800W Microwave', priceRent: '$10/month', priceBuy: '$60' },
    { name: 'Watch', img: 'assets/products/Watch.webp', desc: 'Luxury wristwatch', priceRent: '$25/month', priceBuy: '$200' },
    { name: 'Bookshelf', img: 'assets/products/Bookshelf.webp', desc: 'Wooden bookshelf', priceRent: '$20/month', priceBuy: '$100' },
    { name: 'Iron', img: 'assets/products/2.jpg', desc: '10-inch tablet', priceRent: '$30/month', priceBuy: '$250' },
    { name: 'Shoes', img: 'assets/products/Shoes.webp', desc: 'Sports shoes', priceRent: '$10/month', priceBuy: '$50' },
    { name: 'Lamp', img: 'assets/products/Lamp.jpg', desc: 'LED lamp', priceRent: '$5/month', priceBuy: '$30' },
    { name: 'Backpack', img: 'assets/products/Backpack.webp', desc: 'Travel backpack', priceRent: '$8/month', priceBuy: '$40' },
    { name: 'Watch', img: 'assets/products/3.webp', desc: 'Latest smartphone', priceRent: '$40/month', priceBuy: '$400' },
    { name: 'AirPods', img: 'assets/products/AirPods.jpg', desc: 'Noise cancelling', priceRent: '$15/month', priceBuy: '$90' },
    { name: 'Printer', img: 'assets/products/Printer.jpeg', desc: 'All-in-one printer', priceRent: '$20/month', priceBuy: '$120' },
    { name: 'Coffee Maker', img: 'assets/products/Coffee Maker.jpg', desc: 'Automatic coffee maker', priceRent: '$10/month', priceBuy: '$70' },
    { name: 'AirPods', img: 'assets/products/5.webp', desc: '50-inch LED TV', priceRent: '$60/month', priceBuy: '$400' },
    { name: 'Iron', img: 'assets/products/7.jpg', desc: 'Ceiling fan', priceRent: '$5/month', priceBuy: '$35' }
  ];

  constructor(private router: Router) {}

  viewAll() {
    this.showAll = !this.showAll;
  }

  get visibleProducts() {
    return this.showAll ? this.products : this.products.slice(0, 10);
  }

  openDetails(product: Product) {
    this.router.navigate(['/product-details', product.name], { state: { product } });
  }
}