import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from '../model/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  REST_API_URL = 'https://bookstore-soti-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  addCoupon(couponData: Coupon): Observable<Coupon> {
    return this.http
      .post(`${this.REST_API_URL}couponList.json`, couponData)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
