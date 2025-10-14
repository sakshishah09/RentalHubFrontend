import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UrlService } from './url-service';

export interface SubCategoryResponse {
  id: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  imagePath: string | null;
  products?: any[];
}

export interface RestResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  totalRecords?: number;
  pageNumber?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private baseUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.baseUrl = `${this.urlService.getBaseUrl()}/subcategories`;
  }

  // ✅ Get subcategories by category ID
  getSubCategoriesByCategory(categoryId: number): Observable<SubCategoryResponse[]> {
    return this.http.get<RestResponse<SubCategoryResponse[]>>(`${this.baseUrl}/category/${categoryId}`)
      .pipe(
        map(res => (res.data || []).map(sub => ({
          ...sub,
          imagePath: this.getFullImageUrl(sub.imagePath)
        })))
      );
  }

  // ✅ Get all subcategories paginated
  getAllSubCategories(page: number, size: number): Observable<{ data: SubCategoryResponse[], totalRecords: number }> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<RestResponse<SubCategoryResponse[]>>(`${this.baseUrl}/all`, { params })
      .pipe(map(res => ({
        data: (res.data || []).map(sub => ({
          ...sub,
          imagePath: this.getFullImageUrl(sub.imagePath)
        })),
        totalRecords: res.totalRecords || 0
      })));
  }

  // ✅ Create a new subcategory
  createSubCategory(name: string, categoryId: number, image?: File): Observable<SubCategoryResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryId', categoryId.toString());
    if (image) formData.append('image', image);
    return this.http.post<RestResponse<SubCategoryResponse>>(this.baseUrl, formData)
      .pipe(map(res => {
        const sub = res.data!;
        sub.imagePath = this.getFullImageUrl(sub.imagePath);
        return sub;
      }));
  }

  // ✅ Update subcategory
  updateSubCategory(id: number, name?: string, categoryId?: number, image?: File): Observable<SubCategoryResponse> {
    const formData = new FormData();
    formData.append('id', id.toString());
    if (name) formData.append('name', name);
    if (categoryId) formData.append('categoryId', categoryId.toString());
    if (image) formData.append('image', image);
    return this.http.put<RestResponse<SubCategoryResponse>>(`${this.baseUrl}/update`, formData)
      .pipe(map(res => {
        const sub = res.data!;
        sub.imagePath = this.getFullImageUrl(sub.imagePath);
        return sub;
      }));
  }

  // ✅ Delete subcategory
  deleteSubCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Helper: return full image URL or default
  private getFullImageUrl(path: string | null | undefined): string {
    if (!path) return '/assets/default-category.png';
    return this.urlService.getImageUrl(path);
  }
}