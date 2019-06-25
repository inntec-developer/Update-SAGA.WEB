import * as _moment from 'moment';
import * as _rollupMoment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ApiConection } from '../../../service/api-conection.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { daLocale } from 'ngx-bootstrap/chronos/i18n/da';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';

//import {ToasterConfig, ToasterService} from 'angular2-toaster';





const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers:[ReportesService,
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class InformeComponent implements OnInit {





  public value: any;
  public Empresas : any[];
  public Estatus : any[];
  public Usuario : any[];
  public Oficina : any[];
  public objsucursal : any[];
  public objempresa : any[];
  public objsolicit : any[];
  public objrecluta : any[];
  public objstatus : any[];
  public objtipocordi : any[];
  public objtiporeclu : any[];
  public objusercoo : any[];
  public objestado : any[];
  public UsuarioCor : any[];
  public ListaEstado : any[];

  public reclutaList:any;
  public cordinaList:any;

  public FormEmpresas: FormGroup;
  public FormSucursal: FormGroup;
  public FormSolicitante: FormGroup;
  public FormReclutador: FormGroup;
  public FormEstatus: FormGroup;
  public FormCordina: FormGroup;
  public FormTipoReclu: FormGroup;
  public FormUserCor: FormGroup;
  public FormEstado: FormGroup;

   public myDate: any = new Date();
  date = new FormControl(new Date());

  constructor(
    private Rutas: ActivatedRoute,
    private Servicio: ReportesService,
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private adapter: DateAdapter<any>,
 //   private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private estados: CatalogosService
  ) {
  //  this.toasterService = toasterService;
    this.FormEmpresas = new FormGroup({
      ClientesControl: new FormControl({ value: '', disabled: false })
    });
    this.FormSucursal = new FormGroup({
      SucursalControl: new FormControl({ value: '', disabled: false })
    });
    this.FormSolicitante = new FormGroup({
      SolicitanteControl: new FormControl({ value: '', disabled: false })
    });
    this.FormReclutador = new FormGroup({
      ReclutadorControl: new FormControl({ value: '', disabled: false })
    });
    this.FormEstatus = new FormGroup({
      EstatusControl: new FormControl({ value: '', disabled: false })
    });
    this.FormCordina = new FormGroup({
      CordinaControl: new FormControl({ value: '', disabled: false })
    });
    this.FormTipoReclu = new FormGroup({
      TiporecluControl: new FormControl({ value: '', disabled: false })
    });

    this.FormUserCor = new FormGroup({
      UserCorControl: new FormControl({ value: '', disabled: false })
    });

    this.FormEstado = new FormGroup({
      EstadoControl: new FormControl({ value: '', disabled: false })
    });


   }

  ngOnInit() {
    
  
    // let date = new Date();
    // console.log("fecha: "+ date.getDate() +"-"+ date.getMonth());
    // console.log("fecha: "+ (date.setDate(date.getDate() + 1)).toString());
    this.adapter.setLocale('es');
    this.cordinaList = [{id:0,nombre:'Todos'},
      {id:1,nombre:'Especializado'},{id:2,nombre:'Operativo'},{id:3,nombre:'Masivo'}]

      this.reclutaList = [{id:0,nombre:'Todos'},
      {id:1,nombre:'Reclutamiento Puro'},{id:2,nombre:'Subcontratación'},{id:3,nombre:'Staff'}]

    this.Servicio.GetEmpresas().subscribe(item =>{
      this.Empresas = item;
     this.myDate = item.fechal
     document.getElementById('fechaInicial')['value'] = this.ConvierteFecha(item[0].fechal)
      this.Oficina = [{id:0,nombre:'Todas'},
      {id:1,nombre:'Guadalajara'},{id:2,nombre:'México'},{id:3,nombre:'Monterrey'}]
    })

    this.Servicio.GetEstatusRep().subscribe(item =>{
      this.Estatus = item;
    })

    this.Servicio.GetUsuario('0').subscribe(item =>{
      this.Usuario = item;
    })

    this.Servicio.GetUsuario('1').subscribe(item =>{
      this.UsuarioCor = item;
    })
    this.GenerarEstados();



    document.oncontextmenu=null
  }

  ConvierteFecha(dateTime){
    if(dateTime != undefined){
      var res = dateTime.substring(0, 10);
    //  var result = Date.parse(res);
      var date = res.split("-");
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
      var fecha = dd +'/' + mm+'/' + yyyy
      return (fecha);
    }
  }


GenerarEstados(){
  this.estados.getEstado(42).subscribe(item =>{
    this.ListaEstado = item;
    console.log(this.ListaEstado);
  })
}

  empresaChange() {
     this.objempresa = this.FormEmpresas.get('ClientesControl').value;

  }

  sucursalChange(){
    this.objsucursal = this.FormSucursal.get('SucursalControl').value;

  }

  solicitanteChange(){
    this.objsolicit = this.FormSolicitante.get('SolicitanteControl').value;

  }

  reclutadorChange(){
    this.objrecluta = this.FormReclutador.get('ReclutadorControl').value;

  }

  estatusChange(){
    this.objstatus = this.FormEstatus.get('EstatusControl').value;
  }

  cordinaChange(){
    this.objtipocordi = this.FormCordina.get('CordinaControl').value;
  }

  tiporeclutaChange(){
    this.objtiporeclu = this.FormTipoReclu.get('TiporecluControl').value;
  }


  UsuarioCorChange(){
    this.objusercoo = this.FormUserCor.get('UserCorControl').value;
    
  }

  EstadoChange(){
    this.objestado = this.FormEstado.get('EstadoControl').value;
    console.log(this.ListaEstado)
  }

  

 Ocultar(){
  document.getElementById('DivReportefil').classList.add('ocultar');
  document.getElementById('Divprincipal').classList.add('ocultar');
  document.getElementById('DivProacti').classList.add('ocultar');
  document.getElementById('DivDetalleReclu').classList.add('ocultar');
  document.getElementById('DivDetalleCordi').classList.add('ocultar');
  document.getElementById('DivCoordinacion').classList.add('ocultar');
  document.getElementById('DivCandidato').classList.add('ocultar');


  document.getElementById('report1').classList.add('ocultar');
  document.getElementById('repProActi').classList.add('ocultar');
  document.getElementById('report2').classList.add('ocultar');
  document.getElementById('exel2').classList.add('ocultar');
  document.getElementById('exel1').classList.add('ocultar');
  document.getElementById('exelProact').classList.add('ocultar');
  document.getElementById('repDetalleReclu').classList.add('ocultar');
  document.getElementById('exelDetalleReclu').classList.add('ocultar');
  document.getElementById('repDetalleCordina').classList.add('ocultar');
  document.getElementById('exelDetalleCordi').classList.add('ocultar');
  document.getElementById('repCoordinacion').classList.add('ocultar');
  document.getElementById('exelCoordinacion').classList.add('ocultar');
  document.getElementById('repCandidato').classList.add('ocultar');
  document.getElementById('exelCandidato').classList.add('ocultar');


  document.getElementById('divBusCoordina2').classList.add('ocultar');
  document.getElementById('divreclutador').classList.remove('ocultar');
  document.getElementById('divestatus2').classList.add('ocultar');
  document.getElementById('divEstado').classList.add('ocultar');
  document.getElementById('divEdad').classList.add('ocultar');
  document.getElementById('divgenero').classList.add('ocultar');

  let tipo = document.getElementById('TipoReporte')['value'];
  if(tipo == 3){
    document.getElementById('report2').classList.remove('ocultar');
    document.getElementById('exel2').classList.remove('ocultar');
  }else if(tipo == 4){
    document.getElementById('repProActi').classList.remove('ocultar');
    document.getElementById('exelProact').classList.remove('ocultar');
  }else if(tipo == 5){
    document.getElementById('repDetalleReclu').classList.remove('ocultar');
    document.getElementById('exelDetalleReclu').classList.remove('ocultar');
  }else if(tipo == 6){
    document.getElementById('repDetalleCordina').classList.remove('ocultar');
    document.getElementById('exelDetalleCordi').classList.remove('ocultar');
  }else if(tipo == 7){
    document.getElementById('repCoordinacion').classList.remove('ocultar');
    document.getElementById('exelCoordinacion').classList.remove('ocultar');
  }else if(tipo == 8){
    document.getElementById('repCandidato').classList.remove('ocultar');
    document.getElementById('exelCandidato').classList.remove('ocultar');

  }else{
    document.getElementById('report1').classList.remove('ocultar');
    document.getElementById('exel1').classList.remove('ocultar');
  }

  if(tipo == 4 || tipo == 5){
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    // document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
  }else if(tipo == 6){
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    // document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divBusCoordina2').classList.remove('ocultar');
  }else if(tipo == 7){
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    document.getElementById('divestatus2').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divBusCoordina2').classList.add('ocultar');
  }else if(tipo == 8){
    document.getElementById('divEstado').classList.remove('ocultar');
    document.getElementById('divEdad').classList.remove('ocultar');
    document.getElementById('divgenero').classList.remove('ocultar');
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    document.getElementById('divestatus2').classList.add('ocultar');
    document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divBusCoordina2').classList.add('ocultar');
  }else{
    document.getElementById('divTipoReclu').classList.remove('ocultar');
    document.getElementById('divestatus').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.remove('ocultar');
    document.getElementById('divSolicitante').classList.remove('ocultar');
    document.getElementById('divBusCoordina').classList.remove('ocultar');
    document.getElementById('divEmpresas').classList.remove('ocultar');
    document.getElementById('divSucursal').classList.remove('ocultar');
  }
 

 }




  date2 = new FormControl(this.myDate);


}
