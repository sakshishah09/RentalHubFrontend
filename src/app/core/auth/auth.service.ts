import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Placeholder methods: integrate with your backend
  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
  getToken(): string | null { return localStorage.getItem('token'); }
  login(token: string) { localStorage.setItem('token', token); }
  logout() { localStorage.removeItem('token'); }
}
