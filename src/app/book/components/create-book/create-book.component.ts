import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/model/category.model';
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
    title: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // Get categories from book service
  getCategories(): void {
    this.bookService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}
