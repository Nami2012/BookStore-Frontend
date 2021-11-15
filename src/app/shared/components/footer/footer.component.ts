import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template:`  
  <div class="text-center">
    Conditions of Use & SalePrivacy NoticeInterest-Based Ads© 1996-2021
  </div>
` ,
  styles: [
    ` 
    div{
      background-color: black;
      color: white;
      position: absolute;
      width: 100%;
      bottom: 0;
      margin: 0;
    }
    `
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
