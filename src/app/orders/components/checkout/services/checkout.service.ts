import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from 'src/app/coupon/model/coupon.model';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private REST_API_URL = "https://mocki.io/v1/257032b7-d74d-4674-bbe9-6ca4dae660b8";
  constructor(private http: HttpClient) { }

  getCoupons(): Observable<Coupon[]>{
    return this.http.get(this.REST_API_URL).pipe(
      map((res: any) => {
        //write code to sort based on position here.
        console.log(res);
        return res; 
  
      })
    );
  }
}
