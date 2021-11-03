import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchresultComponent } from './shared/components/search/searchresult/searchresult.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'cart', component: CartComponent},
  {path: 'search/:searchTerm/:categoryValue', component: SearchresultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
