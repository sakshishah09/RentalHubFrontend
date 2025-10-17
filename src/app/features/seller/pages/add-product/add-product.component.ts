import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { CategoriesService } from '../../../../core/services/categories-service';
import { SubCategoryService } from '../../../../core/services/subcategories-service';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  images: { url: string; file?: File }[] = [];
  loading = false;
  errorMsg = '';

  categories: any[] = [];
  subcategories: any[] = [];

  productTypes: string[] = ['RENT', 'SALE', 'BOTH']; // Match your enum values if any

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoriesService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      pricePerDay: [0, [Validators.required, Validators.min(0)]],
      priceForSale: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required],
      subcategoryId: [null, Validators.required],
      userId: [1], // Replace with logged-in user
      productType: ['', Validators.required]
    });

    // Load categories from backend
    this.loadCategories();

    // Load subcategories dynamically based on category selection
    this.productForm.get('categoryId')?.valueChanges.subscribe((catId) => {
      if (catId) this.loadSubcategories(catId);
      else this.subcategories = [];
    });
  }

  // ✅ Load categories
  loadCategories() {
    this.categoryService.getAllCategories(0, 100).subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error('❌ Failed to load categories', err)
    });
  }

  // ✅ Load subcategories
  loadSubcategories(categoryId: number) {
    this.subCategoryService.getSubCategoriesByCategory(categoryId).subscribe({
      next: (res) => (this.subcategories = res),
      error: (err) => console.error('❌ Failed to load subcategories', err)
    });
  }

  // ✅ Handle image selection
  onAddImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({ url: e.target.result, file });
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ Trigger file input click
  addAnotherImage() {
    this.fileInput.nativeElement.click();
  }

  // ✅ Remove image
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  // ✅ Submit form
  onSubmit() {
    if (this.productForm.invalid) {
      this.errorMsg = 'Please fill all required fields correctly.';
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // Prepare FormData
    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    // Append images
    this.images.forEach((img, index) => {
      if (img.file) formData.append('images', img.file);
    });

    this.productService
      .saveProduct(formData)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          alert('✅ Product added successfully!');
          this.productForm.reset();
          this.images = [];
        },
        error: (err) => {
          console.error('❌ Product creation failed', err);
          this.errorMsg = 'Failed to add product. Please try again.';
        }
      });
  }
}
