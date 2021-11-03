import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../model/book.model';
import { Cart } from '../model/cart.model';
import { CartItem } from '../model/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = new Cart();

  constructor() { }
  
  addToCart(book: Book): void{
    let cartItem = this.cart.items.find(item => item.book.isbn === book.isbn);
    if (cartItem){
      this.changeQuantity(book.isbn, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(book));
  }

  removeFromCart(bookId:string): void{
    this.cart.items =
    this.cart.items.filter(item => item.book.isbn != bookId);
  }
  
  changeQuantity(bookId: string, quantity:number){
    let cartItem = this.cart.items.find(item => item.book.isbn === bookId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart():Cart{
    return this.cart
  }
}
