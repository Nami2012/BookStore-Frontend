import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/book/components/book-details/model/book.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  REST_API_URL = 'https://localhost:44380/api/Search/';

  constructor(private http: HttpClient) {}

  searchByTitle(title: string): Observable<Book[]> {
    return this.http.get(this.REST_API_URL + 'Books/' + title).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  searchByCategory(title: string, category: number): Observable<Book[]> {
    return this.http
      .get(this.REST_API_URL + 'Books/' + title + '/' + category)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  searchByAuthor(author: string): Observable<Book[]> {
    return this.http.get(this.REST_API_URL + 'Author/' + author).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  searchByISBN(isbn: string): Observable<Book[]> {
    return this.http.get(this.REST_API_URL + 'ISBN/' + isbn).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
