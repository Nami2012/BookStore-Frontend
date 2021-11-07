import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckoutService } from './services/checkout.service';
import { Coupon } from 'src/app/coupon/model/coupon.model';
import { CartService } from 'src/app/cart/services/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  couponList:Coupon[] = [];
  couponSubscription!: Subscription;
  cart:any;
  discount: number = 0;
  constructor(private checkoutService: CheckoutService, private cartService: CartService) { }

  ngOnInit(): void {
    this.couponSubscription = this.checkoutService.getCoupons().
    subscribe((res: any[]) => {
      this.couponList = res;
    });
    this.cart = this.cartService.checkout();
    console.log(this.couponList);
  }

  handleChange(){
    return this.discount;
  }

  ConfirmOrder(){

  }

  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe();
    if (this.couponList && this.couponList.length > 0) {
      this.couponList.length = 0; 
    }
  }
}
