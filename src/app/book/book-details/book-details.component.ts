import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from './model/book.model';
import { BookService } from './services/book.service';
import { switchMap } from 'rxjs/operators';
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

  cid: string = '1';

  bookList: Book[] = [];
  bookSubscription!: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.cid = val.id || '1';
      this.bookSubscription = this.bookService
        .getBooksByCategory(this.cid)
        .subscribe((res: Book[]) => {
          this.bookList = res;
        });
    });
    this.bookSubscription = this.bookService
      .getBooksByCategory(this.cid)
      .subscribe((res: Book[]) => {
        this.bookList = res;
      });
  }

  ngOnDestroy(): void {
    console.log('Inside Destroy');
    this.bookSubscription.unsubscribe;
    if (this.bookList && this.bookList.length > 0) this.bookList.length = 0;
  }
}
