import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from './model/cart.model';
import { CartItem } from './model/cartItem.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  cartItemsList: any[] = [];
  cartSubscription!: Subscription;
  count: number = 0;
  totalPrice: any = 0;
  totalBookCount: any = 0;
  constructor(private cartService: CartService) {
    this.setCart();
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.cartService.getCart().subscribe((res: any) => {
      this.cartItemsList = res;
      this.totalPrice = 0;
      this.totalBookCount = 0;
      for (let [i, val] of this.cartItemsList.entries()) {
        this.totalPrice +=
          this.cartItemsList[i]['Book']['BPrice'] *
          this.cartItemsList[i]['Count'];
        this.totalBookCount += this.cartItemsList[i]['Count'];
        //console.log(this.cartItemsList[i]["Book"]["BPrice"]);
      }
    });
  }

  increment(Bid: number, count: number) {
    this.cartService.changeQuantity(Bid, count + 1).subscribe((res: any) => {
      this.loadBooks();
      return res;
    });
  }

  decrement(Bid: number, count: number) {
    this.cartService.changeQuantity(Bid, count - 1).subscribe((res: any) => {
      this.loadBooks();
      return res;
    });
  }

  removeFromCart(BId: number) {
    this.cartSubscription = this.cartService
      .removeFromCart(BId)
      .subscribe((res: any) => {
        this.loadBooks();
        return res;
      });
    // this.cartService.removeFromCart(cartItem.book.BId);
    // this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityStr: string) {
    // const quantity = parseInt(quantityStr);
    // this.cartService.changeQuantity(cartItem.book.BId, quantity)
    // this.setCart();
  }

  setCart() {
    // this.cart = this.cartService.getCart();
  }

  Checkout(items: CartItem[]) {}
}
