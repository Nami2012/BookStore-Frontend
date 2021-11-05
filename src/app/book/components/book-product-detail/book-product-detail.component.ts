import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faBarcode,
  faCartArrowDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/cart/services/cart.service';
import { WishlistService } from 'src/app/wishlist/services/wishlist.service';
import { BookService } from '../../services/book.service';
import { Book } from '../book-details/model/book.model';

@Component({
  selector: 'app-book-product-detail',
  templateUrl: './book-product-detail.component.html',
  styleUrls: ['./book-product-detail.component.scss'],
})
export class BookProductDetailComponent implements OnInit {
  book: any;

  //icons
  faHeart = faHeart;
  faCart = faCartArrowDown;
  faISBN = faBarcode;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService, 
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let BookId = this.route.snapshot.paramMap.get('id');
    if (BookId) {
      this.bookService.getBookById(BookId).subscribe((data) => {
        this.book = data;
        console.log(this.book);
      });
    } 
    else {
      this.book = null;
    }
  }

  addToCart(){
    let BookId = this.route.snapshot.paramMap.get('id');
    if (BookId){
    this.bookService.getBookById(BookId).subscribe((data) => {
      this.book = data;
      console.log(this.book);
      this.cartService.addToCart(this.book);
      this.router.navigateByUrl('/cart');
    
    });
  }
  }

  addToWishlist(){
    let BookId = this.route.snapshot.paramMap.get('id');
    if (BookId){
    this.bookService.getBookById(BookId).subscribe((data) => {
      this.book = data;
      console.log(this.book);
      this.wishlistService.addToWishlist(this.book);
      this.router.navigateByUrl('/wishlist');
    
    });
  }
  }

}
