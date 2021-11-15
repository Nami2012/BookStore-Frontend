import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private router: Router) {
    // this.setCart();
  }

  ngOnInit(): void {
    this.loadBooks();
  }
  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';
  loadBooks() {
    this.cartService.getCart().subscribe((res: any) => {
      this.cartItemsList = res;
      this.totalPrice = 0;
      this.totalBookCount = 0;
      console.log('Cart', res);
      for (let [i, val] of this.cartItemsList.entries()) {
        this.totalPrice +=
          this.cartItemsList[i]['Book']['BPrice'] *
          this.cartItemsList[i]['Count'];
        this.totalBookCount += 1;
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

  // this changeQty function was used for testing during initial phase
  // changeQuantity(cartItem: CartItem, quantityStr: string) {
  //   // const quantity = parseInt(quantityStr);
  //   // this.cartService.changeQuantity(cartItem.book.BId, quantity)
  //   // this.setCart();
  // }

  // for initial Phase
  // setCart() {
  //   // this.cart = this.cartService.getCart();
  // }

  handleCheckout() {
    this.cartService.placeOrder().subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/orders/checkout/' + res]);
    });
  }
}
