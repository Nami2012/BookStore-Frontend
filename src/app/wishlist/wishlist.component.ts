import { Component, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist!: any[];
  constructor(private wishlistService: WishlistService) {
    this.setWishlist();
  }

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe((data) => {
      this.wishlist = data;
    });
  }

  removeFromWishlist(book: any) {
    this.wishlistService.removeFromWishlist(book.BId).subscribe((data) => {
      this.setWishlist();
    });
  }

  setWishlist() {
    this.wishlistService.getWishlist().subscribe((data) => {
      this.wishlist = data;
    });
  }
}
