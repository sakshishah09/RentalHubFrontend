import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product-service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  loading = true;
  subCategoryId!: number;
  subCategoryName!: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { subCategory: any };

    if (state?.subCategory) {
      this.subCategoryId = state.subCategory.id;
      this.subCategoryName = state.subCategory.name;
      this.fetchProducts(this.subCategoryId);
    } else {
      // fallback: get ID from URL
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.subCategoryId = +id;
          this.fetchProducts(this.subCategoryId);
        }
      });
    }
  }

  fetchProducts(subCategoryId: number) {
    this.loading = true;

    this.productService.getProductsBySubCategory(subCategoryId).subscribe({
      next: (res: any[]) => {
        this.products = res.map(p => ({
          ...p,
          images: p.images?.map((img: any) => img.imageUrl.replace(/\\/g, '/')) || ['/assets/default-product.png']
        }));
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  viewProductDetails(product: any) {
    this.router.navigate(['/product', product.id], { state: { product } });
  }
}