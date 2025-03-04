import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [NavtabsComponent, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly productsService = inject(ProductsService);

  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  private readonly wishlistService = inject(WishlistService);

  productDetails: IProduct | null = null;

  SliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
    },
    nav: false,
  };

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId = params.get('productId');

        this.getProductDetails(productId);
      },
    });
  }

  getProductDetails(id: string | null) {
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
