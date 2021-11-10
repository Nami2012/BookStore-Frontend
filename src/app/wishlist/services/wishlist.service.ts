import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist: any[] = [];
  constructor(private http: HttpClient) {}

  REST_API_URL = 'https://localhost:44380/api/';

  addToWishlist(book: any) {
    let wishlistItem = this.wishlist.find((item) => item.BId === book.BId);
    if (wishlistItem) return;
    this.wishlist.push(book);
    this.http.post(this.REST_API_URL + 'wishlist/', book.BId).subscribe();
  }

  removeFromWishlist(bookId: number) {
    return this.http.delete(this.REST_API_URL + 'wishlist/' + bookId).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  isPresentInWishlist(Bid: number) {
    return this.http.get(this.REST_API_URL + 'carts/isinwishlist/' + Bid).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getWishlist() {
    return this.http.get(this.REST_API_URL + 'wishlist/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
