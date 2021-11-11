import { Component, OnInit } from '@angular/core';
import { AdminCategory, Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  categoryDetails!: AdminCategory;
  isEditing = false;
  buttonText = 'Edit';
  duplicateCategoryData!: AdminCategory;
  isUpdated = false;
  BOOK_IMAGE_API = 'https://localhost:44380/api/image/Categories/';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.populateCategoryDetails();
  }

  filedata = new FormData();
  selectedFile!: any;

  populateCategoryDetails() {
    let categoryId = this.route.snapshot.paramMap.get('id');
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

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  updateCategory() {
    if (this.selectedFile) {
      this.onUpload().subscribe((res: any) => {
        this.duplicateCategoryData.CImage = res;
        this.categoryService
          .updateCategory(this.duplicateCategoryData)
          .subscribe((res: any) => {
            this.handleEditButton();
            this.populateCategoryDetails();
          });
      });
    } else {
      this.categoryService
        .updateCategory(this.duplicateCategoryData)
        .subscribe((res: any) => {
          this.handleEditButton();
          this.populateCategoryDetails();
        });
    }
  }
}
