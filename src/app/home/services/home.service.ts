import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  REST_API_URL = 'https://bookstore-soti-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getFeaturedBooks(): Observable<any> {
    return this.http.get(this.REST_API_URL + 'featuredBooks.json').pipe(
      map((resData: any) => {
        let books = [];
        for (let key in resData) {
          books.push({ ...resData[key] });
        }
        return books;
      })
    );
  }
}
