import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-maps-address',
  templateUrl: './maps-address.component.html',
  styleUrls: ['./maps-address.component.scss']
})
export class MapsAddressComponent implements OnInit, OnChanges {
  @Input('Direccion') Direccion: string;
  scrollwheel = true;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  src = '';

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

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      const busqueda = this.Direccion;
      this.geoCoder = new google.maps.Geocoder();
      this.geoCoder.geocode({ 'address': busqueda }, (results, status) => {
        if (status === 'OK') {

          if (results[0]) {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            this.zoom = 18;
            this.address = busqueda;
            this.src = 'https://maps.googleapis.com/maps/api/staticmap?center='
            + this.latitude + ',' + this.longitude
            + '&markers=color:blue%7Clabel:S%7C' + this.latitude + ',' + this.longitude
            + '&zoom=18&size=750x400&key=AIzaSyCvtCCb5IK8MQbFiXe4J2F5LIQqa5fLeSY';
          }
        }
      });
    });
  }

}
