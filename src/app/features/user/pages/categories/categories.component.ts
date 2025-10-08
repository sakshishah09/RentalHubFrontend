import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-categories',
	standalone: true,
	imports: [CommonModule, CarouselModule, RouterModule],
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent{

}