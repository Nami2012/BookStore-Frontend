import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faBarcode,
  faCartArrowDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { BookService } from '../../services/book.service';

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
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.bookService.getBookById(userId).subscribe((data) => {
        this.book = data;
        console.log(this.book);
      });
    } else {
      this.book = null;
    }
  }
}
