import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from '../model/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  REST_API_URL = 'https://localhost:44380/api/';

  constructor(private http: HttpClient) {}

  addCoupon(couponData: Coupon): Observable<Coupon> {
    return this.http
      .post(`${this.REST_API_URL}admin/Coupons/add`, couponData)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCoupons(): Observable<any[]> {
    return this.http.get(`${this.REST_API_URL}Coupons/all`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
