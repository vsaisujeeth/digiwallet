import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad{

  constructor(private auth: AuthService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.auth.userIsAuthenticated) {
      this.router.navigateByUrl('/auth');
    }
    return this.auth.userIsAuthenticated;
  }
}
