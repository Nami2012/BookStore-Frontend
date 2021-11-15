import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featured: any = [];

  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getFeaturedBooks().subscribe((res) => {
      this.featured = res;
    });
  }

  // Owl Carousel Options for responsiveness and navspeed etc
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: true,
  };
}
