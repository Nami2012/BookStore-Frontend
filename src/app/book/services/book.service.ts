import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from 'src/app/category/model/category.model';
import { Book } from '../book-details/model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  REST_API_URL =
    'https://raw.githubusercontent.com/Nami2012/BookStore-Frontend/FakeApiData/FakeAPIData/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get(this.REST_API_URL + 'CategoryList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addBook(bookDetails: Book): Observable<any> {
    return this.http
      .post(
        'https://bookstore-soti-default-rtdb.firebaseio.com/' + 'BookList.json',
        bookDetails
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http
      .get(
        'https://bookstore-soti-default-rtdb.firebaseio.com/' +
          'books/' +
          bookId +
          '.json'
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
