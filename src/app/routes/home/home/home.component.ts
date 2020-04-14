import { Component, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { Router } from '@angular/router';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GoogleMapsAPIWrapper]
})
export class HomeComponent implements OnInit {
  public UpdateFolios: any;
  public UpdatePosiciones: any;
  public GrtOrAud = [1, 3, 8, 12, 14, 13];
  public isGerenteOrAudito = false;
  public open = false;
  public porcentaje = 0;
  constructor(
    private settings: SettingsService,
    private router: Router
    // public mapsApiLoader: MapsAPILoader,
    // private mapsAPILoader: MapsAPILoader,
  ) {
  }

  ngOnInit() {
    const tipoUsuserio = +this.settings['user']['tipoUsuarioId'];
    if (this.GrtOrAud.find(x => x === tipoUsuserio)) {
      this.isGerenteOrAudito = true;
      // this.isGerenteNac = false;
    } else if (tipoUsuserio === 15) {
      this.router.navigate(['/webcampo/inicio']);
    }
  }
  changeFolios($event: any) {
    this.UpdateFolios = $event;
  }

  changePosiciones($event: any) {
    this.UpdatePosiciones = $event;
  }

}
