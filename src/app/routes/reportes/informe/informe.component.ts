import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import {ToasterConfig, ToasterService} from 'angular2-toaster';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ReportesService } from '../../../service/Reporte/reportes.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConection } from '../../../service/api-conection.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers:[ReportesService],
})
export class InformeComponent implements OnInit {
  public Empresas : any[];
  public Estatus : any[];
  public Usuario : any[];
  public Oficina : any[];
  public objsucursal : any[];
  public objempresa : any[];
  public objsolicit : any[];
  public objrecluta : any[];
  public objstatus : any[];

  public FormEmpresas: FormGroup;
  public FormSucursal: FormGroup;
  public FormSolicitante: FormGroup;
  public FormReclutador: FormGroup;
  public FormEstatus: FormGroup;

  public myDate: any = new Date();
  public dia: any = this.myDate.getDate();
  public mes: any = this.myDate.getMonth();
  public ano: any = this.myDate.getFullYear();

  constructor(
    private Rutas: ActivatedRoute,
    private Servicio: ReportesService,
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
 //   private toasterService: ToasterService,
    private spinner: NgxSpinnerService
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

   }

  ngOnInit() {
    this.Servicio.GetEmpresas().subscribe(item =>{
      this.Empresas = item;
      this.Oficina = [{id:0,nombre:'Todas las Sucursales'},
      {id:1,nombre:'Guadalajara'},{id:2,nombre:'México'},{id:3,nombre:'Monterrey'}]
    })

    this.Servicio.GetEstatusRep().subscribe(item =>{
      this.Estatus = item;
    })

    this.Servicio.GetUsuario().subscribe(item =>{
      this.Usuario = item;
    })
  }

  empresaChange(obj) {
     this.objempresa = this.FormEmpresas.get('ClientesControl').value;
    console.log(this.objempresa);
  }

  sucursalChange(){
    this.objsucursal = this.FormSucursal.get('SucursalControl').value;
    console.log(this.objsucursal);
  }

  solicitanteChange(){
    this.objsolicit = this.FormSolicitante.get('SolicitanteControl').value;
    console.log(this.objsolicit);
  }

  reclutadorChange(){
    this.objrecluta = this.FormReclutador.get('ReclutadorControl').value;
    console.log(this.objrecluta);
  }

  estatusChange(){
    this.objstatus = this.FormEstatus.get('EstatusControl').value;
    console.log(this.objstatus);
  }

 Ocultar(){
  let tipo = document.getElementById('TipoReporte')['value'];
  if(tipo == 1){
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
  }else{
    document.getElementById('divreclutador').classList.remove('ocultar');
    document.getElementById('divestatus').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.remove('ocultar');
    document.getElementById('divSolicitante').classList.remove('ocultar');
  }

 }



}
