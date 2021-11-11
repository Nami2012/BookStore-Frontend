import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../model/cart.model';
import { CartItem } from '../model/cartItem.model';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  private cartItems :any[] =[];

  private cartItemsList = new BehaviorSubject(this.cartItems);
  latestCartItemsList: Observable<any[]> = this.cartItemsList.asObservable();


  constructor(private http: HttpClient) {}

  private REST_API_URL = 'https://localhost:44380/api/';
  addToCart(Bid: number): Observable<any> {
    return this.http.post(this.REST_API_URL+'Carts/', Bid).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  removeFromCart(BId: number): Observable<any> {
    return this.http.delete(this.REST_API_URL+'Carts/'+ BId).pipe(
      map((res: any) => {
        return res;
      })
    );
    }



  changeQuantity(Bid: number, count: number) {
    return this.http
      .put(this.REST_API_URL+'Carts', null, {
        params: { Bid: Bid, count: count },
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCart(): Observable<any[]> {
    return this.http.get(this.REST_API_URL+'Carts/').pipe(
      map((res: any) => {
        this.latestCartItemsList.pipe(take(1)).subscribe((items)=>{
          this.cartItemsList.next(res);
        });
        return res;
      })
    );
  }

  placeOrder(): Observable<any> {
    return this.http.post(this.REST_API_URL+'PlaceOrder/', null).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  isPresentInCart(Bid:number){
    return this.http.get(this.REST_API_URL+'carts/isincart/'+Bid).pipe(
      map((res:any)=>{
        return res;
      })
    );
  }
}
