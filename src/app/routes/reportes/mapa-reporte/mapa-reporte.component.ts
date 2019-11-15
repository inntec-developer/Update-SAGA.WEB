import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ReportesService } from '../../../service/Reporte/reportes.service';

declare var google: any;

@Component({
  selector: 'app-mapa-reporte',
  templateUrl: './mapa-reporte.component.html',
  styleUrls: ['./mapa-reporte.component.scss']
})
export class MapaReporteComponent implements OnInit {

  public General : any[];
  public scrollwheel = true;
  public latitude: number;
  public longitude: number;
  public latArray : any[];
  public longArray: any[];
  public zoom: number;
  public address: string;
  public mensaje:string;
  public tipomapa:string;
  private geoCoder;
  public label: any;
  
  //src = '';
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private servicio:ReportesService
  ) { }

  popMensaje(dato){
    alert(dato)
  }

  ngOnInit() {
    this.latArray = ["21.8852562","30.8406338","26.0444446","19.8301251","16.7569318","28.6329957"
    ,"19.4326077","27.058676","19.1222634","24.5592665","21.0190145","17.4391926","20.0910963"
    ,"20.6595382","19.294099","19.4043848","18.8316418","21.5009712","25.592172 ","17.1037154"

    ,"18.6085932","20.5887932","19.5778903","22.1564699","24.8049008","29.0820824","17.8409173"
    ,"24.26694","19.318154","18.6118374","20.7098786","22.7708555"
    ]

    this.longArray = ["-102.29156769999997","-115.28375849999998","-111.66607249999998"
    ,"-90.53490870000002","-93.1292353","-106.06910040000002","-99.13320799999997","-101.7068294"
    ,"-104.00723479999999","-104.6587821","-101.25735859999998","-99.54509739999997"
    ,"-98.76238739999997","-103.34943759999999","-99.701255"
    ,"-101.7068294","-99.00454","-104.946946","-100.0410077","-96.805773"

    ,"-98.1890451","-100.38988810000001","-88.0630853","-100.98554089999999","-107.4933554"
    ,"-111.1290758","-92.6189273","-98.8362755","-98.2374954","-96.251794"
    ,"-89.09433769999998","-102.5832426"
    ]
    // this.mensaje = "Jalisco 42 folios activos";
     this.tipomapa = "terrain";
    // this.label= {
    //   color: 'black',
    //   fontSize:'16px',
    //   fontWeight: 'bold',
    //   text: "Jalisco 70",
    //   border:'5px solid #346FF7',
    //   height:' 20px',
    //   width: '20px',
    // }

    this.servicio.getMapaFolios()
    .subscribe( data => {
    this.General = data;
    let i = 0;
    this.General.forEach(item => {
      item.latitude = parseFloat(this.latArray[i]);
      item.longitude = parseFloat(this.longArray[i]);
      i++
  });
  this.General = this.General.filter(item => {
    if (item.folios != '0')
      return item;
  });


      this.PintadoMapa();
    });
   
    
    //roadmap
      
        // this.geoCoder.geocode({ 'address': 'jalisco' }, (results, status) => {
        //   if (status === 'OK') {
        //     if (results[0]) {
        //       this.latitude = results[0].geometry.location.lat();
        //       this.longitude = results[0].geometry.location.lng();
        //       this.zoom = 5;
        //       this.address = 'guadalajara';
        //       // this.src = 'https://maps.googleapis.com/maps/api/staticmap?center='
        //       // + this.latitude + ',' + this.longitude
        //       // + '&markers=color:blue%7Clabel:S%7C'+ this.latitude + ',' + this.longitude
        //       // + '&zoom=18&size=750x400&key=AIzaSyCvtCCb5IK8MQbFiXe4J2F5LIQqa5fLeSY'
        //     }
        //   }
        // });
      
  }

  PintadoMapa(){
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      this.geoCoder.geocode({ 'address': 'jalisco' }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 6;
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
          }
        }
      });
    });
    console.log(this.General) 
  }

 

}
