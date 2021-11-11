import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminCategory, Category } from './model/category.model';
import { CategoryService } from './services/category.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  API_URL = 'https://localhost:44380/api/image/category/';
  isAdmin: boolean = false;
  categoryList: AdminCategory[] = [];
  categorySubscription!: Subscription;
  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe((res: any) => {
      if (res) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    this.populateCategory();
  }

  populateCategory() {
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

  toggleActiveStatus(CId: number): void {
    this.categoryService
      .updateActiveStatusCategory(CId)
      .subscribe((res: any) => {
        this.populateCategory();
      });
  }

  delete(CId:number):void{
    this.categoryService.deleteCategory(CId).subscribe((res:any)=>{
      this.populateCategory();
    });
  }
}
