import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from './model/category.model';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];
  categorySubscription!: Subscription;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {

    this.categorySubscription = this.categoryService.getCategories()
    .subscribe((res:any[])=>{
      
      this.categoryList = res;
      console.log("Category"+ this.categoryList);
    });
  }

  ngOnDestroy():void{
    this.categorySubscription.unsubscribe();
    if(this.categoryList && this.categoryList.length>0){
      this.categoryList.length = 0;
    }
  }
}
