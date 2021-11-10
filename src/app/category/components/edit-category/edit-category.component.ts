import { Component, OnInit } from '@angular/core';
import { AdminCategory, Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryDetails!:AdminCategory;
  isEditing = false;
  buttonText = 'Edit';
  duplicateCategoryData!: AdminCategory;
  isUpdated = false;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.populateCategoryDetails();
  }

  populateCategoryDetails() {
    let categoryId = this.route.snapshot.paramMap.get('id') ;
    this.categoryService.getCategoryById(categoryId).subscribe((res: any) => {
      console.log(res);
      this.categoryDetails = res; //change access method
     this.duplicateCategoryData = this.categoryDetails;

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

  updateCategory() {
     this.categoryService.updateCategory(this.duplicateCategoryData).subscribe((res:any)=>{
      this.handleEditButton();
      this.populateCategoryDetails();
     });
  }

  

}
