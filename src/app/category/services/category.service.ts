import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private REST_API_URL =
    'https://raw.githubusercontent.com/Nami2012/BookStore-Frontend/FakeApiData/FakeAPIData/CategoryList.json';

  private REST_API_URL_ASP = 'https://localhost:44380/api/';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get(this.REST_API_URL_ASP + 'Categories').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Post Category Data to REST API
  // Add Category
  // any is used since create category data doesn't all fields in model
  addCategory(category: any): Observable<any> {
    return this.http.post(this.REST_API_URL_ASP + 'Categories', category).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
