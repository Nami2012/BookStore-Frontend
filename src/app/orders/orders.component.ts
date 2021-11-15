import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './components/checkout/services/checkout.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private checkoutService: CheckoutService) {}

  orders!: any;

  ngOnInit(): void {
    this.checkoutService.getAllOrders().subscribe((res: any) => {
      this.orders = res;
    });
  }
}
