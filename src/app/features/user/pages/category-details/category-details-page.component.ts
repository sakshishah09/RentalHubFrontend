import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService, CategoryDetailsResponse } from '../../../../core/services/categories-service';

@Component({
  selector: 'app-category-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details-page.component.html',
  styleUrls: ['./category-details-page.component.scss']
})
export class CategoryDetailsPageComponent implements OnInit {

  categoryDetails?: CategoryDetailsResponse;
  selectedSubCategoryId?: number;
  subcategoryProducts: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    console.log('Fetching category details for ID:', id);
    this.fetchCategoryDetails(id);
  }

  fetchCategoryDetails(id: number) {
    this.loading = true;

    this.categoryService.getCategoryDetails(id).subscribe({
      next: (details: any) => {
        console.log('Raw category details from backend:', details);

        // Category image
        details.imagePath = details.imagePath
          ? this.categoryService.getFullImageUrl(details.imagePath)
          : '/assets/default-category.png';
        console.log('Category image path:', details.imagePath);

        // Subcategories
        details.subCategories = (details.subcategories || []).map((sub: any) => {
          const subImage = sub.imagePath
            ? this.categoryService.getFullImageUrl(sub.imagePath)
            : '/assets/default-category.png';

          const products = (sub.products || []).map((prod: any) => {
            const prodImage = prod.images?.[0]?.imageUrl
              ? this.categoryService.getFullImageUrl(prod.images[0].imageUrl)
              : '/assets/default-product.png';
            return { ...prod, imagePath: prodImage };
          });

          return { ...sub, imagePath: subImage, products };
        });

        this.categoryDetails = details;
        console.log('Final mapped category details:', this.categoryDetails);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching category details:', err);
        this.loading = false;
      }
    });
  }

  selectSubCategory(sub: any) {
    this.selectedSubCategoryId = sub.id;
    this.subcategoryProducts = sub.products || [];
    console.log(`Selected subcategory: ${sub.name}, products:`, this.subcategoryProducts);
  }
}
