import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  images: { url: string, file?: File }[] = [];
  loading = false;
  errorMsg = '';

  categories: any[] = [];
  subcategories: any[] = [];

  productTypes: string[] = ['Electronics', 'Furniture', 'Clothing', 'Books']; 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      pricePerDay: ['', [Validators.required, Validators.min(0)]],
      priceForSale: ['', [Validators.required, Validators.min(0)]],
      availableType: ['Sell', Validators.required],
      productType: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      userId: [1] // TODO: Replace with logged-in user ID
    });

    this.loadCategories();

    this.productForm.get('category')?.valueChanges.subscribe(catId => {
      this.loadSubcategories(catId);
    });
  }

  // Load categories from backend
  loadCategories() {
    this.productService.getCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error('❌ Failed to load categories', err)
    });
  }

  // Load subcategories based on selected category
  loadSubcategories(categoryId: number) {
    if (!categoryId) {
      this.subcategories = [];
      this.productForm.get('subcategory')?.setValue('');
      return;
    }

    this.productService.getSubcategories(categoryId).subscribe({
      next: data => this.subcategories = data,
      error: err => console.error('❌ Failed to load subcategories', err)
    });
  }

  // Add image from file input
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

  // Trigger file input click
  addAnotherImage() {
    this.fileInput.nativeElement.click();
  }

  // Remove selected image
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  // Submit form to backend
  onSubmit() {
    if (this.productForm.invalid) {
      this.errorMsg = 'Please fill all required fields correctly.';
      this.productForm.markAllAsTouched();
      return;
    }

    const productData = { ...this.productForm.value };
    const imageFiles = this.images.map(img => img.file).filter(f => f) as File[];

    this.loading = true;
    this.errorMsg = '';

    this.productService.insertProduct(productData, imageFiles)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          alert('✅ Product added successfully!');
          this.productForm.reset();
          this.images = [];
        },
        error: err => {
          console.error('❌ Product creation failed', err);
          this.errorMsg = 'Failed to add product. Please try again.';
        }
      });
  }
}
