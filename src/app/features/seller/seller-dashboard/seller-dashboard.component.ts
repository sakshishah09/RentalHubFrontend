import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-seller-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './seller-dashboard.component.html',
    styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent {
    productForm: FormGroup;
    placeholderImage = 'assets/images/placeholder.png';
    selectedImagePreview: string | ArrayBuffer | null = null;
    selectedFile: File | null = null;

    constructor(private fb: FormBuilder) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            availability: ['BOTH', Validators.required],
            price: [null],
            rentPrice: [null],
            stock: [1],
            description: [''],
            sku: [''],
            minStock: [0]
        });
    }

    onImageSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length) {
            this.selectedFile = input.files[0];
            const reader = new FileReader();
            reader.onload = () => (this.selectedImagePreview = reader.result);
            reader.readAsDataURL(this.selectedFile);
        }
    }

    onSubmit() {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }

        const payload = { ...this.productForm.value };
        // TODO: Call product service to upload image then save product
        console.log('Product payload', payload, this.selectedFile);
    }
}