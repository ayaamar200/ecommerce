import { Component, inject } from '@angular/core';
import { IBrands } from '../../shared/interfaces/ibrands';
import { BrandsService } from '../../core/services/brands/brands.service';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';

@Component({
  selector: 'app-brands',
  imports: [NavtabsComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  // Injecting the ProductsService and CategoriesService
  private readonly brandsService = inject(BrandsService);

  // Defining the  categories arrays

  brands: IBrands[] = [];
  brandsDetails: object = {};

  // Fetching the data from the services

  getBrandsData() {
    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        console.log(response.data);
        this.brands = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getBrandsDetails(id: string) {
    this.brandsService.getSpecificBrand(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.brandsDetails = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.getBrandsData();
    this.getBrandsDetails('6439d61c0049ad0b52b90051');
  }
}
