import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../model/user-details.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userDetails!: UserDetails;
  isNameUpdated = false;
  isEmailUpdated = false;
  isPhoneNoUpdated = false;
  isShippingAddressUpdated = false;
  duplicateUserData: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.populateUserDetails();
  }

  populateUserDetails() {
    let userId = this.route.snapshot.paramMap.get('id') || '1';
    this.userService.getUserById(userId).subscribe((res: any) => {
      console.log(res);
      this.userDetails = res;
    });
  }

  handleEditModalOpen(): void {
    this.duplicateUserData = { ...this.userDetails };
  }

  // Modal Functions -- Reformat if possible
  async handleNameUpdate() {
    let status = await this.userService.updateUser(this.duplicateUserData);
    if (status && status.Name) {
      this.isNameUpdated = true;
    }
    this.populateUserDetails();
    setTimeout(() => {
      this.isNameUpdated = false;
    }, 5000);
  }

  async handleEmailUpdate() {
    let status = await this.userService.updateUser(this.duplicateUserData);
    if (status && status.Email) {
      this.isEmailUpdated = true;
    }
    this.populateUserDetails();
    setTimeout(() => {
      this.isEmailUpdated = false;
    }, 5000);
  }
  async handlePhoneNoUpdate() {
    let status = await this.userService.updateUser(this.duplicateUserData);
    if (status && status.PhoneNo) {
      this.isPhoneNoUpdated = true;
    }
    this.populateUserDetails();
    setTimeout(() => {
      this.isPhoneNoUpdated = false;
    }, 5000);
  }

  async handleShippingAddressUpdate() {
    let status = await this.userService.updateUser(this.duplicateUserData);
    if (status && status.ShippingAddress) {
      this.isShippingAddressUpdated = true;
    }
    this.populateUserDetails();
    setTimeout(() => {
      this.isShippingAddressUpdated = false;
    }, 5000);
  }
  // end of modal handles //
}
