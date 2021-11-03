import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from '../../model/user-details.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: UserDetails[] = [];
  userSubscription!: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService
      .getUsers()
      .subscribe((res: UserDetails[]) => {
        this.users = res;
      });
  }

  populateUsers() {
    this.userService.getUsers().subscribe((res: UserDetails[]) => {
      console.log(this.users);
      this.users = res;
    });
  }

  toggleActiveStatus(uid: number, status: boolean) {
    this.userService.setStatus(uid, !status).subscribe(() => {
      this.populateUsers();
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe;
    if (this.users && this.users.length > 0) this.users.length = 0;
  }
}
