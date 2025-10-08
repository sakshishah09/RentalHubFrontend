import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  set(key: string, value: any) { localStorage.setItem(key, JSON.stringify(value)); }
  get(key: string) { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
  remove(key: string) { localStorage.removeItem(key); }
}
