import { Component, Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../../category/model/category.model';
import { CategoryService } from '../../../category/services/category.service';

@Component({
  selector: 'app-secondarynav',
  templateUrl: './secondarynav.component.html',
  styleUrls: ['./secondarynav.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class SecondarynavComponent implements OnInit {
  categoryList: Category[] = [];
  categorySubscription!: Subscription;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryService
      .getCategories()
      .subscribe((res: any[]) => {
        this.categoryList = res;
      });
  }
}
