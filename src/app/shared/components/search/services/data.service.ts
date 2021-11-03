import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/category/model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_URL = 'https://mocki.io/v1/19091420-a9b4-469d-a914-cdb911f75b78';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Category[]>{
    return this.http.get<Category[]>(this.REST_API_URL);
  }
  
}
