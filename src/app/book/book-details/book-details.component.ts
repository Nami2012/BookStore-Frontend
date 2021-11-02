import {
  AfterContentInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from './model/book.model';
import { BookService } from './services/book.service';
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
export class BookDetailsComponent implements OnInit, OnChanges {
  //icons
  faHeart = faHeart;
  faCart = faCartArrowDown;
  faISBN = faBarcode;

  cid: string | null = '';

  bookList: Book[] = [];
  bookSubscription!: Subscription;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.cid = this.route.snapshot.paramMap.get('id');
    console.log(this.cid);
    this.bookSubscription = this.bookService
      .getBooksByCategory(this.cid)
      .subscribe((res: Book[]) => {
        this.bookList = res;
      });
  }

  ngOnInit(): void {
    this.cid = this.route.snapshot.paramMap.get('id');
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
