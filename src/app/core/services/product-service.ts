import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url-service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly apiUrl: string;

    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) {
        this.apiUrl = `${this.urlService.getBaseUrl()}/seller/products`;
    }

    // Create a new product with images
    insertProduct(product: any, images: File[]): Observable<any> {
        const formData = new FormData();
        formData.append('product', JSON.stringify(product));
        if (images && images.length > 0) {
            images.forEach(img => formData.append('images', img));
        }
        return this.http.post(`${this.apiUrl}/insert`, formData);
    }

    // Update an existing product with images
    updateProduct(product: any, imagesToUpdate?: { [key: number]: File }, newImages?: File[]): Observable<any> {
        const formData = new FormData();
        formData.append('product', JSON.stringify(product));

        if (imagesToUpdate) {
            Object.keys(imagesToUpdate).forEach(key => {
                formData.append(`imagesToUpdate`, imagesToUpdate[+key]);
            });
        }

        if (newImages && newImages.length > 0) {
            newImages.forEach(img => formData.append('newImages', img));
        }

        return this.http.put(`${this.apiUrl}/update`, formData);
    }

    // Find product by ID
    findById(id: number): Observable<any> {
        const params = new HttpParams().set('id', id.toString());
        return this.http.get(`${this.apiUrl}/findById`, { params });
    }

    // Get paginated list of products
    findAll(page: number, size: number): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get(`${this.apiUrl}/findAll`, { params });
    }

    // Filter products with multiple parameters
    filterBy(filters: {
        page: number;
        size: number;
        categoryName?: string;
        subcategoryName?: string;
        productName?: string;
        description?: string;
        color?: string;
        minRentalPrice?: number;
        maxRentalPrice?: number;
        minSalePrice?: number;
        maxSalePrice?: number;
        keyword?: string;
    }): Observable<any> {
        let params = new HttpParams()
            .set('page', filters.page.toString())
            .set('size', filters.size.toString());

        if (filters.categoryName) params = params.set('categoryName', filters.categoryName);
        if (filters.subcategoryName) params = params.set('subcategoryName', filters.subcategoryName);
        if (filters.productName) params = params.set('productName', filters.productName);
        if (filters.description) params = params.set('description', filters.description);
        if (filters.color) params = params.set('color', filters.color);
        if (filters.minRentalPrice) params = params.set('minRentalPrice', filters.minRentalPrice.toString());
        if (filters.maxRentalPrice) params = params.set('maxRentalPrice', filters.maxRentalPrice.toString());
        if (filters.minSalePrice) params = params.set('minSalePrice', filters.minSalePrice.toString());
        if (filters.maxSalePrice) params = params.set('maxSalePrice', filters.maxSalePrice.toString());
        if (filters.keyword) params = params.set('keyword', filters.keyword);

        return this.http.get(`${this.apiUrl}/filterBy`, { params });
    }

    // Get categories
    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlService.getBaseUrl()}/categories`);
    }

    // Get subcategories by category ID
    getSubcategories(categoryId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlService.getBaseUrl()}/categories/${categoryId}/subcategories`);
    }
}