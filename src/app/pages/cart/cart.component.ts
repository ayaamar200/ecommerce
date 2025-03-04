import { Component, inject, OnInit } from '@angular/core';
import { NavtabsComponent } from '../../shared/components/ui/navtabs/navtabs.component';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [NavtabsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartData: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartData = res;
      },
    });
  }

  removeCartItem(productId: string): void {
    this.cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res;
        if (res.status === 'success') {
          this.toastrService.success('Product Removed Successfully', 'Trendy!');
        }
      },
    });
  }

  updateCount(productId: string, count: number): void {
    this.cartService.updateCartProductQuantity(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res;
        if (res.status === 'success') {
          this.toastrService.success('Product Updated Successfully', 'Trendy!');
        }
      },
    });
  }
}
