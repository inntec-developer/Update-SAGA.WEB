import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiConection } from './../api-conection.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from '../../core/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class EquiposTrabajoService {

  private UrlGetRporGG = ApiConection.ServiceUrl + ApiConection.GetRportGG;

  constructor(private _httpClient: HttpClient, private settings: SettingsService) { }

  GetRportGG(gg) :Observable<any>
  {
    let params = new HttpParams().set('gg', gg);
    
    return this._httpClient.get(this.UrlGetRporGG, {params: params})
  }
}
