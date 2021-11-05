import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  REST_API_URL = 'https://localhost:44380/api/';

  constructor(private http: HttpClient) {}

  getFeaturedBooks(): Observable<any> {
    return this.http.get(this.REST_API_URL + 'books/gettopbooks').pipe(
      map((resData: any) => {
        return resData;
      })
    );
  }
}
