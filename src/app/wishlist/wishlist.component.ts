import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist!: any[];
  constructor(private wishlistService: WishlistService,
    private cartService:CartService,
    private router: Router,
    ) {
    this.setWishlist();
  }
  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';

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

  addToCart(Bid: number) {
     this.cartService
      .addToCart(Bid)
      .subscribe((res: any[]) => {
        console.log(res);
      });
  //  this.router.navigateByUrl('/cart');
  }
}
