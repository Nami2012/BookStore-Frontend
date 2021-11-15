import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  addCategoryForm: FormGroup = new FormGroup({
    cname: new FormControl('', Validators.required),
    cdescription: new FormControl('', Validators.required),
    cimage: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  filedata = new FormData();
  selectedFile: any;

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
    console.log('Inside on upload', this.filedata);
    return this.categoryService.uploadImage(this.filedata).pipe(
      map((res: any) => {
        console.log('Inside map', res);
        return res;
      })
    );
  }
  handleAddCategory() {
    this.onUpload().subscribe((res) => {
      console.log(res);
      this.addCategoryForm.value.cimage = res;
      this.categoryService
        .addCategory(this.addCategoryForm.value)
        .subscribe((res) => {
          if (res) {
            this.addCategoryForm.reset();
            this.router.navigate(['/category']);
          }
        });
    });
  }
}
