import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AdminCategory, Category } from '../model/category.model';
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

  getCategoryById(categoryid:string|null):Observable<AdminCategory[]>{
    return this.http.get(this.REST_API_URL_ASP+'category/'+categoryid).pipe(
      map((res:any)=>{
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

  updateCategory(category:AdminCategory):Observable<AdminCategory>{
    return this.http.put(this.REST_API_URL_ASP+'Category/edit',category).pipe(
      map((res:any)=>{
        console.log(res);
        return res;
      })
    );
  }

  updateActiveStatusCategory(bid:number):Observable<any>{
    return this.http.put(this.REST_API_URL_ASP+'Category/Edit/ActiveStatus/'+bid,null).pipe(
      map((res:any)=>{
        return res;
      })
    );
  }

  deleteCategory(bid:number):Observable<any>{
    return this.http.delete(this.REST_API_URL_ASP+'category/delete',{params:{bid:bid}}).pipe(
      map((res:any)=>{
        return res;
      })
    );
  }
  
}
