import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { CreateCategoryComponent } from './category/components/create-category/create-category.component';
import { CouponComponent } from './coupon/coupon.component';
import { SecondarynavComponent } from './shared/components/secondarynav/secondarynav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListHorizontalComponent } from './shared/components/list-horizontal/list-horizontal.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
