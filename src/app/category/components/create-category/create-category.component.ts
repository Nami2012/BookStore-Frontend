import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  handleAddCategory() {
    this.categoryService
      .addCategory(this.addCategoryForm.value)
      .subscribe((res) => {
        if (res) {
          this.addCategoryForm.reset();
          this.router.navigate(['/category']);
        }
      });
  }
}
