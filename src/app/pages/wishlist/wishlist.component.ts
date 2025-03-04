import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';
import { IWishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [NavtabsComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  wishlist: IWishlist = {} as IWishlist;

  ngOnInit(): void {
    this.getWishListData();
  }

  getWishListData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = res;
      },
    });
  }

  removeWishListItem(productId: string): void {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.getWishListData();

        if (res.status === 'success') {
          this.toastrService.success('Product Removed Successfully', 'Trendy!');
        }
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
}
