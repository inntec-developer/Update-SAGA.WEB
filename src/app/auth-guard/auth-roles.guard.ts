import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ElementRef, HostListener, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../core/settings/settings.service';

@Injectable()
export class AuthRolesGuard implements CanActivate {

  constructor(
    private el: ElementRef,
    private router: Router, 
    public settings: SettingsService ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.onclick(state);

     
  }
  @HostListener('click', ['$event']) onclick(btn){

    let privilegios = JSON.parse(sessionStorage.getItem('privilegios'))
    let part = this.el.nativeElement.querySelector('btn-delete');
    console.log(privilegios)
    console.log(btn)
    console.log(part)

    return true;
}
}
