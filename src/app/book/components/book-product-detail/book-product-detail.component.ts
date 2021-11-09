import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faBarcode,
  faShoppingCart,
  faCartPlus,
  faHeart as fasheart
} from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { WishlistService } from 'src/app/wishlist/services/wishlist.service';
import { BookService } from '../../services/book.service';
import { Book } from '../book-details/model/book.model';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-book-product-detail',
  templateUrl: './book-product-detail.component.html',
  styleUrls: ['./book-product-detail.component.scss'],
})
export class BookProductDetailComponent implements OnInit {
  book!: Book;
  cartSubscription!: Subscription;
  //icons
  farHeart = farHeart;
  fasHeart = fasheart;
  faCart = faShoppingCart;
  faISBN = faBarcode;
  faCartEmpty = faCartPlus;
  isAdmin: boolean = false;
  isPresentInCart:boolean = false;
  isPresentInWishlist:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (res: any) => {
        console.log(res);
        this.isAdmin = true;
      },
      (err) => {
        this.isAdmin = false;
      }
    );
    let bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((data) => {
        this.book = data;
        this.cartService.isPresentInCart(this.book.BId).subscribe((res:boolean)=>{
          this.isPresentInCart = res;
        });
        this.wishlistService.isPresentInWishlist(this.book.BId).subscribe((res:boolean)=>{
          this.isPresentInWishlist = res;
        });
      });
    }
    // } else {
    //   this.book = null;
    // }
  }

  addToCart(Bid: number) {
    this.cartSubscription = this.cartService
      .addToCart(Bid)
      .subscribe((res: any[]) => {
        console.log(res);
      });
    this.router.navigateByUrl('/cart');
  }

  addToWishlist() {
    let BookId = this.route.snapshot.paramMap.get('id');
    if (BookId) {
      this.bookService.getBookById(BookId).subscribe((data) => {
        this.book = data;
        this.wishlistService.addToWishlist(this.book);
        this.router.navigateByUrl('/wishlist');
      });
    }
  }
}
