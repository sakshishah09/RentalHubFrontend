import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  info(msg: string) { console.info(msg); }
  success(msg: string) { console.log(msg); }
  error(msg: string) { console.error(msg); }
}