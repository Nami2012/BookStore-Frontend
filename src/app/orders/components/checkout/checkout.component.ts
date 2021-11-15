import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckoutService } from './services/checkout.service';
import { Coupon } from 'src/app/coupon/model/coupon.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingAddress } from 'src/app/user-details/model/address.model';
import { AddressService } from 'src/app/user-details/services/address.service';
import { FormControl, FormGroup } from '@angular/forms';
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

  totalPrice: number = 0;
  discountedPrice!: number;

  striked!: string;

  shippingAddresses!: ShippingAddress[];

  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';

  addressForm: FormGroup = new FormGroup({
    shippingId: new FormControl(''),
  });

  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.couponSubscription = this.checkoutService
      .getActiveCoupons()
      .subscribe((res: any[]) => {
        this.couponList = res;
        console.log('Coupons', this.couponList);
      });
    // this.cart = this.cartService.checkout();

    this.orderId = this.route.snapshot.paramMap.get('orderid');
    console.log('Order Id', this.orderId);
    this.checkoutService.getOrderDetails(this.orderId).subscribe((res: any) => {
      console.log('Order', res);
      this.order = res[0];
      for (let i = 0; i < this.order.OrderItems.length; i++) {
        console.log(this.order.OrderItems[i].Book);
        this.totalPrice +=
          this.order.OrderItems[i].Book.BPrice * this.order.OrderItems[i].COUNT;
        this.cart.push({
          ...this.order.OrderItems[i].Book,
          count: this.order.OrderItems[i].COUNT,
        });
      }
      console.log('Cart', this.cart);
      console.log('Total Price', this.totalPrice);
    });
    this.getShippingAddresses();
  }

  getShippingAddresses() {
    this.addressService
      .getAllShippingAddressesByUser()
      .subscribe((res: any) => {
        this.addressForm.value.shippingId = res[0].ShId + '';
        this.shippingAddresses = res;
        console.log('Shipping Addresses', this.shippingAddresses);
      });
  }

  handleChange() {
    this.discountedPrice =
      this.totalPrice -
      (this.couponList[this.discount].Discount / 100) * this.totalPrice;
    this.striked = 'text-decoration-line-through';
    console.log(this.discount);
  }

  ConfirmOrder() {
    console.log(this.addressForm.value);
    this.checkoutService
      .confirmOrder(
        this.orderId,
        this.couponList[this.discount].CouponId,
        this.addressForm.value.shippingId
      )
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
