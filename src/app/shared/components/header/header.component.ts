import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  totalBookCount: number = 0;
  constructor(private sharedService: SharedService) {} //inject shared Service and return from getCategory function to update totalBookCount

  ngOnInit(): void {
    this.totalBookCount = this.sharedService.getCartQuantity();
  }
}
