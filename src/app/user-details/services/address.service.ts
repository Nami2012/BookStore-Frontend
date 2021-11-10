import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../model/address.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) {
   }
  
   private REST_API_URL = 'https://localhost:44380/api/';

   //get All addresses  endpoint
   getAllShippingAddressesByUser():Observable<ShippingAddress[]>{
     return this.http.get(this.REST_API_URL+'ShippingAddresses')
     .pipe(
       map((res:any)=>{
         return res;
       })
     );
   }

   //get specific shipping address by id
   getShippingAddressById(SHid:number|null):Observable<ShippingAddress>{
    return this.http.get(this.REST_API_URL+'ShippingAddresses/'+SHid)
    .pipe(map((res:any)=>{
      return res;
    }));
   }

   //create shipping address
   addShippingAddress(shippingAddress:ShippingAddress):any{
     return this.http.post(this.REST_API_URL+'ShippingAddresses',shippingAddress)
     .pipe(map((res:any)=>{
       return res;
     }));
   }

   //update shipping address
   updateShippingAddress(shippingAddress:ShippingAddress):any{
     return this.http.put(this.REST_API_URL+'ShippingAddresses',shippingAddress)
     .pipe(map((res:any)=>{
      return res;
     }));
   }

   //delete shipping address
   deleteShippingAddress(SHid:number):any{
     return this.http.delete(this.REST_API_URL+'ShippingAddresses'+SHid)
      .pipe(map((res:any)=>{
        return res;
      }));
   }

}

