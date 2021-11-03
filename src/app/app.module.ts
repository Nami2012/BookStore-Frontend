import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { SecondarynavComponent } from './shared/components/secondarynav/secondarynav.component';


import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './shared/components/search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchresultComponent } from './shared/components/search/searchresult/searchresult.component';
import { DropdownComponent } from './shared/components/search/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    WishlistComponent,
    OrdersComponent,
    CartComponent,
    SecondarynavComponent,
    CategoryComponent,
    SearchComponent,
    SearchresultComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
