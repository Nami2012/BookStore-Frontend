import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserDetails } from './model/user-details.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails!:UserDetails;
  constructor(private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(userId)
      .subscribe((res:any)=>{
        console.log(res);
        this.userDetails = res;
      });

  }

}
