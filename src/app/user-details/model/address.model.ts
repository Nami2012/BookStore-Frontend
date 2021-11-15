import { Injectable } from "@angular/core"

interface IAddress{
    ShId: number;
    UId: number;
    Street:string;
    City: string;
    State: string;
    Pincode: string;
}

@Injectable({
    providedIn:'root'
})
export class ShippingAddress implements IAddress {
    ShId: number=0;
    UId: number=0;
    Street:string='';
    City: string='';
    State: string='';
    Pincode: string='';
}
