import { Component, Input, OnInit } from '@angular/core';
import { ShippingAddress } from '../../model/address.model';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  isUpdated = false;
  shippingAddress!:ShippingAddress;
  duplicateShippingAddressData!:ShippingAddress;
  @Input()
  ShId?:number;
  constructor(private addressService:AddressService) { }

  ngOnInit(): void {
    console.log(this.ShId);
    if(this.ShId)
      this.populateAddress(this.ShId);
  }
  populateAddress(SHid:number){
    this.addressService.getShippingAddressById(SHid)
    .subscribe((res:any)=>{
      this.shippingAddress = res;
      console.log(this.shippingAddress);
     
    });
  }
  handleEditModalOpen(){
    this.duplicateShippingAddressData = this.shippingAddress;
  } 
  
  async handleAddressUpdate(){
    console.log(this.duplicateShippingAddressData);
    let status = await this.addressService.updateShippingAddress(this.duplicateShippingAddressData);
    console.log(status);
    if(status && status.SHid){
      this.isUpdated=true;
    }
  }
}
