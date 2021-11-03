import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../model/user-details.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //getUserById endpoint
  private GET_USER_BY_ID_REST_API_URL = '';
  getUserById(id: string): Observable<UserDetails> {
    let API_URL = this.GET_USER_BY_ID_REST_API_URL + id;
    return this.http
      .get(
        'https://bookstore-soti-default-rtdb.firebaseio.com/User/"' +
          id +
          '".json'
      ) //replace api url here
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  //getallusers endpoint
  private REST_API_URL =
    'https://mocki.io/v1/4bf52c1d-2975-4f56-af7c-6acd15248f94';
  getUsers(): Observable<UserDetails[]> {
    return this.http.get(this.REST_API_URL).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  //change user ActiveStatus by UId
  setStatus(userId: number, status: boolean): any {
    let API_URL =
      'https://bookstore-soti-default-rtdb.firebaseio.com/User/"' +
      userId +
      '"/ActiveStatus.json';
    return this.http
      .put(API_URL, status)
      .toPromise()
      .then((res: any) => {
        return res;
      });
  }

  //updateuser details
  private UPDATE_USER_DETAILS_REST_API_URL = '';
  updateUser(updateableUserData: UserDetails): any {
    let API_URL =
      this.UPDATE_USER_DETAILS_REST_API_URL + updateableUserData.UId;
    console.log(updateableUserData);

    return this.http
      .put(
        'https://bookstore-soti-default-rtdb.firebaseio.com/User/"' +
          updateableUserData.UId +
          '".json',
        updateableUserData
      )
      .toPromise()
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((err: any) => {
        console.log('Inside Error');
        console.log(err);
      })
      .finally(() => {
        console.log('it is over');
      });
  }
}
