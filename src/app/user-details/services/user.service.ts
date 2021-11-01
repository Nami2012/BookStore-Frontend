import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserDetails } from '../model/user-details.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //getUserById endpoint
  private GET_USER_BY_ID_REST_API_URL = "";
  getUserById(id:string|null):Observable<UserDetails>{
    let API_URL = this.GET_USER_BY_ID_REST_API_URL+ id;
    return this.http.get("https://bookstore-soti-default-rtdb.firebaseio.com/User/\"1\".json") //replace api url here
    .pipe(map((res:any)=>{
      console.log(res);
      return res;
    }));
  }

  //getallusers endpoint
  private REST_API_URL="";
  getUsers():Observable<UserDetails[]>{
    return this.http.get(this.REST_API_URL)
      .pipe(map((res:any)=>{
        console.log(res);
        return res;
      }));
  }
}
