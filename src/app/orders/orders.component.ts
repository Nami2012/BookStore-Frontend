import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './components/checkout/services/checkout.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.getAllOrders().subscribe((res: any) => {
      console.log(res);
    });
  }
}
