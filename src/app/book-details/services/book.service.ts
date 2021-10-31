import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private REST_API_URL = 'https://mocki.io/v1/4b716538-3493-4f4a-be02-b90e28cae2e2';
  constructor(private http:HttpClient) {

    
   }
   getBookByCategory():Observable<Book[]>{
    return this.http.get(this.REST_API_URL)
     .pipe(map((res:any)=>{
       console.log(res);
       return res;
     }));
   }
}
