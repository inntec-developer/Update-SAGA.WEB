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
  private UrlGetRporTable = ApiConection.ServiceUrl + ApiConection.GetRportTable;

  constructor(private _httpClient: HttpClient, private settings: SettingsService) { }

  GetRportGG(gg): Observable<any> {
    const params = new HttpParams().set('gg', gg);

    return this._httpClient.get(this.UrlGetRporGG, {params: params});
  }

  GetRportTable(usuario, orden): Observable<any> {
    const params = new HttpParams().set('usuario', usuario).set('orden', orden);

    return this._httpClient.get(this.UrlGetRporTable, {params: params});
  }
}
