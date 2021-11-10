import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../book-details/model/book.model';
import { Category } from 'src/app/category/model/category.model';
import { CategoryService } from 'src/app/category/services/category.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookDetails!:Book;
  isEditing = false;
  buttonText = 'Edit';
  duplicateBookData!: Book;
  isUpdated = false;
  categoryList: Category[] = [];
  categorySubscription!:Subscription;
  constructor(
    private bookService:BookService,
    private categoryService:CategoryService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.populateBookDetails();

  }
  populateBookDetails() {
    let bookId = this.route.snapshot.paramMap.get('id') ;
    this.bookService.getBookById(bookId).subscribe((res: any) => {
      this.bookDetails = res; 
      this.duplicateBookData = this.bookDetails;
      console.log(this.duplicateBookData);
    });
    this.categorySubscription = this.categoryService.getCategories()
    .subscribe((res:Category[])=>{
      this.categoryList = res;
      console.log(this.categoryList);
    });
  }

  handleEditButton(): void {
    if (this.isEditing == true) {
      this.buttonText = 'Edit';
      this.isEditing = false;
    } else {
      this.buttonText = 'Go Back';
      this.isEditing = true;
    }
  }

  updateBook() {
    console.log(this.duplicateBookData);
    this.bookService.updateBook(this.duplicateBookData).subscribe(
      (res:any)=>{
        this.handleEditButton();
        this.populateBookDetails();
      }
    );
  }

}
