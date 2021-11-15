import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/book/components/book-details/model/book.model';
import { Category } from 'src/app/category/model/category.model';
import { CategoryService } from 'src/app/category/services/category.service';
import { SearchService } from '../services/search.service';
// import bookservice

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})
export class SearchresultComponent implements OnInit {
  books!: Book[];

  searchTerm!: string;
  categoryValue!: number;
  categories!: Category[];

  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl('', Validators.required),
    searchOption: new FormControl('Title'),
    cid: new FormControl('0', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private categoryService: CategoryService
  ) {} // should add bookoservice in constructor

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params) => {
      console.log(params);
      this.searchTerm = params.searchTerm;
      this.categoryValue = params.categoryValue;
      if (this.categoryValue) {
        this.searchService
          .searchByCategory(this.searchTerm, this.categoryValue)
          .subscribe((books) => {
            this.books = books;
          });
      } else {
        this.searchService.searchByTitle(this.searchTerm).subscribe((books) => {
          this.books = books;
        });
      }
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      this.categories.unshift({
        CId: 0,
        CName: 'All',
        CDescription: '',
        CImage: '',
        CPosition: 0,
      });
    });
  }

  handleSearch() {
    console.log(this.searchForm.value);
    switch (this.searchForm.value.searchOption) {
      case 'Title':
        this.searchService
          .searchByTitle(this.searchForm.value.searchTerm)
          .subscribe((books) => {
            if (this.searchForm.value.cid !== '0') {
              books = books.filter((book) => {
                return book.CId == this.searchForm.value.cid;
              });
            }
            this.books = books;
          });
        break;
      case 'Author':
        this.searchService
          .searchByAuthor(this.searchForm.value.searchTerm)
          .subscribe((books) => {
            if (this.searchForm.value.cid !== '0') {
              books = books.filter((book) => {
                return book.CId == this.searchForm.value.cid;
              });
            }

            console.log(books);
            this.books = books;
          });
        break;
      case 'ISBN':
        this.searchService
          .searchByISBN(this.searchForm.value.searchTerm)
          .subscribe((books) => {
            if (this.searchForm.value.cid !== '0') {
              books = books.filter((book) => {
                return book.CId == this.searchForm.value.cid;
              });
            }
            this.books = books;
          });
        break;
      default:
        break;
    }
  }
  //   this.route.params.subscribe(params => { // for retrieve booknames from the bookservice
  //     if(params.searchTerm)
  //     this.books = this.BookService.getAll().filter(book =>
  //       book.name.toLowerCase().includes(params.searchTerm.toLowerCase()))
  //     else
  //     this.books = this.BookService.getAll();
  //   })
  // }
}
