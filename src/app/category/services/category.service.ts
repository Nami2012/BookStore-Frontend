import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private REST_API_URL = 'https://mocki.io/v1/19091420-a9b4-469d-a914-cdb911f75b78';
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get(this.REST_API_URL)
      .pipe(map((res: any) => {
        console.log(res);

        return res;
      }));
  }
}
