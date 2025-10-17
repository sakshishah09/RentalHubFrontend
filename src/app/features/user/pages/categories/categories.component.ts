import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesService, CategoryResponse } from '../../../../core/services/categories-service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryResponse[] = [];
  showAll = false;
  loading = false;

  constructor(private categoryService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.loading = true;
    this.categoryService.getAllCategories(0, 50).subscribe({
      next: (cats) => {
        this.categories = cats.map(c => ({
          ...c,
          imagePath: this.categoryService.getFullImageUrl(c.imagePath)
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.loading = false;
      }
    });
  }

  viewAll() {
    this.showAll = !this.showAll;
  }

  get visibleCategories() {
    return this.showAll ? this.categories : this.categories.slice(0, 10);
  }

  // Navigate to category details page
  selectCategory(cat: CategoryResponse) {
    this.router.navigate(['/categories', cat.id]);
  }
}