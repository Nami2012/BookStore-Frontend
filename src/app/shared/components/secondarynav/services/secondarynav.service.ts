import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/secondarynav.model'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecondarynavService {

  private REST_API_URL = 'https://mocki.io/v1/ae5bad1d-d67b-4a8c-994c-413c706223e5';
  constructor(private http:HttpClient) {

   }

   getCategories():Observable<Category[]>{
    return this.http.get(this.REST_API_URL)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
