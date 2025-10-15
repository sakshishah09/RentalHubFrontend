import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, NgxScrollTopModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserRoute = true; // default to user layout

  constructor(private router: Router) {
    // Detect route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateLayout(event.urlAfterRedirects);
      });

    // Initial route
    this.updateLayout(this.router.url);
  }

  private updateLayout(url: string) {
    // Show User Layout for all routes except /seller or /admin
    this.isUserRoute = !url.startsWith('/seller') && !url.startsWith('/admin');
  }
}