import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { ComponentsService } from '../../service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-pop-notificaciones',
  templateUrl: './pop-notificaciones.component.html',
  styleUrls: ['./pop-notificaciones.component.scss']
})
export class PopNotificacionesComponent implements OnInit {
notificaciones = [];
  constructor( private settings: SettingsService,
    public _service: ComponentsService,
    private _Router: Router,
    private _Route: ActivatedRoute) {

    }

  ngOnInit() {
    this._service.getAlertStm(this.settings.user['id']).subscribe(elemnt => {

      if (elemnt.length > 3) {
        elemnt = elemnt.splice(0, 3);
      }

      this.notificaciones = elemnt;
    });
  }

  Seguimiento(data) {
    console.log(data.tipo)
    if (data.tipo === 'RECLUTAMIENTO') {
      this.Leidos(data);
      this._Router.navigate(['reclutamiento/vacantesReclutador']);
    } else if (data.tipo === 'VENTAS') {
      this.Leidos(data);
      this._Router.navigate(['ventas/requisicion', this.GetFolio(data.alert)]);
    }

  }
  GetFolio(cadena): string {
    let numb = cadena.match(/\d/g);
    numb = numb.join('');
    return numb;
  }

  Leidos(data) {
    this._service.deleteAlertStm(data.id, false).subscribe(element => {
      if (element === 200) {
      const idx = this.notificaciones.findIndex(x => x.id === data.id);
      if (idx > -1) {
        const aux = this.notificaciones.splice(idx, 1);
      }
    }
    });
  }

}
