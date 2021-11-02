import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-list-horizontal',
  templateUrl: './list-horizontal.component.html',
  styleUrls: ['./list-horizontal.component.scss'],
})
export class ListHorizontalComponent implements OnInit {
  bookList: any = [];

  categoryList: any = [];

  currentCategory: number = 0;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    console.log(this.currentCategory);
    this.sharedService.getCategories().subscribe((res: any) => {
      this.categoryList = res;
      this.categoryList.push({ CId: 0, CName: 'featured' });
      this.sharedService
        .getBooksByCategory(this.categoryList[this.currentCategory].CName)
        .subscribe((res) => {
          this.bookList = res;
          console.log(this.bookList);
        });
    });
  }

  // Navigate to Book Product Page based on BId
  routeToBook(bid: number) {
    console.log(bid);
  }

  // Rerender the top books
  switchCategory() {
    this.currentCategory =
      (this.currentCategory + 1) % this.categoryList.length;
    console.log(this.currentCategory);
    this.sharedService
      .getBooksByCategory(this.categoryList[this.currentCategory].CName)
      .subscribe((res: any) => {
        this.bookList = res;
        console.log(this.bookList);
      });
  }
}
