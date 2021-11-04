import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  REST_API_URL = '';

  constructor(private http: HttpClient) {}

  login(userCredentials: any): Observable<any> {
    return this.http
      .post<any>(`${this.REST_API_URL}/login`, {
        username: userCredentials.username,
        password: userCredentials.password,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  signup(userDetails: any): Observable<any> {
    return this.http.post<any>(`${this.REST_API_URL}/signup`, userDetails).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
