// import { Component, HostListener } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
//   standalone: true,
//   imports: [RouterModule, CommonModule]
// })
// export class NavbarComponent {
//   isSticky: boolean = false;
//   isMenuOpen: boolean = false;
//   activeDropdown: string | null = null;

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   toggleDropdown(menu: string) {
//     this.activeDropdown = this.activeDropdown === menu ? null : menu;
//   }

//   @HostListener('window:scroll', ['$event'])
//   onWindowScroll() {
//     this.isSticky = window.scrollY > 50;
//   }
// }


import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class NavbarComponent implements OnInit {
  isSticky = false;
  isMenuOpen = false;
  activeDropdown: string | null = null;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(menu: string) {
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isSticky = window.scrollY > 50;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}