import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/cart/model/cartItem.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  totalBookCount: number = 0;
  constructor(private sharedService: SharedService,
    private cartService:CartService) {} //inject shared Service and return from getCategory function to update totalBookCount

  ngOnInit(): void {
   this.cartService.latestCartItemsList.subscribe((items)=>{
      console.log(items);
      this.totalBookCount = items.length;
    });
  }
}
