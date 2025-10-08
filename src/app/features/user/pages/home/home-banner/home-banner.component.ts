import { Component, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements AfterViewInit {
  showBackToTop: boolean = false;

  // Scroll down to next section
  scrollToContent() {
    const section = document.getElementById('next-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  // Scroll back to top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 300;
  }

  ngAfterViewInit() {
    const video = document.querySelector('video.bg-video') as HTMLVideoElement;
    if (video) {
      video.muted = true; // ensure muted
      video.play().catch(err => console.log('Video autoplay blocked:', err));
    }
  }
}
