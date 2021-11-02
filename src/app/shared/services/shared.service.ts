import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
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

  getCategories(): Observable<any> {
    return this.http.get(this.REST_API_URL + 'categoryList.json').pipe(
      map((resData: any) => {
        let categories = [];
        for (let key in resData) {
          if (resData[key]) {
            categories.push({ ...resData[key] });
          }
        }
        return categories;
      })
    );
  }
  getBooksByCategory(category: string): Observable<any> {
    let apiUrl = this.REST_API_URL + 'topList/' + category + '.json';
    return this.http.get(apiUrl).pipe(
      map((resData: any) => {
        for (let key in resData) {
          resData = resData[key];
        }
        let books = [];
        for (let key in resData) {
          books.push({ ...resData[key] });
        }

        return books;
      })
    );
  }
}
