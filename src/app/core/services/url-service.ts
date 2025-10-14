import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly baseUrl = 'http://127.0.0.1:2024/rental-sys-local';

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  // Helper to get full image URL
  getImageUrl(relativePath: string): string {
    if (!relativePath) return '/assets/default-category.png';
    const normalizedPath = relativePath.replace(/\\/g, '/').trim();
    return `${this.baseUrl}/${encodeURI(normalizedPath)}`;
  }
}