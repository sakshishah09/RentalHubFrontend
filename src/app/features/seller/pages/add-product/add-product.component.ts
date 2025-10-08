
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      pricePerDay: ['', [Validators.required, Validators.min(0)]],
      priceForSale: ['', [Validators.required, Validators.min(0)]],
      available: [true],
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
      userId: [1] // TODO: get from logged-in user later
    });

    this.loadCategories();

    // load subcategories dynamically
    this.productForm.get('categoryId')?.valueChanges.subscribe(catId => {
      this.loadSubcategories(catId);
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => console.error('❌ Failed to load categories', err)
    });
  }

  loadSubcategories(categoryId: number) {
    if (!categoryId) {
      this.subcategories = [];
      this.productForm.get('subcategoryId')?.setValue('');
      return;
    }

    this.productService.getSubcategories(categoryId).subscribe({
      next: data => this.subcategories = data,
      error: err => console.error('❌ Failed to load subcategories', err)
    });
  }

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

  addAnotherImage() {
    this.fileInput.nativeElement.click();
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.errorMsg = 'Please fill all required fields correctly.';
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    this.images.forEach(img => {
      if (img.file) {
        formData.append('images', img.file, img.file.name);
      }
    });

    this.loading = true;
    this.errorMsg = '';

    this.productService.createProduct(formData)
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

