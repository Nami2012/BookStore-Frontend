import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/services/category.service'; 
import { Category } from 'src/app/category/model/category.model';
import { DropdownService } from './services/dropdown.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  selectedCategory: string = "All";
  categoryList: Category[] = [];
  selectedValue: string = "";
  categorySubscription!: Subscription;
  constructor(private categoryService:CategoryService, private dropdown:DropdownService) { }

  ngOnInit(): void {
    this.categorySubscription = this.categoryService.getCategories()
    .subscribe((res:any[])=>{
      this.categoryList = res;
    });
    
  }
  handleChange(){
    this.dropdown.setValue(this.selectedValue);
  }
}
