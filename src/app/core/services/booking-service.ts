import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url-service';

export interface BookingSaveRequest {
  userId: number;
  productId: number;
  fromDate: string;
  toDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.baseUrl = `${this.urlService.getBaseUrl()}/bookings`;
  }

  /** Create new booking */
  createBooking(request: BookingSaveRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/insert`, request);
  }

  /** Get bookings by user (optional) */
  getBookingsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
}