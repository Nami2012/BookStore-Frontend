import { Injectable } from '@angular/core';

interface IUser {
  UId: number;
}
@Injectable({
  providedIn: 'root',
})
export class user implements IUser {
  UId: number = 0;
  Name: string = '';
  ActiveStatus: boolean = false;
}

export class UserDetails implements IUser {
  UId: number = 0;
  Name: string = '';
  PhoneNo: string = '';
  ShippingAddress: string = '';
  ActiveStatus: boolean = true;
  Username: string = '';
  Password: string = '';
}

export class UserAddressDetails {
  UId: number = 0;
  Street: string = '';
  City: string = '';
  State: string = '';
  Pincode: string = '';
}

export class UserAccountInfo implements IUser {
  UId: number = 0;
  Name: string = '';
  PhoneNo: string = '';
  ShippingAddress: string = '';
  ActiveStatus: boolean = true;
}
export class UserCredentials implements IUser {
  UId: number = 0;
  Username: string = '';
  Password: string = '';
}
