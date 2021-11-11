import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../user-details/services/user.service';
import {
  UserAddressDetails,
  UserDetails,
} from 'src/app/user-details/model/user-details.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userSignupForm!: FormGroup;
  signupStatus!: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSignupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      shippingAddress: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  //refactor code here
  populate(userSignupForm: FormGroup): UserDetails {
    let userdetails: UserDetails = new UserDetails();
    userdetails.Name = userSignupForm.controls['name'].value;
    userdetails.Username = userSignupForm.controls['email'].value;
    userdetails.PhoneNo = userSignupForm.controls['phoneNumber'].value;
    userdetails.ShippingAddress =
      userSignupForm.controls['shippingAddress'].value;
    userdetails.Password = userSignupForm.controls['password'].value;
    userdetails.ActiveStatus = true; //automtically setup this value too
    return userdetails;
  }

  populateUserAddress(userSignupForm: FormGroup): UserAddressDetails {
    let userdetails: UserAddressDetails = new UserAddressDetails();
    userdetails.Street = userSignupForm.controls['street'].value;
    userdetails.City = userSignupForm.controls['city'].value;
    userdetails.State = userSignupForm.controls['state'].value;
    userdetails.Pincode = userSignupForm.controls['pincode'].value;
    return userdetails;
  }

  signup(): void {
    let userdetails: UserDetails = this.populate(this.userSignupForm);
    let userAddress: UserAddressDetails = this.populateUserAddress(
      this.userSignupForm
    );
    this.userService.registerUser(userdetails, userAddress);
  }
}
