import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../book-details/model/book.model';
import { Category } from 'src/app/category/model/category.model';
import { CategoryService } from 'src/app/category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  bookDetails!: Book;
  isEditing = false;
  buttonText = 'Edit';
  duplicateBookData!: Book;
  isUpdated = false;
  categoryList: Category[] = [];
  bookCategoryName!:string;
  categorySubscription!: Subscription;
  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  filedata = new FormData();
  selectedFile!: any;

  ngOnInit(): void {
    this.populateBookDetails();
  }
  populateBookDetails() {
    let bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(bookId).subscribe((res: any) => {
      this.bookDetails = res;
      this.duplicateBookData = this.bookDetails;
      console.log(this.duplicateBookData);
      this.getCategory(this.bookDetails.CId);
    });
  }
  getCategory(CId:number){
    this.categorySubscription = this.categoryService
      .getCategories()
      .subscribe((res: Category[]) => {
        this.categoryList = res;
        for (let [i, val] of this.categoryList.entries()) {
          if(CId===this.categoryList[i].CId){
            this.bookCategoryName=this.categoryList[i].CName;
          }
        }
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

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload(): Observable<any> {
    console.log(this.selectedFile.name);
    this.filedata.append(
      'ImageToUpload',
      this.selectedFile,
      this.selectedFile.name
    );
    return this.categoryService.uploadImage(this.filedata).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateBook() {
    if (this.selectedFile) {
      this.onUpload().subscribe((res: any) => {
        this.duplicateBookData.BImage = res;
        console.log(this.duplicateBookData);
        this.bookService
          .updateBook(this.duplicateBookData)
          .subscribe((res: any) => {
            this.handleEditButton();
            this.populateBookDetails();
          });
      });
    } else {
      console.log(this.duplicateBookData);
      this.bookService
        .updateBook(this.duplicateBookData)
        .subscribe((res: any) => {
          this.handleEditButton();
          this.populateBookDetails();
        });
    }
  }
}
