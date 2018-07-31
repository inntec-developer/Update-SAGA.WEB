import { ActivatedRoute, Router } from '@angular/router/';
import { Component, OnInit } from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { CatalogoConfiguracionService } from '../../../../service/DisenioVacante/catalogo-configuracion.service';
import { ConfiguracionService } from '../../../../service/DisenioVacante/configuracion.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from './../../../../service/requisiciones/requisiciones.service';

@Component({
  selector: 'app-disenador-vacante',
  templateUrl: './disenador-vacante.component.html',
  styleUrls: ['./disenador-vacante.component.scss'],
  providers:[CatalogoConfiguracionService,ConfiguracionService, RequisicionesService],
})

export class DisenadorVacanteComponent implements OnInit {
  public General : any[];
  public Contrato : any[];
  public PuestoReclutar : any[];
  public Horario : any[];
  public sueldo : any[];
  public Otros : any[];
  public Actividad : any[];
  public Beneficio : any[];
  public Direccion : any[];
  public Telefono : any[];
  public Contacto : any[];
  public Psicometria : any[];
  public Documento : any[];
  public Proceso : any[];
  public Copetencia : any[];
  public Ubicacion : any[];
  public ListaCampo :Array<any> = [];
  public ListaCon : Array<any> = [];
  public Clasifica : any[];

  public Requi : string;
  public Mensaje :string;
  public variable:boolean = false;
  private toasterService: ToasterService;
  public bol:boolean;
  step = 0;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
      positionClass: 'toast-bottom-right',
      showCloseButton: true
  });
  Folio: any;
  VBtra: any;

  constructor(
          private service: CatalogoConfiguracionService
          ,private http: Http
          ,private route: ActivatedRoute
          ,private router: Router
          ,private Config: ConfiguracionService
          ,toasterService: ToasterService
          ,private spinner: NgxSpinnerService
          ,private serviceRequi : RequisicionesService
        ) {
            this.toasterService = toasterService;
            this.route.params.subscribe( params => {
              this.Requi = params['Requi'];
              this.Folio = params['Folio'];
              this.VBtra = params['VBtra'];
            });
        }

  ngOnInit() {
    this.service.getGeneral(this.Requi)
    .subscribe( data => {
      this.General = data;
    });

    this.service.getCampos()
    .subscribe( data => {
    //  let ListaCampo : any[];
      this.ListaCampo = [];
      this.ListaCampo = data;
    //  this.Publicar()
    });

    this.service.getClasificaciones()
    .subscribe( data => {
      this.Clasifica = data;
    });
  }

  Publicar(){
    this.spinner.show();
    for (let item of this.ListaCampo) {
      let d = document.getElementById('Detalle_' + item.id);
      let r = document.getElementById('Resumen_' + item.id);
      let det = d['checked'];
      let res = r['checked'];
      let config = {
                      detalle:det,
                      resumen:res,
                      idCampo:item.id,
                      nombre:item.nombre,
                      id:this.Requi
                   }
      this.ListaCon.push(config);
   }

   this.Config.UpdatePublicar(this.ListaCon)
   .subscribe( data => {
    this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.spinner.hide();
   });
   this.ListaCon = [];

  }

  // public config: ToasterConfig =
  //      new ToasterConfig({
  //          showCloseButton: true,
  //          tapToDismiss: false,
  //          timeout: 0
  //      });

  Descripcion(){
    this.toasterService.pop('warning', 'Trabajando', 'Se cambio la forma de como guardar la configuracion');
  }

  SetDetalle(id,titulo){
    // let e2 = document.getElementById('Detalle_' + id);
    // let algo = (<HTMLInputElement>e2).checked;
    let e = document.getElementById('Detalle_' + id);
    let bol = e['checked'];
    // this.Config.SetDetalle(this.Requi,id,bol)
    // .subscribe( data => {
    //   console.log(data.Mensaje)
       this.pop('',true,bol,titulo,'Detalle');
    // });
  }


  SetResumen(id,titulo){
    let e = document.getElementById('Resumen_' + id);
    this.bol = e['checked'];
    // this.Config.SetResumen(this.Requi,id,this.bol)
    // .subscribe( data => {
    //   this.Mensaje = data;
       this.pop('',true,this.bol,titulo,'Resumen');
    // });
  }

  popGenerico(mensaje:string,bandera:boolean,titulo:string) {
    var type = 'success';
    if (bandera == false) {
          type = 'error';
          mensaje = 'Ocurrio algo inesperado intentelo mas tarde';

      }
      this.toasterService.pop(type, titulo, mensaje);
  }

  pop(mensaje:string,bandera:boolean,tipo:boolean,titulo:string,area:string) {
    var type = 'success';
    mensaje = 'Se mostrara en  ' + area;
    if (tipo == false) {
      type = 'info';
      mensaje='No se mostrara en ' + area;
    }
    if (bandera == false) {
          type = 'error';
          mensaje = 'Ocurrio algo inesperado intentelo mas tarde';
      }
      this.toasterService.pop(type, titulo, mensaje);
  }

  LlamarVacante(){
    this.router.navigate(['/reclutamiento/vacantes']);
  }

  setStep(index: number) {
   this.step = index;
 }

 nextStep() {
   this.step++;
 }

 prevStep() {
   this.step--;
 }
}
