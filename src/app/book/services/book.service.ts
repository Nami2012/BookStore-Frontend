import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from 'src/app/category/model/category.model';
import { Book } from '../components/book-details/model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  REST_API_URL =
    'https://raw.githubusercontent.com/Nami2012/BookStore-Frontend/FakeApiData/FakeAPIData/';

  constructor(private http: HttpClient) {}
  private REST_API_URL_Firebase =
    'https://bookstore-soti-default-rtdb.firebaseio.com/';

  REST_API_URL_ASP = 'https://localhost:44380/api/';
  getBooksByCategory(cid: string): Observable<any> {
    return this.http.get(this.REST_API_URL_ASP + 'BooksByCategory/' + cid).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getCategories(): Observable<Category[]> {
    return this.http.get(this.REST_API_URL + 'CategoryList.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addBook(bookDetails: any): Observable<any> {
    // type of BYEAR is string;
    // But in the database it is Date;
    // So we need to convert it to Date
    bookDetails.BYEAR = new Date(
      parseInt(bookDetails.byear),
      0,
      1
    ).toDateString();
    return this.http.post(this.REST_API_URL_ASP + 'Books', bookDetails).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get(this.REST_API_URL_ASP + 'Books/' + bookId).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
