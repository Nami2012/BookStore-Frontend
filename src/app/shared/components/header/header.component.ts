import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  totalBookCount: number = 0;
  constructor() { } //inject shared Service and return from getCategory function to update totalBookCount

  ngOnInit(): void {
    
  }

}
