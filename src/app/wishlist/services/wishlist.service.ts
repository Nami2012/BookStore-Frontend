import { Injectable } from '@angular/core';
import { Book } from 'src/app/book/components/book-details/model/book.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlist: any[] = [];
  constructor() { }

  addToWishlist(book: any){
    let wishlistItem = this.wishlist.find(item => item.BId === book.BId);
    if (wishlistItem) return;
    this.wishlist.push(book)
  }

  removeFromWishlist(bookId:number): void{
    this.wishlist =
    this.wishlist.filter(item => item.BId != bookId);
  }

  getWishlist():any[]{
    return this.wishlist;
  }
}
