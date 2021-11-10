import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { BookComponent } from './book/book.component';
import { CreateBookComponent } from './book/components/create-book/create-book.component';

import { CategoryComponent } from './category/category.component';
import { BookDetailsComponent } from './book/components/book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { CreateCategoryComponent } from './category/components/create-category/create-category.component';
import { CouponComponent } from './coupon/coupon.component';
import { SecondarynavComponent } from './shared/components/secondarynav/secondarynav.component';

import { SearchComponent } from './shared/components/search/search.component';
import { SearchresultComponent } from './shared/components/search/searchresult/searchresult.component';
import { DropdownComponent } from './shared/components/search/dropdown/dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListHorizontalComponent } from './shared/components/list-horizontal/list-horizontal.component';
import { BookProductDetailComponent } from './book/components/book-product-detail/book-product-detail.component';
import { UserDetailsComponent } from './user-details/Components/user-details-component.component';
import { UserListComponent } from './user-details/Components/user-list/user-list.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { LogoutComponent } from './auth/logout/logout.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { CheckoutComponent } from './orders/components/checkout/checkout.component';
import { OrderPostComponent } from './orders/components/order-post/order-post.component';
import { EditCategoryComponent } from './category/components/edit-category/edit-category.component';
import { EditBookComponent } from './book/components/edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SignupComponent,
    BookComponent,
    CreateBookComponent,
    CategoryComponent,
    BookDetailsComponent,
    HomeComponent,
    WishlistComponent,
    OrdersComponent,
    CartComponent,
    CreateCategoryComponent,
    CouponComponent,
    SecondarynavComponent,
    ListHorizontalComponent,
    BookProductDetailComponent,
    SecondarynavComponent,
    CategoryComponent,
    SecondarynavComponent,
    CategoryComponent,
    SearchComponent,
    SearchresultComponent,
    DropdownComponent,
    UserDetailsComponent,
    UserListComponent,
    LogoutComponent,
    NotfoundComponent,
    CheckoutComponent,
    OrderPostComponent,
    EditCategoryComponent,
    EditBookComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
