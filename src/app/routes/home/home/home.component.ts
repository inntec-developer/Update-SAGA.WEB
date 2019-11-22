import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager, MouseEvent } from '@agm/core';

import { DialogEventComponent } from './../../../components/calendario/dialog-event/dialog-event.component';
import { MatDialog } from '@angular/material';
import { SettingsService } from '../../../core/settings/settings.service';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GoogleMapsAPIWrapper]
})
export class HomeComponent implements OnInit {
  // scrollwheel = true;
  // latitude: number;
  // longitude: number;
  // zoom: number;
  // address: string;
  // private geoCoder;
  // custom map style
  // mapStyles = [
  //   { 'featureType': 'water', 'stylers': [{ 'visibility': 'on' }, { 'color': '#bdd1f9' }] },
  //   { 'featureType': 'all', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#334165' }] },
  //   { featureType: 'landscape', stylers: [{ color: '#e9ebf1' }] },
  //   { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c5c6c6' }] },
  //   { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fff' }] },
  //   { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#fff' }] },
  //   { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#d8dbe0' }] },
  //   { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#cfd5e0' }] },
  //   { featureType: 'administrative', stylers: [{ visibility: 'on' }, { lightness: 33 }] },
  //   { featureType: 'poi.park', elementType: 'labels', stylers: [{ visibility: 'on' }, { lightness: 20 }] },
  //   { featureType: 'road', stylers: [{ color: '#d8dbe0', lightness: 20 }] }
  // ];

  Direccion = 'Calle Fuente de la Alianza 124, Villa Fontana, Tlaquepaque, Jalisco, Mexico';



  public UpdateFolios: any;
  public UpdatePosiciones: any;
  public GrtOrAud = [1, 3, 8, 12, 14];
  public isGerenteOrAudito = false;
  public isGerenteNac = false;
  constructor(
    private settings: SettingsService,
    // public mapsApiLoader: MapsAPILoader,
    // private mapsAPILoader: MapsAPILoader,
  ) {
  }

  ngOnInit() {
    const tipoUsuserio = +this.settings['user']['tipoUsuarioId'];
    if (this.GrtOrAud.find(x => x === tipoUsuserio)) {
      this.isGerenteOrAudito = true;
      this.isGerenteNac = false;
    } else if ( tipoUsuserio === 13) {
      this.isGerenteNac = true;
      this.isGerenteOrAudito = false;
    }

    // load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   // this.setCurrentLocation();
    //   const busqueda = 'Calle Fuente de la Alianza 124, Villa Fontana, Tlaquepaque, Jalisco, Mexico';
    //   this.geoCoder = new google.maps.Geocoder();
    //   this.geoCoder.geocode({ 'address': busqueda }, (results, status) => {
    //     if (status === 'OK') {
    //       if (results[0]) {
    //         this.latitude = results[0].geometry.location.lat();
    //         this.longitude = results[0].geometry.location.lng();
    //         this.zoom = 17;
    //         this.address = busqueda;
    //       } else {
    //         window.alert('No results found');
    //       }
    //     } else {
    //       window.alert('Geocoder failed due to: ' + status);
    //     }
    //   });

    // const autocomplete = new google.maps.places.Autocomplete(
    //   this.searchElementRef.nativeElement);

    // autocomplete.addListener('place_changed', () => {
    //   this.ngZone.run(() => {
    //     // get the place result
    //     const place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //     //  verify result
    //     if (place.geometry === undefined || place.geometry === null) {
    //       return;
    //     }

    //     // set latitude, longitude and zoom
    //     this.latitude = place.geometry.location.lat();
    //     this.longitude = place.geometry.location.lng();
    //     this.zoom = 12;
    //   });
    // });
    // });
  }

  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 17;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }

  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 17;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }


  changeFolios($event: any) {
    this.UpdateFolios = $event;
  }

  changePosiciones($event: any) {
    this.UpdatePosiciones = $event;
  }

}
