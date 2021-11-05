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
  constructor(private cartService:CartService) { 
    this.setCart();
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart()
  }

  
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.book.BId);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityStr:string){
    const quantity = parseInt(quantityStr);
    this.cartService.changeQuantity(cartItem.book.BId, quantity)
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }

  Checkout(items: CartItem[]){
    
  }

}
