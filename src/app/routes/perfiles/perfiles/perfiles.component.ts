import 'rxjs/add/operator/filter';

import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../../core/settings/settings.service';
import { settings } from 'cluster';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})
export class PerfilesComponent implements OnInit {
  public user :  string;

  constructor(
    private _Route: ActivatedRoute,
    private settings : SettingsService
  ) { }

  ngOnInit() {
    if( this._Route.queryParams.filter(params => params.user) != null ){
      let userName = this._Route.queryParams.filter(params => params.user)
      .subscribe(params => {
        this.settings.user.name = params.user;
      })
    }

    // let userName = this._Route.snapshot.paramMap.get('user');
      // this.settings.user.name = userName;
      // console.log(this.settings.user.name);

    // this._Route.params.forEach((params: Params) => {
    //   this.userName = params['user'];
    //   this.settings.user.name = this.userName;
    // });
  }

}
