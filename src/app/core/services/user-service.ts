import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) {
    this.apiUrl = `${this.urlService.getBaseUrl()}/users`;
  }

  // Signup (multipart/form-data)
  signup(user: any, image?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (image) {
      formData.append('image', image, image.name);
    }
    return this.http.post(`${this.apiUrl}/signup`, formData);
  }

  // Login (application/json)
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Find user by ID
  findById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.apiUrl}/findById`, { params });
  }

  // Find all users with pagination
  findAll(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.apiUrl}/findAll`, { params });
  }
}