import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class NavbarComponent {
  isSticky: boolean = false;
  isMenuOpen: boolean = false;
  activeDropdown: string | null = null;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(menu: string) {
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isSticky = window.scrollY > 50;
  }
}