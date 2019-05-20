import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth/auth.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../core/settings/settings.service';

@Injectable()
export class LogInGuardGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    public settings: SettingsService ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.isAuthenticated()){
        this.router.navigate(['/login'])
        return false;
      }
      else
      {

        return true;
      }
  }
  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : boolean
  {
    var privilegios = this.settings.user.privilegios;
    return false;
  }
}
