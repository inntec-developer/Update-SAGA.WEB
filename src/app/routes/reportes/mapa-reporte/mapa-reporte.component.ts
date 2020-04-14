import { ColorsService } from './../../../shared/colors/colors.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ReportesService } from '../../../service/Reporte/reportes.service';

declare var google: any;

@Component({
  selector: 'app-mapa-reporte',
  templateUrl: './mapa-reporte.component.html',
  styleUrls: ['./mapa-reporte.component.scss'],
  providers: [ReportesService]
})
export class MapaReporteComponent implements OnInit {

  public General: any[];
  public scrollwheel = true;
  public latitude: number;
  public longitude: number;
  public latArray: any[];
  public longArray: any[];
  public zoom: number;
  public address: string;
  public mensaje: string;
  public tipomapa: string;
  private geoCoder;
  public label: any;

  sparkOptions1 = {
    barColor: this.colors.byName('info'),
    height: 30,
    barWidth: '5',
    barSpacing: '2',

  };


  constructor(public colors: ColorsService,
    private mapsAPILoader: MapsAPILoader,
    private servicio: ReportesService
  ) { }


  ngOnInit() {
    this.tipomapa = 'roadmap';
    this.servicio.getMapaFolios().subscribe(data => {
      this.General = data.filter(x => x.folios > 0);
      console.log(this.General)
      this.General.forEach(item => {
        // item.latitude = parseFloat(this.latArray[i]);
        // item.longitude = parseFloat(this.longArray[i]);
        item.grafica = [
          item.nueva,
          item.aprobada,
          item.disenada,
          item.busqueda,
          item.envio,
          item.nuevabusq,
          item.socioeconomico,
          item.espera,
          item.garantia,
          item.pausada,
        ];
        item.porcentaje = +this.round(item.folios > 0 ? item.foliosCubiertos * 100 / item.folios : 0, 0);

        if (item.porcentaje === 100) {
          item.pieOptions = {
            animate: {
              duration: 800,
              enabled: true
            },
            barColor: this.colors.byName('success'),
            // trackColor: 'rgba(200,200,200,0.4)',
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'round',
            size: 145
          };
        } else if (item.porcentaje < 50) {
          item.pieOptions = {
            animate: {
              duration: 800,
              enabled: true
            },
            barColor: this.colors.byName('danger'),
            // trackColor: 'rgba(200,200,200,0.4)',
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'round',
            size: 145
          };
        } else {
          item.pieOptions = {
            animate: {
              duration: 800,
              enabled: true
            },
            barColor: this.colors.byName('warning'),
            // trackColor: 'rgba(200,200,200,0.4)',
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'round',
            size: 145
          };
        }
      });
      this.PintadoMapa('Jalisco');
    });

  }

  PintadoMapa(estado) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      this.geoCoder.geocode({ 'address': estado }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 6;
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
          }
        }
      });
    });
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }
  onMouseOut(infoWindow, $event: MouseEvent) {
    // infoWindow.close();
  }
  round(value, precision): any {
    const rounder = Math.pow(10, precision);
    return (Math.round(value * rounder) / rounder).toFixed(precision);
  }

}
