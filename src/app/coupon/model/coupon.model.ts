import { Injectable } from '@angular/core';

interface ICoupon {
  CouponId: string;
  CDiscount: number;
}

@Injectable({
  providedIn: 'root',
})
export class Coupon implements ICoupon {
  CouponId: string = '';
  CDiscount: number = 0;
}
