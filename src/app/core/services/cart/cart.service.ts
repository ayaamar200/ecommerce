import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: productId,
    });
  }

  updateCartProductQuantity(
    productId: string,
    newCount: number
  ): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: newCount,
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    );
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
    );
  }
}
