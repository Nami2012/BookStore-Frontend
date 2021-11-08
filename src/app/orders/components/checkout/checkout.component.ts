import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckoutService } from './services/checkout.service';
import { Coupon } from 'src/app/coupon/model/coupon.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  couponList: Coupon[] = [];
  couponSubscription!: Subscription;
  cart: any[] = [];
  order!: any;
  orderId!: any;
  discount: number = 0;
  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.couponSubscription = this.checkoutService
      .getCoupons()
      .subscribe((res: any[]) => {
        this.couponList = res;
      });
    // this.cart = this.cartService.checkout();
    console.log(this.couponList);

    this.orderId = this.route.snapshot.paramMap.get('orderid');
    console.log('Order Id', this.orderId);
    this.checkoutService.getOrderDetails(this.orderId).subscribe((res: any) => {
      this.order = res[0];
      for (let i = 0; i < this.order.OrderItems.length; i++) {
        console.log(this.order.OrderItems[i].Book);
        this.cart.push(this.order.OrderItems[i].Book);
      }
      console.log('Cart', this.cart);
    });
  }

  handleChange() {
    return this.discount;
  }

  ConfirmOrder() {
    this.checkoutService
      .confirmOrder(this.orderId, null)
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['/order/' + this.orderId]);
      });
  }
  cancelOrder() {
    this.checkoutService.cancelOrder(this.orderId).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/cart']);
    });
  }

  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe();
    if (this.couponList && this.couponList.length > 0) {
      this.couponList.length = 0;
    }
  }
}
