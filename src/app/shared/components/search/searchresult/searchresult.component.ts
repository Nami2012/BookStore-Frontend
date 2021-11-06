import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { ActivatedRoute } from '@angular/router';
// import bookservice 

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {

  books: Book[] = [];
  constructor(private route:ActivatedRoute) { } // should add bookoservice in constructor


  ngOnInit(): void {}
  //   this.route.params.subscribe(params => { // for retrieve booknames from the bookservice
  //     if(params.searchTerm)
  //     this.books = this.BookService.getAll().filter(book =>
  //       book.name.toLowerCase().includes(params.searchTerm.toLowerCase())) 
  //     else
  //     this.books = this.BookService.getAll();
  //   })
  // }

}
