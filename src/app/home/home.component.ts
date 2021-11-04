import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featured: any = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getFeaturedBooks().subscribe((res) => {
      this.featured = res;
    });
  }
}
