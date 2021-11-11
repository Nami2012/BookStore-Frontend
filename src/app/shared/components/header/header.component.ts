import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartItem } from 'src/app/cart/model/cartItem.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  faShoppingCart = faShoppingCart;
  totalBookCount: number = 0;
  constructor(private sharedService: SharedService,
    private cartService:CartService,
    private authService: AuthService ) {} //inject shared Service and return from getCategory function to update totalBookCount

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (res: any) => {
        if(res){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      });
    this.cartService.latestCartItemsList.subscribe((items)=>{
        console.log(items);
        this.totalBookCount = items.length;
      });
    }
}
