import { Injectable } from '@angular/core';

interface ICoupon {
  CouponId: string;
  Discount: number;
}

@Injectable({
  providedIn: 'root',
})
export class Coupon implements ICoupon {
  CouponId: string = '';
  Discount: number = 0;
}
