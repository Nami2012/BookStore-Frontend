import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { CategoryComponent } from './category/category.component';
import { BookDetailsComponent } from './book/components/book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchresultComponent } from './shared/components/search/searchresult/searchresult.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CreateBookComponent } from './book/components/create-book/create-book.component';
import { CreateCategoryComponent } from './category/components/create-category/create-category.component';
import { CouponComponent } from './coupon/coupon.component';
import { BookProductDetailComponent } from './book/components/book-product-detail/book-product-detail.component';
import { UserDetailsComponent } from './user-details/Components/user-details-component.component';
import { UserListComponent } from './user-details/Components/user-list/user-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { CheckoutComponent } from './orders/components/checkout/checkout.component';
import { OrderPostComponent } from './orders/components/order-post/order-post.component';
import { EditBookComponent } from './book/components/edit-book/edit-book.component';
import { EditCategoryComponent } from './category/components/edit-category/edit-category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'book/create',
    component: CreateBookComponent,
    canActivate: [AdminGuard],
  },
  { path: 'book/edit/:id', component: EditBookComponent },
  { path: 'category/edit/:id', component: EditCategoryComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'order/:id',
    component: OrderPostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'category/create',
    component: CreateCategoryComponent,
    canActivate: [AdminGuard],
  },

  { path: 'categories', component: CategoryComponent },
  { path: 'category/:id', component: BookDetailsComponent },
  // { path: 'category', component: BookDetailsComponent },
  { path: 'category', redirectTo: '/category/1', pathMatch: 'full' },

  { path: 'coupon', component: CouponComponent },
  { path: 'book/:id', component: BookProductDetailComponent },
  { path: 'book', redirectTo: '/book/1', pathMatch: 'full' },
  { path: 'user/:id', component: UserDetailsComponent },
  // { path: 'user', component: UserListComponent },
  { path: 'user', redirectTo: '/userlist', pathMatch: 'full' },
  { path: 'userlist', component: UserListComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'search/:searchTerm/:categoryValue',
    component: SearchresultComponent,
  },
  { path: 'search/:searchTerm', component: SearchresultComponent },
  { path: 'search', component: SearchresultComponent },
  { path: 'orders/checkout/:orderid', component: CheckoutComponent },

  // {path:'**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
