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

  BOOK_IMAGE_API = 'https://localhost:44380/api/image/book/';

  currentCategory: number = 0;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getCategories().subscribe((res: any) => {
      this.categoryList = res;
      this.categoryList.push({ CId: null, CName: 'Featured' });
      this.getBooksByCategory();
    });
  }

  // Get books by current category
  getBooksByCategory() {
    this.sharedService
      .getBooksByCategory(this.categoryList[this.currentCategory].CId)
      .subscribe((res) => {
        this.bookList = res;
      });
  }

  // Rerender the top books
  switchCategory() {
    this.currentCategory =
      (this.currentCategory + 1) % this.categoryList.length;
    this.getBooksByCategory();
  }
}
