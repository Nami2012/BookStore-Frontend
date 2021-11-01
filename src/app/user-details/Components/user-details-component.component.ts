import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserDetails } from '../model/user-details.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails!:UserDetails;
  isNameUpdated = false;
  isEmailUpdated = false;
  isPhoneNoUpdated = false;
  isShippingAddressUpdated = false;
  duplicateUserData:any;
  constructor(private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId)
      .subscribe((res:any)=>{
        console.log(res);
        this.userDetails = res;
      });

  }

  handleEditModalOpen():void{
    this.duplicateUserData = {...this.userDetails};
  }

  // Modal Functions -- Reformat if poossible
  async handleNameUpdate(){
    let status = await this.userService.updateUser(this.duplicateUserData);
    if(status && status.name){
      this.isNameUpdated = true;
    }
 
  }
  
  async handleEmailUpdate(){
    let status = await this.userService.updateUser(this.duplicateUserData);
    if(status && status.Email){
      this.isEmailUpdated = true;
    }
 
  }
  async handlePhoneNoUpdate(){
    let status = await this.userService.updateUser(this.duplicateUserData);
    if(status && status.PhoneNo){
      this.isPhoneNoUpdated = true;
    }
  }

  async handleShippingAddressUpdate(){
    let status = await this.userService.updateUser(this.duplicateUserData);
    if(status && status.ShippingAddress){
      this.isShippingAddressUpdated = true;
    }
  }
  // end of modal handles //
}
