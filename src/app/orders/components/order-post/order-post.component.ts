import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../checkout/services/checkout.service';

@Component({
  selector: 'app-order-post',
  templateUrl: './order-post.component.html',
  styleUrls: ['./order-post.component.scss'],
})
export class OrderPostComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService
  ) {}
  cart: any[] = [];
  order!: any;
  orderId: number = 0;
  totalPrice = 0;

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params.id;
    console.log(this.orderId);
    this.checkoutService.getOrderDetails(this.orderId).subscribe((res: any) => {
      console.log('Order', res[0]);
      this.order = res[0];
      this.totalPrice = this.order?.Amount;
      console.log(this.totalPrice);
      for (let i = 0; i < this.order?.OrderItems.length; i++) {
        console.log(this.order.OrderItems[i].Book);
        this.cart.push({
          ...this.order.OrderItems[i].Book,
          count: this.order.OrderItems[i].COUNT,
        });
      }
      console.log('Cart', this.cart);
      // console.log('Total Price', this.totalPrice);
    });
  }
}
