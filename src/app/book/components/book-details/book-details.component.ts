import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from './model/book.model';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../../auth/services/auth.service';

import {
  faHeart,
  faCartArrowDown,
  faBarcode,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  //icons
  faHeart = faHeart;
  faCart = faCartArrowDown;
  faISBN = faBarcode;
  isAdmin: boolean = false;
  cid: string = '1';

  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';

  bookList: Book[] = [];
  bookSubscription!: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
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
    this.route.params.subscribe((val) => {
      this.cid = val.id || '1';
      this.bookSubscription = this.bookService
        .getBooksByCategory(this.cid)
        .subscribe((res: Book[]) => {
          console.log(res);
          this.bookList = res;
        });
    });
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe;
    if (this.bookList && this.bookList.length > 0) this.bookList.length = 0;
  }
}
