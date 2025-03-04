import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule, NavtabsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  // Injecting the ProductsService and CategoriesService
  private readonly categoriesService = inject(CategoriesService);

  // Defining the  categories arrays

  categories: ICategory[] = [];
  categoryDetails: object = {};

  ngOnInit() {
    this.getCategoriesData();
    this.getCategoryDetails('6439d61c0049ad0b52b90051');
  }
  // Fetching the data from the services

  getCategoriesData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.categories = response.data;
      },
    });
  }

  getCategoryDetails(id: string) {
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.categoryDetails = response.data;
      },
    });
  }
}
