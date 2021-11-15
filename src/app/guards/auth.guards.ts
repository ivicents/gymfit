import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const access_token = this.localStorageService.get('access_token');
    const mode = this.localStorageService.get('mode');
    if (access_token && mode) {
      // logged in so return true
      return true;
    }

    if (route.url.length > 1) {
      this.router.navigate(['/monitor/login']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
