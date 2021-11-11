import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ShippingAddress } from '../model/address.model';
import { user, UserDetails } from '../model/user-details.model';
import { AddressService } from '../services/address.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userDetails!: UserDetails;
  isEditing = false;
  buttonText = 'Edit';
  duplicateUserData!: UserDetails;
  isUpdated = false;
  shippingAddresses!: ShippingAddress[];
  duplicateShippingAddress!: ShippingAddress;

  UId!: any;

  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.populateUserDetails();
    this.populateShippingAddress();
  }

  populateUserDetails() {
    let userId = this.route.snapshot.paramMap.get('id');
    this.UId = userId;
    this.userService.getUserById(userId).subscribe((res: any) => {
      this.userDetails = res[0]; //change access method
      this.duplicateUserData = this.userDetails;
      console.log(this.duplicateUserData);
    });
  }

  populateShippingAddress() {
    this.authService.isAdmin().subscribe((res: any) => {
      if (res) {
        console.log('admin');
        this.isAdmin = true;
        console.log('admin');
        this.addressService
          .getShippingAddressByUserId(this.userDetails.UId)
          .subscribe((res: any) => {
            this.shippingAddresses = res;
            console.log(this.shippingAddresses);
          });
      } else {
        this.isAdmin = false;
        console.log('not admin');
        this.addressService
          .getAllShippingAddressesByUser()
          .subscribe((res: any) => {
            this.shippingAddresses = res;
            console.log(this.shippingAddresses);
          });
      }
    });
  }

  handleEditButton(): void {
    if (this.isEditing == true) {
      this.buttonText = 'Edit';
      this.isEditing = false;
    } else {
      this.buttonText = 'Go Back';
      this.isEditing = true;
    }
  }

  updateUser() {
    this.userService.updateUser(this.duplicateUserData);
    this.handleEditButton();
    this.populateUserDetails();
  }
}
