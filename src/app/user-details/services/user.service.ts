import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  user,
  UserAccountInfo,
  UserAddressDetails,
  UserCredentials,
  UserDetails,
} from '../model/user-details.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //getUserById endpoint
  private GET_USER_BY_ID_REST_API_URL =
    'https://localhost:44380/api/userdetails';

  getUserById(id: string | any): Observable<any> {
    return this.http
      .get(this.GET_USER_BY_ID_REST_API_URL, { params: { id: id } })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //getallusers endpoint
  private REST_API_URL = 'https://localhost:44380/api/userlist';
  getUsers(): Observable<user[]> {
    return this.http.get('https://localhost:44380/api/userlist').pipe(
      map((res: any) => {
        let users: user[] = [];
        for (let key in res) {
          users.push(res[key]);
        }
        return users;
      })
    );
  }

  //change user ActiveStatus by UId
  setStatus(userid: number, status: boolean): Observable<any> {
    let API_URL = 'https://localhost:44380/api/user/edit/activestatus';
    return this.http.put(API_URL, {}, { params: { id: userid } }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  populateUserAccountInfo(updateableUserData: UserDetails): UserAccountInfo {
    let userAccountInfo: UserAccountInfo = new UserAccountInfo();
    userAccountInfo.UId = updateableUserData.UId;
    userAccountInfo.Name = updateableUserData.Name;
    userAccountInfo.PhoneNo = updateableUserData.PhoneNo;
    userAccountInfo.ShippingAddress = updateableUserData.ShippingAddress;
    userAccountInfo.ActiveStatus = updateableUserData.ActiveStatus;
    return userAccountInfo;
  }

  populateUserCredentials(updateableUserData: UserDetails): UserCredentials {
    let userCredentials: UserCredentials = new UserCredentials();
    userCredentials.UId = updateableUserData.UId;
    userCredentials.Password = updateableUserData.Password;
    userCredentials.Username = updateableUserData.Username;
    return userCredentials;
  }

  //updateuser_information details
  private UPDATE_USER_DETAILS_REST_API_URL =
    'https://localhost:44380/api/userInfo/edit';
  private UPDATE_USER_CRED_REST_API_URL =
    'https://localhost:44380/api/userCred/edit';
  updateUser(updateableUserData: UserDetails): any {
    console.log(updateableUserData);

    // let API_URL = this.UPDATE_USER_DETAILS_REST_API_URL;
    let userAccountInfo: UserAccountInfo =
      this.populateUserAccountInfo(updateableUserData);
    let userCredentials: UserCredentials =
      this.populateUserCredentials(updateableUserData);
    // console.log(userAccountInfo);
    // console.log(userCredentials);
    //update user account info
    let status = this.http
      .put(this.UPDATE_USER_DETAILS_REST_API_URL, userAccountInfo, {
        params: { id: updateableUserData.UId },
      })
      .toPromise()
      .then((res: any) => {
        return res;
      });
    //update user credentials info
    return this.http
      .put(this.UPDATE_USER_CRED_REST_API_URL, userCredentials, {
        params: { id: updateableUserData.UId },
      })
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  private DELETE_USER_REST_API_URL = 'https://localhost:44380/api/user/delete';
  deleteUsers(uid: number): any {
    return this.http
      .delete(this.DELETE_USER_REST_API_URL, { params: { id: uid } })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Register new user
  private UPDATE_USER_INFO_REGISTER_REST_API_URL =
    'https://localhost:44380/api/register/user/Info';
  private UPDATE_USER_CRED_REGISTER_REST_API_URL =
    'https://localhost:44380/api/register/user/cred';

  private REGISTER_ADDRESS_URL = '';

  registerUser(newUserData: UserDetails, userAddress: UserAddressDetails): any {
    let userAccountInfo: UserAccountInfo =
      this.populateUserAccountInfo(newUserData);
    let userCredentials: UserCredentials =
      this.populateUserCredentials(newUserData);
    let userid: number = 0;

    //register credentials
    return this.http
      .post(this.UPDATE_USER_CRED_REGISTER_REST_API_URL, userCredentials)
      .toPromise()
      .then((res: any) => {
        userid = res;
        this.http
          .post(this.UPDATE_USER_INFO_REGISTER_REST_API_URL, userAccountInfo, {
            params: { id: userid },
          })
          .toPromise()
          .then((res: any) => {
            return res;
          });
        this.http.post(this.REGISTER_ADDRESS_URL, userAddress, {
          params: { id: userid },
        });
        return userid;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
