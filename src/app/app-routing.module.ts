import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CategoryComponent } from './category/category.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CreateBookComponent } from './book/components/create-book/create-book.component';
import { CreateCategoryComponent } from './category/components/create-category/create-category.component';
import { CouponComponent } from './coupon/coupon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'category', component: BookDetailsComponent },
  { path: 'book/create', component: CreateBookComponent },
  { path: 'category/create', component: CreateCategoryComponent },
  { path: 'coupon', component: CouponComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
