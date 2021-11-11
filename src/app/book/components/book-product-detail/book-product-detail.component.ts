import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faBarcode,
  faShoppingCart,
  faCartPlus,
  faHeart as fasheart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
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
  @Input()
  bookid: number = 0;
  parambookId: any;
  book!: Book;
  cartSubscription!: Subscription;
  //icons
  farHeart = farHeart;
  fasHeart = fasheart;
  faCart = faShoppingCart;
  faISBN = faBarcode;

  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';

  faCartEmpty = faCartPlus;
  isAdmin: boolean = false;
  isPresentInCart: boolean = false;
  isPresentInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe((res: any) => {
      if (res) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    this.populateBooks();
  }
  populateBooks() {
    this.parambookId = this.route.snapshot.paramMap.get('id');
    if (this.bookid) {
      this.bookService.getBookById(this.bookid).subscribe((data) => {
        this.book = data;
        this.cartService
          .isPresentInCart(this.book.BId)
          .subscribe((res: boolean) => {
            this.isPresentInCart = res;
          });
        this.wishlistService
          .isPresentInWishlist(this.book.BId)
          .subscribe((res: boolean) => {
            this.isPresentInWishlist = res;
          });
      });
    } else if (this.parambookId) {
      this.bookService.getBookById(this.parambookId).subscribe((data) => {
        this.book = data;
        this.cartService
          .isPresentInCart(this.book.BId)
          .subscribe((res: boolean) => {
            this.isPresentInCart = res;
          });
        this.wishlistService
          .isPresentInWishlist(this.book.BId)
          .subscribe((res: boolean) => {
            this.isPresentInWishlist = res;
          });
      });
    }
  }
  addToCart(Bid: number) {
    this.cartSubscription = this.cartService
      .addToCart(Bid)
      .subscribe((res: any[]) => {
        console.log(res);
      });
    this.router.navigateByUrl('/cart');
  }

  addToWishlist(Bid: number): void {
    if (this.authService.isLoggedIn()) {
      this.wishlistService.addToWishlist(Bid).subscribe((res: any) => {
        this.populateBooks();
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  toggleActiveStatus(BId: number): void {
    this.bookService.updateActiveStatus(BId).subscribe((res: any) => {
      this.populateBooks();
    });
  }

  removeFromWishlist(BId: number): void {
    this.wishlistService.removeFromWishlist(BId).subscribe((res: any) => {
      this.populateBooks();
    });
  }

  delete(BId:number):void{
    this.bookService.deleteBook(BId).subscribe((res:any)=>{
      this.populateBooks();
    });
  }
}
