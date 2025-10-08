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
    this.apiUrl = `${this.urlService.getBaseUrl()}/products`;
  }
  createProduct(product: any, images: File[]): Observable<any> {
    const formData = new FormData();

    // Append basic product fields
    Object.keys(product).forEach(key => {
      if (product[key] !== undefined && product[key] !== null) {
        formData.append(key, product[key]);
      }
    });
    // Append image files
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append('images', file, file.name);
      });
    }
    return this.http.post(`${this.apiUrl}/create`, formData);
  }

  findAll(page?: number, size?: number): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined) params = params.set('page', page.toString());
    if (size !== undefined) params = params.set('size', size.toString());
    return this.http.get(`${this.apiUrl}findAll`, { params });
  }
  
  findById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/findById`);
  }

  updateProduct(id: number, product: any, images?: File[]): Observable<any> {
    const formData = new FormData();

    Object.keys(product).forEach(key => {
      if (product[key] !== undefined && product[key] !== null) {
        formData.append(key, product[key]);
      }
    });

    if (images && images.length > 0) {
      images.forEach(file => formData.append('images', file, file.name));
    }

    return this.http.put(`${this.apiUrl}/update`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlService.getBaseUrl()}/categories/all`);
  }

  getSubcategories(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlService.getBaseUrl()}/subcategories/category/{categoryId}`
    );
  }
}