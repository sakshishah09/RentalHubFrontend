import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UrlService } from './url-service';

export interface CategoryResponse {
  id: number;
  name: string;
  imagePath: string;
}

export interface CategoryDetailsResponse {
  id: number;
  name: string;
  imagePath: string;
  subCategories: CategoryResponse[];
  products: any[];
}

export interface RestResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.baseUrl = `${this.urlService.getBaseUrl()}/categories`;
  }

  getAllCategories(page: number, size: number): Observable<CategoryResponse[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<RestResponse<CategoryResponse[]>>(`${this.baseUrl}/all`, { params })
      .pipe(map(res => res.data || []));
  }

  getCategoryDetails(id: number): Observable<CategoryDetailsResponse> {
    return this.http.get<RestResponse<CategoryDetailsResponse>>(`${this.baseUrl}/${id}/details`)
      .pipe(map(res => res.data!));
  }

  getFullImageUrl(path: string): string {
    if (!path) return '/assets/default-category.png';
    return this.urlService.getImageUrl(path);
  }
} 