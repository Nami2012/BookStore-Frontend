import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template:`
  <div class="text-center">
    <hr>
    <app-menu>
      <li class="nav-item">
        <a class="nav-link" href="#">Back to Top</a>
      </li>
    </app-menu>
    <p class="grey">Footer Sentence 1</p>
    <p class="grey">Footer Sentence 2</p>
  </div>
` ,
  styles: [
    `
      .grey{
        color: grey;
      }
    `
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
