import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService, CategoryDetailsResponse } from '../../../../core/services/categories-service';
import { SubCategoryResponse } from '../../../../core/services/subcategories-service';

@Component({
  selector: 'app-category-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details-page.component.html',
  styleUrls: ['./category-details-page.component.scss']
})
export class CategoryDetailsPageComponent implements OnInit {
  categoryDetails?: CategoryDetailsResponse;
  selectedSubCategory?: SubCategoryResponse;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fetchCategoryDetails(id);
  }

  fetchCategoryDetails(id: number) {
    this.loading = true;

    this.categoryService.getCategoryDetails(id).subscribe({
      next: (details: any) => {
        // Fix category image
        details.imagePath = details.imagePath
          ? this.categoryService.getFullImageUrl(details.imagePath.replace(/\\/g, '/'))
          : '/assets/default-category.png';

        // Fix subcategory images & products
        details.subCategories = (details.subcategories || []).map((sub: any) => ({
          ...sub,
          imagePath: sub.imagePath
            ? this.categoryService.getFullImageUrl(sub.imagePath.replace(/\\/g, '/'))
            : '/assets/default-category.png',
          products: (sub.products || []).map((p: any) => ({
            ...p,
            images: (p.images || []).map((img: any) =>
              this.categoryService.getFullImageUrl(img.imageUrl.replace(/\\/g, '/'))
            ) || ['/assets/default-product.png']
          }))
        }));

        this.categoryDetails = details;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  selectSubCategory(sub: SubCategoryResponse) {
    this.selectedSubCategory = sub;
  }

  viewProductDetails(product: any) {
    this.router.navigate(['/product', product.id], { state: { product } });
  }
}