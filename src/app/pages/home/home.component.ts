import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // Main Slider Options
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  // Injecting the ProductsService and CartService
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  private readonly toastrService = inject(ToastrService);

  // Defining the products and categories arrays
  products: IProduct[] = [];
  productDetails: object = {};

  ngOnInit() {
    this.getProductsData();
    this.getProductDetails('6428de2adc1175abc65ca05b');
  }

  // Fetching the data from the services

  getProductsData() {
    this.productsService.getLimitProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
    });
  }

  getProductDetails(id: string) {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
      },
    });
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Trendy!');
        }
      },
    });
  }

  addToWishlist(productId: string): void {
    this.wishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Trendy!');
        }
      },
    });
  }
}
