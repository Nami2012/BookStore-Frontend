import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  REST_API_URL = 'https://bookstore-soti-default-rtdb.firebaseio.com/';
  REST_API_URL_ASP = 'https://localhost:44380/api/';

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
    return this.http.get(this.REST_API_URL_ASP + 'Categories').pipe(
      map((resData: any) => {
        return resData;
      })
    );
  }
  
  getBooksByCategory(cid: number | null): Observable<any> {
    let apiUrl = this.REST_API_URL_ASP + 'Books/GetTopBooks/' + cid;
    return this.http.get(apiUrl).pipe(
      map((resData: any) => {
        return resData;
      })
    );
  }

  getCartQuantity(){
    
  }
}
