import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/category/model/category.model';
import { CategoryService } from 'src/app/category/services/category.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  categories: Category[] = [];

  addBookForm: FormGroup = new FormGroup({
    cid: new FormControl('', Validators.required),
    btitle: new FormControl('', Validators.required),
    bisbn: new FormControl('', Validators.required),
    byear: new FormControl('', [
      Validators.required,
      Validators.min(1500),
      Validators.max(2500),
    ]),
    bauthor: new FormControl('', Validators.required),
    bprice: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10000),
    ]),
    bdescription: new FormControl(''),
    bimage: new FormControl(''),
  });

  constructor(
    private bookService: BookService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  filedata = new FormData();
  selectedFile: any;

  // Get categories from book service
  getCategories(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  // Add book to database
  handleAddBook(): void {
    this.onUpload().subscribe((res) => {
      this.addBookForm.value.bimage = res;

      this.bookService.addBook(this.addBookForm.value).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
    });
  }

  onUpload(): Observable<any> {
    console.log(this.selectedFile.name);
    this.filedata.append(
      'ImageToUpload',
      this.selectedFile,
      this.selectedFile.name
    );
    console.log('Inside on upload', this.filedata);
    return this.categoryService.uploadImage(this.filedata).pipe(
      map((res: any) => {
        console.log('Inside map', res);
        return res;
      })
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
}
