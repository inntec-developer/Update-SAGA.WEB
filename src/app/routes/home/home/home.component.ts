import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

import { DialogEventComponent } from './../../../components/calendario/dialog-event/dialog-event.component';
import { MatDialog } from '@angular/material';
import { SettingsService } from '../../../core/settings/settings.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  // Variables para elmapa
  lat: number = 20.6810727;
  lng: number = -103.3873499;
  zoom: number = 15;
  scrollwheel = true;

  geocode:any;



  // custom map style
  mapStyles = [{ 'featureType': 'water', 'stylers': [{ 'visibility': 'on' }, { 'color': '#bdd1f9' }] }, { 'featureType': 'all', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#334165' }] }, { featureType: 'landscape', stylers: [{ color: '#e9ebf1' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c5c6c6' }] }, { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fff' }] }, { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#fff' }] }, { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#d8dbe0' }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#cfd5e0' }] }, { featureType: 'administrative', stylers: [{ visibility: 'on' }, { lightness: 33 }] }, { featureType: 'poi.park', elementType: 'labels', stylers: [{ visibility: 'on' }, { lightness: 20 }] }, { featureType: 'road', stylers: [{ color: '#d8dbe0', lightness: 20 }] }];



  public UpdateFolios: any;
  public UpdatePosiciones: any;
  public GrtOrAud = [1, 3, 8, 12, 13, 14];
  public isGerenteOrAudito: boolean = false;
  constructor(
    private settings: SettingsService,
    public mapsApiLoader: MapsAPILoader,
    // private wrapper: GoogleMapsAPIWrapper
  ) {
  }

  ngOnInit() {
    var tipoUsuserio = this.settings['user']['tipoUsuarioId']
    if (this.GrtOrAud.find(x => x == tipoUsuserio)) {
      this.isGerenteOrAudito = true
    }
  }

  changeFolios($event: any) {
    this.UpdateFolios = $event;
  }

  changePosiciones($event: any) {
    this.UpdatePosiciones = $event;
  }

}
