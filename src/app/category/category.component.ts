import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from './model/category.model';
import { CategoryService } from './services/category.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  isAdmin: boolean = false;
  categoryList: Category[] = [];
  categorySubscription!: Subscription;
  constructor(private categoryService: CategoryService,
    private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(
      (res: any) => {
        console.log(res);
        this.isAdmin = true;
      },
      (err) => {
        this.isAdmin = false;
      }
    );
    this.categorySubscription = this.categoryService
      .getCategories()
      .subscribe((res: any[]) => {
        this.categoryList = res;
      });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    if (this.categoryList && this.categoryList.length > 0) {
      this.categoryList.length = 0; 
    }
  }
}
