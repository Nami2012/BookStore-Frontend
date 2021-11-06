import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user, UserDetails } from '../model/user-details.model';
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.populateUserDetails();
  }

  populateUserDetails() {
    //let userId = this.route.snapshot.paramMap.get('id') ;
    let userId = 1;
    this.userService.getUserById(userId).subscribe((res: any) => {
      this.userDetails = res[0]; //change access method
      this.userDetails.UId = userId;
      this.duplicateUserData = this.userDetails;
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
    this.populateUserDetails();
  }
}
