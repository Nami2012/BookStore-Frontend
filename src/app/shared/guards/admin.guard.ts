import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Checks whether the user is logged in or not
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Checks whether the user is an admin or not
    return new Promise((resolve, reject) => {
      this.authService.isAdmin().subscribe(
        (res: any) => {
          if (res) {
            resolve(true);
          } else {
            this.router.navigate(['login']);
            resolve(false);
          }
        },
        (err) => {
          this.router.navigate(['login']);
          resolve(false);
        }
      );
    });
  }
}
