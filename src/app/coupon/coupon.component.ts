import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  showSuccess: boolean = false;

  constructor(private couponService: CouponService, private router: Router) {}

  ngOnInit(): void {}

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
