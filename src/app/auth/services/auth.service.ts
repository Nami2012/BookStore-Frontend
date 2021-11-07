import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  REST_API_URL = 'https://localhost:44380/';

  constructor(private http: HttpClient) {}

  login(userCredentials: any): Observable<any> {
    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json'),
    };
    const body = new URLSearchParams();
    body.set('username', userCredentials.email);
    console.log(userCredentials.email);
    body.set('password', userCredentials.password);
    console.log(userCredentials.password);
    body.set('grant_type', 'password');
    console.log(body.toString());
    return this.http
      .post<any>(`${this.REST_API_URL}token`, body.toString(), options)
      .pipe(
        map((res) => {
          sessionStorage.setItem('access_token', res.access_token);
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

  isLoggedIn(): boolean {
    return sessionStorage.getItem('access_token') != null;
  }

  isAdmin() {
    return this.http.get(`${this.REST_API_URL}api/isAdmin`).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }
}
