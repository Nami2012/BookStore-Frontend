import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { CouponService } from './services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
  addCouponForm: FormGroup = new FormGroup({
    couponCode: new FormControl('', Validators.required),
    discount: new FormControl('', Validators.required),
  });

  isAdmin: boolean = false;

  showSuccess: boolean = false;

  // Auth Service is used to check if user is admin
  // If user is admin, then show add coupon form
  constructor(
    private couponService: CouponService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (res: any) => {
        this.isAdmin = true;
      },
      (err) => {
        this.isAdmin = false;
      }
    );
  }

  // Add new coupon to database
  handleAddCoupon() {
    this.couponService
      .addCoupon(this.addCouponForm.value)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          document.getElementById('btn-close-modal')?.click();
          this.addCouponForm.reset();
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        }
      });
  }
}
