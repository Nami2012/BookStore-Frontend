import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../model/cart.model';
import { CartItem } from '../model/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = new Cart();

  constructor(private http:HttpClient) { }
  
  private ADD_TO_CART_REST_API_URL ="https://localhost:44380/api/Carts/";
  addToCart(Bid: number): Observable<any>{ 
    return this.http.post(this.ADD_TO_CART_REST_API_URL,Bid).pipe(map((res:any)=>{
      console.log("hey");
      return res;
    }));
    // let cartItem = this.cart.items.find(item => item.book.BId === book.BId);
    // if (cartItem){
    //   this.changeQuantity(book.BId, cartItem.quantity + 1);
    //   return;
    // }
    // this.cart.items.push(new CartItem(book))
    // console.log(this.cart);
  }

  private REMOVE_FROM_CART_URL = "https://localhost:44380/api/Carts/";
  removeFromCart(BId:number): Observable<any>{
    return this.http.delete(this.REMOVE_FROM_CART_URL+BId).pipe(map((res:any)=>{
      return res;
    }));
 //   this.cart.items.filter(item => item.book.BId != bookId);
  }

  // private INCREMENT_CART_QUANTITY_REST_API_URL = "https://localhost:44380/api/Carts/increment";
  // incrementQuantity(Bid: number, count:number){
  //   // let cartItem = this.cart.items.find(item => item.book.BId === bookId);
  //   // console.log(cartItem);
  //   // if (!cartItem) return; 
  //   // cartItem.quantity = quantity;
  //   return this.http.put(this.INCREMENT_CART_QUANTITY_REST_API_URL,null,{params:{Bid:Bid,count:count}}).pipe(map((res:any)=>{
  //     return res;
  //   }));
  // }
  



  private DECREMENT_CART_QUANTITY_REST_API_URL = "https://localhost:44380/api/Carts";
  changeQuantity(Bid: number, count:number){
    // let cartItem = this.cart.items.find(item => item.book.BId === bookId);
    // console.log(cartItem);
    // if (!cartItem) return; 
    // cartItem.quantity = quantity;
    return this.http.put(this.DECREMENT_CART_QUANTITY_REST_API_URL,null,{params:{Bid:Bid,count:count}}).pipe(map((res:any)=>{
      return res;
    }));
  }

  private GET_CART_REST_API_URL="https://localhost:44380/api/Carts/";
  getCart():Observable<any[]>{
    return this.http.get(this.GET_CART_REST_API_URL).pipe(map((res:any)=>{
      return res;
    }));
  }

}
