import { Injectable } from "@angular/core";

interface IUser{
    UId:number;
    Name:string;
    Email:string;
    PhoneNo:string;
    ShippingAddress:string;
    ActiveStatus:boolean;
}
@Injectable({
    providedIn:'root'
})
export class UserDetails implements IUser{
    UId:number=0;
    Name:string="";
    Email:string="";
    PhoneNo:string="";
    ShippingAddress:string="";
    ActiveStatus:boolean=true;
}
