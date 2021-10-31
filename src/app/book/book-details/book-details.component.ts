import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from './model/book.model';
import { BookService } from './services/book.service';
import {  faHeart,faCartArrowDown,faBarcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  //icons
  faHeart  =  faHeart;
  faCart =  faCartArrowDown;
  faISBN = faBarcode;

  bookList : Book[] =[];
  bookSubscription !: Subscription;
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookSubscription = this.bookService.getBookByCategory()
      .subscribe((res:Book[]) =>{
        this.bookList = res;
      });
  }

  ngOnDestroy():void{
    console.log('Inside Destroy');
    this.bookSubscription.unsubscribe;
    if(this.bookList && this.bookList.length>0)
      this.bookList.length = 0;
  }

}