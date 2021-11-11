import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from 'src/app/coupon/model/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private REST_API_URL = 'https://localhost:44380/api/';
  constructor(private http: HttpClient) {}

  getCoupons(): Observable<Coupon[]> {
    return this.http.get(this.REST_API_URL + 'Coupons/all').pipe(
      map((res: any) => {
        //write code to sort based on position here.
        console.log(res);
        return res;
      })
    );
  }

  REST_API_URL_GET_ALL_ORDER = 'https://localhost:44380/api/OrderDetails/';
  getOrderDetails(orderId: any): Observable<any> {
    return this.http
      .get(this.REST_API_URL_GET_ALL_ORDER, {
        params: {
          orderid: orderId,
        },
      })
      .pipe(
        map((res: any) => {
          console.log('II', res);
          return res;
        })
      );
  }

  REST_API_URL_GET_CONFIRM_ORDER = 'https://localhost:44380/api/ConfirmOrder/';
  confirmOrder(orderId: any, couponId: any, shId: any): Observable<any> {
    console.log('Confirming', orderId, couponId);
    return this.http
      .post(this.REST_API_URL_GET_CONFIRM_ORDER, null, {
        params: {
          orderid: orderId,
          shId: shId,
          couponId: couponId,
        },
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  REST_API_URL_GET_CANCEL_ORDER = 'https://localhost:44380/api/CancelOrder/';
  cancelOrder(orderId: any): Observable<any> {
    return this.http
      .post(this.REST_API_URL_GET_CANCEL_ORDER, null, {
        params: {
          orderid: orderId,
        },
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  REST_API_URL_GET_ALL_ORDERS = 'https://localhost:44380/api/AllOrders/';
  getAllOrders(): Observable<any> {
    return this.http.get(this.REST_API_URL_GET_ALL_ORDERS).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
