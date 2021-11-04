import { Component, OnInit } from '@angular/core';
import { Cart } from './model/cart.model';
import { CartItem } from './model/cartItem.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart!:Cart;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.book.isbn);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityStr:string){
    const quantity = parseInt(quantityStr);
    this.cartService.changeQuantity(cartItem.book.isbn, quantity)
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }

}
