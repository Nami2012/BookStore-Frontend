import { Component, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlist !: any[];
  constructor(private wishlistService: WishlistService) { 
    this.setWishlist();
  }

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeFromWishlist(book: any){
    this.wishlistService.removeFromWishlist(book.BId);
    this.setWishlist();
  }

  setWishlist(){
    this.wishlist = this.wishlistService.getWishlist();  
  }
}
