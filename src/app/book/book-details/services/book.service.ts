import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private REST_API_URL = 'https://bookstore-soti-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}
  getBooksByCategory(cid: string | null): Observable<Book[]> {
    return this.http
      .get(this.REST_API_URL + 'booksByCategory/' + cid + '.json')
      .pipe(
        map((res: any) => {
          console.log('Inside Service');
          console.log(cid);
          console.log(res);
          let books = [];
          for (let key in res) {
            books.push({ ...res[key], id: key });
          }
          return books;
        })
      );
  }
}
