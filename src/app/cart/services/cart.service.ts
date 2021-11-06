import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';
import { CartItem } from '../model/cartItem.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();

  constructor() {}

  addToCart(book: any): void {
    let cartItem = this.cart.items.find((item) => item.book.BId === book.BId);
    if (cartItem) {
      this.changeQuantity(book.BId, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(book));
  }

  removeFromCart(bookId: number): void {
    this.cart.items = this.cart.items.filter((item) => item.book.BId != bookId);
  }

  changeQuantity(bookId: number, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.book.BId === bookId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart(): Cart {
    return this.cart;
  }
}
