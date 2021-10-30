import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      // if logged in return True
      return true;
      // else show login and return False

      //this.router.navigate(['login'])
      //return False;

      // code
      // if(this.authService.isAuth()){
      //   return true;
      // }else{
      //   this.router.navigate(['login']); // redirecting to login page
      //   return false;
      // }
  }
  
}
