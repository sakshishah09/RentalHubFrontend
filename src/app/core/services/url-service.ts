import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly baseUrl = 'http://localhost:2024/rental-sys-local';

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}