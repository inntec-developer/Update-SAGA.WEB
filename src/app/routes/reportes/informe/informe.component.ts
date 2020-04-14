import { CandidatobolsaComponent } from './../candidatobolsa/candidatobolsa.component';
import { TablaReporteComponent } from './../tabla-reporte/tabla-reporte.component';
import { Reporte70Component } from './../../../components/reporte70/reporte70.component';

import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOption} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../core/settings/settings.service';

declare var jQuery: any;
declare var $: any;

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers: [ReportesService,
    // {provide: MAT_DATE_LOCALE, useValue: 'es'},
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class InformeComponent implements OnInit {
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('allSelectedCoord') private allSelectedCoord: MatOption;
  @ViewChild('allSelectedSucursal') private allSelectedSucursal: MatOption;
  @ViewChild('allSelectedSolicitante') private allSelectedSolicitante: MatOption;
  @ViewChild('allSelectedEmpresa') private allSelectedEmpresa: MatOption;
  @ViewChild('allSelectedEmpresa2') private allSelectedEmpresa2: MatOption;
  @ViewChild('allSelectedEstado') private allSelectedEstado: MatOption;
  @ViewChild('allSelectedCoordinador') private allSelectedCoordinador: MatOption;
  @ViewChild('allSelectedCoordinador2') private allSelectedCoordinador2: MatOption;
  @ViewChild('allSelectedReclutador') private allSelectedReclutador: MatOption;
  @ViewChild('allSelectedEstatus') private allSelectedEstatus: MatOption;

  @ViewChild('hijo') hijo: TablaReporteComponent;
  @ViewChild('ReGeneral') ReGeneral: Reporte70Component;
  @ViewChild('candidatos') candidatos: CandidatobolsaComponent;
  edadFiltro = 0;
  generoFiltro = 0;
  public tipoReporte: any;
  public TipoUsuario: any;
  public value: any;
  public Empresas: any = [];
  public Clientes: any = [];
  public Estatus: any = [];
  public Usuario: any = [];
  public Oficina: any = [];
  public objsucursal: any = [];
  public objempresa: any = [];
  public objsolicit: any = [];
  public objrecluta: any = [];
  public objstatus: any = [];
  public objtipocordi: any = [];
  public objtiporeclu: any = [];
  public objusercoo: any = [];
  public objestado: any = [];
  public UsuarioCor: any = [];
  public filteredUsuarioCoor = [];
  public UsuarioSol: any = [];
  public filteredUsuarioSol = [];
  public ListaEstado: any = [];

  public reclutaList: any = [];
  public coordinaList: any = [];

  public EstatusGeneral: any;

  public FormEmpresas: FormGroup;
  public FormSucursal: FormGroup;
  public FormSolicitante: FormGroup;
  public FormReclutador: FormGroup;
  public FormEstatus: FormGroup;
  public FormCoordinacion: FormGroup;
  public FormTipoReclu: FormGroup;
  public FormUserCor: FormGroup;
  public FormEstado: FormGroup;

  public myDate: any = new Date();
  date = new FormControl(new Date());
  date2 = new FormControl(new Date());
  date3 = new FormControl(new Date());

  catalogoReportes = [
    { value: 1, nombre: 'Por Solicitud'},
    { value: 2, nombre: 'Por Estatus'},
    { value: 3, nombre: 'General'},
    { value: 4, nombre: 'Candidato Bolsa' },
  ];
    // { value: 4, nombre: 'Productividad Cubiertos'},
    // { value: 5, nombre: 'Cumplimiento' },
    // { value: 6, nombre: 'Detalle Coordinador' },
    // { value: 7, nombre: 'Coordinacion' },
    // { value: 8, nombre: 'Candidato Bolsa' },
    // { value: 9, nombre: 'Vacantes' },
    // { value: 10, nombre: 'Clientes' },
    // { value: 11, nombre: 'Cubiertos' }];

  public filteredClientes = [];
  public filteredClientes2 = [];
  filteredUsuario = [];

  constructor(
    private Rutas: ActivatedRoute,
    private Servicio: ReportesService,
    private route: ActivatedRoute,
    private router: Router,
    private adapter: DateAdapter<any>,
 //   private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private estados: CatalogosService,
    private settings: SettingsService
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
    this.FormCoordinacion = new FormGroup({
      CoordinaControl: new FormControl({ value: '', disabled: false })
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
    this.TipoUsuario = this.settings.user['tipoUsuarioId'];
    this.tipoReporte = 1;
    // if(this.TipoUsuario === 11){
    //   document.getElementById('divreclutador').classList.add('ocultar');
    //   document.getElementById('DivdivReclu').classList.remove('ocultar');
    // }
    // let date = new Date();
    // console.log("fecha: "+ date.getDate() +"-"+ date.getMonth());
    // console.log("fecha: "+ (date.setDate(date.getDate() + 1)).toString());
    this.adapter.setLocale('es');
    this.coordinaList = [
      {id: 1, nombre: 'Especializado'},
      {id: 2, nombre: 'Operativo'},
      {id: 3, nombre: 'Masivo'}];

    this.reclutaList = [
       {id: 1, nombre: 'Reclutamiento Puro'},
       {id: 2, nombre: 'Subcontratación'},
       {id: 3, nombre: 'Staff'}];

    this.Servicio.GetEmpresas().subscribe(item => {
      this.Empresas = item;
      this.Clientes = item;

      this.filterClientes('');
      this.filterClientes2('');
      this.date2 = new FormControl(item[0].fechal);
     document.getElementById('fechaInicial')['value'] = this.ConvierteFecha(item[0].fechal);
      this.Oficina = [
        {id: 1, nombre: 'Guadalajara'},
        {id: 2, nombre: 'México'},
        {id: 3, nombre: 'Monterrey'}];
    });

    // this.Servicio.GetEmpresas().subscribe(item => {
    //   this.Clientes = item;
    //   this.filterClientes('');
    // });

    this.Servicio.GetEstatusRep('').subscribe(item => {
      this.Estatus = item;
    });

    this.Servicio.GetEstatusRep('2').subscribe(item => {
      this.EstatusGeneral = [{nombre: 'Activos', pieza: item.activos},
      {nombre: 'Cubiertos', pieza: item.cubiertos},
      {nombre: 'Otros', pieza: item.otros }];
    });

    this.Servicio.GetUsuario('0').subscribe(item => {
      this.Usuario = item;
      this.filterUsuario('', 0);
    });

    this.Servicio.GetUsuario('1').subscribe(item => {
      this.UsuarioCor = item;
      this.filterUsuario('', 1);
    });

    this.Servicio.GetUsuario('2').subscribe(item => {
      this.UsuarioSol = item;
      this.filterUsuario('', 2);
    });
    this.GenerarEstados();

    document.oncontextmenu = null;
  }
  tipoReporteChange() {
    this.hijo.requisiciones = [];
    this.ReGeneral.requisiciones = [];
  }
  GenerarReporte() {
    if (this.tipoReporte < 3) {
      this.hijo.Generar(
        this.objsucursal,
        this.objsolicit,
        this.objrecluta,
        this.objempresa,
        this.objstatus,
        this.objtiporeclu,
        this.objtipocordi,
        this.objusercoo);
    } else if (this.tipoReporte === 4) {
      this.candidatos.Generar(this.objestado, this.objstatus);
    } else {
      this.ReGeneral.llamado(
        this.objsucursal,
        this.objsolicit,
        this.objrecluta,
        this.objempresa,
        this.objstatus,
        this.objtiporeclu,
        this.objtipocordi,
        this.objusercoo);
    }
  }

  ExportarReporte() {
    if (this.tipoReporte < 3) {
      this.hijo.Exportar();
    } else if (this.tipoReporte === 4) {
      this.candidatos.Exportar();
    } else {
      this.ReGeneral.exportAsXLSX();
    }
  }
  filterClientes(data: any) {

    if (!this.Clientes || data === '') {
      this.filteredClientes = this.Clientes;
      return;
    }

    const search = data;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'nombrecomercial' }];

    this.Clientes.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(search.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    this.filteredClientes = tempArray;
  }
  filterClientes2(data: any) {
    if (!this.Empresas || data === '') {
      this.filteredClientes2 = this.Empresas;
      return;
    }

    const search = data;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'nombrecomercial' }];

    this.Empresas.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(search.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    this.filteredClientes2 = tempArray;
  }

  filterUsuario(data: any, tipo) {
    if (data === '') {
      if (tipo === 2) {
        this.filteredUsuarioSol = this.UsuarioSol;
      } else if (tipo === 1) {
        this.filteredUsuarioCoor = this.UsuarioCor;
      } else {
        this.filteredUsuario = this.Usuario;
      }
      return;
    }

    const search = data;
    const tempArray: Array<any> = [];
    let aux: Array<any> = [];

    if (tipo === 2) {
      aux = this.UsuarioSol;
    } else if (tipo === 1) {
      aux = this.UsuarioCor;
    } else {
      aux = this.Usuario;
    }

    const colFiltar: Array<any> = [{ title: 'nombre' }];

    aux.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(search.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });

    if (tipo === 2) {
      this.filteredUsuarioSol = tempArray;
    } else if (tipo === 1) {
      this.filteredUsuarioCoor = tempArray;
    } else {
      this.filteredUsuario = tempArray;
    }

  }
  ConvierteFecha(dateTime) {
    if (dateTime !== undefined) {
      const res = dateTime.substring(0, 10);
    //  var result = Date.parse(res);
      const date = res.split('-');
      const yyyy = date[0];
      const mm = date[1];
      const dd = date[2];
      const fecha = dd + '/' + mm + '/' + yyyy;
      return (fecha);
    }
  }

GenerarEstados() {
  this.estados.getEstado(42).subscribe(item => {
    this.ListaEstado = item;
  });
}

  GeneraEstatusBolsa() {
    this.Servicio.GetEstatusRep('1').subscribe(item => {
      this.Estatus = item;
    });
  }
  empresaChange() {
    this.objempresa = this.FormEmpresas.get('ClientesControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionEmpresa() {
    if (this.allSelectedEmpresa.selected) {
      this.FormEmpresas.controls.ClientesControl
        .patchValue([...this.Empresas.map(item => item.id), 0]);
    } else {
      this.FormEmpresas.controls.ClientesControl.patchValue([]);
    }
    this.objempresa = this.FormEmpresas.get('ClientesControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionEmpresa2() {
    if (this.allSelectedEmpresa2.selected) {
      this.FormEmpresas.controls.ClientesControl
        .patchValue([...this.Empresas.map(item => item.id), 0]);
    } else {
      this.FormEmpresas.controls.ClientesControl.patchValue([]);
    }
    this.objempresa = this.FormEmpresas.get('ClientesControl').value.filter(x => x !== 0);
  }
  sucursalChange() {
    this.objsucursal = this.FormSucursal.get('SucursalControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionSucursal() {
    if (this.allSelectedSucursal.selected) {
      this.FormSucursal.controls.SucursalControl
      .patchValue([...this.Oficina.map(item => item.id), 0]);
    } else {
      this.FormSucursal.controls.SucursalControl.patchValue([]);
    }
    this.objsucursal = this.FormSucursal.get('SucursalControl').value.filter(x => x !== 0);
  }
  solicitanteChange() {
    this.objsolicit = this.FormSolicitante.get('SolicitanteControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionSolicitante() {
    if (this.allSelectedSolicitante.selected) {
      this.FormSolicitante.controls.SolicitanteControl
      .patchValue([...this.UsuarioSol.map(item => item.id), 0]);
    } else {
      this.FormSolicitante.controls.SolicitanteControl.patchValue([]);
    }
    this.objsolicit = this.FormSolicitante.get('SolicitanteControl').value.filter(x => x !== 0);
  }
  reclutadorChange() {
    this.objrecluta = this.FormReclutador.get('ReclutadorControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionReclutador() {
    if (this.allSelectedReclutador.selected) {
      this.FormReclutador.controls.ReclutadorControl
      .patchValue([...this.Usuario.map(item => item.id), 0]);
    } else {
      this.FormReclutador.controls.ReclutadorControl.patchValue([]);
    }
    this.objrecluta = this.FormReclutador.get('ReclutadorControl').value.filter(x => x !== 0);
  }
  estatusChange() {
    this.objstatus = this.FormEstatus.get('EstatusControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionEstatus() {
    if (this.allSelectedEstatus.selected) {
      this.FormEstatus.controls.EstatusControl
      .patchValue([...this.Estatus.map(item => item.id), 0]);
    } else {
      this.FormEstatus.controls.EstatusControl.patchValue([]);
    }
    this.objstatus = this.FormEstatus.get('EstatusControl').value.filter(x => x !== 0);
  }
  coordinaChange() {
    this.objtipocordi = this.FormCoordinacion.get('CoordinaControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionCoord() {
    if (this.allSelectedCoord.selected) {
      this.FormCoordinacion.controls.CoordinaControl
      .patchValue([...this.coordinaList.map(item => item.id), 0]);
    } else {
      this.FormCoordinacion.controls.CoordinaControl.patchValue([]);
    }
    this.objtipocordi = this.FormCoordinacion.get('CoordinaControl').value.filter(x => x !== 0);
  }

  tiporeclutaChange() {
    this.objtiporeclu = this.FormTipoReclu.get('TiporecluControl').value.filter(x => x !== 0);
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.FormTipoReclu.controls.TiporecluControl
      .patchValue([...this.reclutaList.map(item => item.id), 0]);
    } else {
      this.FormTipoReclu.controls.TiporecluControl.patchValue([]);
    }
    this.objtiporeclu = this.FormTipoReclu.get('TiporecluControl').value.filter(x => x !== 0);
  }
  UsuarioCoordChange() {
    this.objusercoo = this.FormUserCor.get('UserCorControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionCoordinador() {
    if (this.allSelectedCoordinador.selected) {
      this.FormUserCor.controls.UserCorControl
      .patchValue([...this.UsuarioCor.map(item => item.id), 0]);
    } else {
      this.FormUserCor.controls.UserCorControl.patchValue([]);
    }
    this.objusercoo = this.FormUserCor.get('UserCorControl').value.filter(x => x !== 0);
  }
  // toggleAllSelectionCoordinador2() {
  //   if (this.allSelectedCoordinador2.selected) {
  //     this.FormUserCor.controls.UserCorControl
  //     .patchValue([...this.UsuarioCor.map(item => item.id), 0]);
  //   } else {
  //     this.FormUserCor.controls.UserCorControl.patchValue([]);
  //   }
  //   this.objusercoo = this.FormUserCor.get('UserCorControl').value.filter(x => x !== 0);
  // }
  EstadoChange() {
    this.objestado = this.FormEstado.get('EstadoControl').value.filter(x => x !== 0);
  }
  toggleAllSelectionEstado() {
    if (this.allSelectedEstado.selected) {
      this.FormEstado.controls.EstadoControl
        .patchValue([...this.ListaEstado.map(item => item.id), 0]);
    } else {
      this.FormEstado.controls.EstadoControl.patchValue([]);
    }
    this.objestado = this.FormEstado.get('EstadoControl').value.filter(x => x !== 0);
  }

  PruebaEstatus(evento) {
    this.objstatus = evento;
  }
  ActivaCheck(valor) {
    if (valor === 'Activos') {
     let stus4 = document.querySelectorAll("[name='namee4']")[0].id;
     document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee6']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee7']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee29']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee30']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee31']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee32']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee33']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee38']")[0].id;
      document.getElementById(stus4).click();
      stus4 = document.querySelectorAll("[name='namee39']")[0].id;
      document.getElementById(stus4).click();

    } else if (valor === 'Cubiertos') {
      var stus4 = document.querySelectorAll("[name='namee34']")[0].id
      document.getElementById(stus4).click()
       stus4 = document.querySelectorAll("[name='namee35']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee36']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee37']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee47']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee48']")[0].id;
       document.getElementById(stus4).click();

    }else{

      var stus4 = document.querySelectorAll("[name='namee8']")[0].id
      document.getElementById(stus4).click()
       stus4 = document.querySelectorAll("[name='namee9']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee43']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee44']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee45']")[0].id;
       document.getElementById(stus4).click();
       stus4 = document.querySelectorAll("[name='namee46']")[0].id;
       document.getElementById(stus4).click();
    }
  }

  llamarCubi() {
    let num = $("[name='Cate_Cubiertos']").find('.mat-pseudo-checkbox-checked').length;
    if(num == 0){
      var elemento = document.querySelectorAll("[name='Cate_Cubiertos']")[0].id;
      document.getElementById(elemento).click();
    }
    setTimeout(()=>{    
     $(".cdk-overlay-backdrop").click();
              }, 200);
  }

  quitarselec(){
    let num = $("[name='Cate_Cubiertos']").find('.mat-pseudo-checkbox-checked').length
    if(num == 1){
      var elemento = document.querySelectorAll("[name='Cate_Cubiertos']")[0].id;
      document.getElementById(elemento).click();
    }
    setTimeout(()=>{    
     $(".cdk-overlay-backdrop").click();
              }, 200);
  }

  OcultarCliente() {
    const tipo = document.getElementById('TipoRcliente')['value'];
    // document.getElementById('btnGraficaCliente').classList.add('ocultar');
    document.getElementById('DivClientes').classList.add('ocultar');
    document.getElementById('DivClienteDetalle').classList.add('ocultar');
    document.getElementById('DivGraficaCliente').classList.add('ocultar');
    document.getElementById('repCliente').classList.add('ocultar');
    document.getElementById('exelCliente').classList.add('ocultar');
    document.getElementById('repClienteDetalle').classList.add('ocultar');
    document.getElementById('exelClienteDetalle').classList.add('ocultar');
    document.getElementById('divFechafinal').classList.add('ocultar');
    document.getElementById('divFechaInicial').classList.add('ocultar');
    // document.getElementById('DivdivReclu').classList.add('ocultar');
    if (tipo === 1) {
      document.getElementById('DivClientes').classList.remove('ocultar');
      // document.getElementById('btnGraficaCliente').classList.remove('ocultar');
      document.getElementById('divFechafinal').classList.remove('ocultar');
      document.getElementById('divFechaInicial').classList.remove('ocultar');
      document.getElementById('repCliente').classList.remove('ocultar');
      document.getElementById('exelCliente').classList.remove('ocultar');
      document.getElementById('DivGraficaCliente').classList.remove('ocultar');
    } else if (tipo === 2) {
      document.getElementById('DivClienteDetalle').classList.remove('ocultar');
      // document.getElementById('DivdivReclu').classList.remove('ocultar');
      document.getElementById('repClienteDetalle').classList.remove('ocultar');
      document.getElementById('exelClienteDetalle').classList.remove('ocultar');
    } else if (tipo === 3) {
      document.getElementById('DivClienteDetalle').classList.remove('ocultar');
      // document.getElementById('DivdivReclu').classList.remove('ocultar');
      document.getElementById('repClienteDetalle').classList.remove('ocultar');
      document.getElementById('exelClienteDetalle').classList.remove('ocultar');
    }
  }

 Ocultar(tiporeporte) {

this.tipoReporte = tiporeporte;
this.hijo.General = [];
this.ReGeneral.requisiciones = [];

  // const tiporeporte = $("#TipoReporte").val();
  if (tiporeporte === 11) {
    $("[name='estatuSelect']").click();

    setTimeout(() => {
      this.llamarCubi();
              }, 100);
  }

  document.getElementById('DivReportefil').classList.add('ocultar');
  document.getElementById('Divprincipal').classList.add('ocultar');
  document.getElementById('DivProacti').classList.add('ocultar');
  document.getElementById('DivDetalleReclu').classList.add('ocultar');
  document.getElementById('DivDetalleCordi').classList.add('ocultar');
  document.getElementById('DivCoordinacion').classList.add('ocultar');
  document.getElementById('DivCandidato').classList.add('ocultar');
  document.getElementById('DivVacante').classList.add('ocultar');
  document.getElementById('DivGraficaVacante').classList.add('ocultar');
  document.getElementById('DivClientes').classList.add('ocultar');
  document.getElementById('DivClienteDetalle').classList.add('ocultar');
  document.getElementById('DivCubiertoReport').classList.add('ocultar');
  document.getElementById('DivGraficaCordina').classList.add('ocultar');
  document.getElementById('DivGraficaCliente').classList.add('ocultar');

  // document.getElementById('DivBotones').classList.remove('botones');
  // document.getElementById('report1').classList.add('ocultar');
  // document.getElementById('repProActi').classList.add('ocultar');
  // document.getElementById('report2').classList.add('ocultar');
  // document.getElementById('exel2').classList.add('ocultar');
  // document.getElementById('exel1').classList.add('ocultar');
  // document.getElementById('exelProact').classList.add('ocultar');
  // document.getElementById('repDetalleReclu').classList.add('ocultar');
  // document.getElementById('exelDetalleReclu').classList.add('ocultar');
  // document.getElementById('repDetalleCordina').classList.add('ocultar');
  // document.getElementById('exelDetalleCordi').classList.add('ocultar');
  // document.getElementById('repCoordinacion').classList.add('ocultar');
  // document.getElementById('exelCoordinacion').classList.add('ocultar');
  // document.getElementById('repCandidato').classList.add('ocultar');
  // document.getElementById('exelCandidato').classList.add('ocultar');
  // document.getElementById('repVacante').classList.add('ocultar');
  // document.getElementById('exelVacante').classList.add('ocultar');
  // document.getElementById('repCliente').classList.add('ocultar');
  // document.getElementById('exelCliente').classList.add('ocultar');
  // document.getElementById('repClienteDetalle').classList.add('ocultar');
  // document.getElementById('exelClienteDetalle').classList.add('ocultar');
  // document.getElementById('repCubierto').classList.add('ocultar');
  // document.getElementById('exelCubierto').classList.add('ocultar');
  // document.getElementById('btnGraficaCordina').classList.add('ocultar');

  // document.getElementById('btnGraficaVacante').classList.add('ocultar');
  // document.getElementById('btnGraficaCliente').classList.add('ocultar');

  // document.getElementById('DivdivReclu').classList.add('ocultar');
  // document.getElementById('divBusCoordina2').classList.add('ocultar');
  document.getElementById('divreclutador').classList.remove('ocultar');
  document.getElementById('divestatus2').classList.add('ocultar');
  document.getElementById('divEstado').classList.add('ocultar');
  document.getElementById('divEdad').classList.add('ocultar');
  document.getElementById('divgenero').classList.add('ocultar');
  // document.getElementById('Divdiv').classList.remove('ocultar');
  document.getElementById('Divdiv3').classList.add('ocultar');
  document.getElementById('divcordinacion').classList.add('ocultar');
  document.getElementById('divSolicitante').classList.add('ocultar');
  document.getElementById('divEmpresas').classList.add('ocultar');
  document.getElementById('divSucursal').classList.add('ocultar');
  document.getElementById('divBusCoordina').classList.add('ocultar');
  // document.getElementById('divBusCoordina2').classList.add('ocultar');
  document.getElementById('divEmpresas2').classList.add('ocultar');
  document.getElementById('divFechafinal').classList.remove('ocultar');
  document.getElementById('divFechaInicial').classList.remove('ocultar');
  document.getElementById('Divdivbusca').classList.remove('ocultar');

  // let tipo = document.getElementById('TipoReporte')['value'];

  // if (tiporeporte === 3) {
  //   document.getElementById('report2').classList.remove('ocultar');
  //   document.getElementById('exel1').classList.remove('ocultar');
  // } else if (tiporeporte === 4) {
  //   document.getElementById('repProActi').classList.remove('ocultar');
  //   document.getElementById('exelProact').classList.remove('ocultar');
  // } else if (tiporeporte === 5) {
  //   document.getElementById('repDetalleReclu').classList.remove('ocultar');
  //   document.getElementById('exelDetalleReclu').classList.remove('ocultar');
  // } else if (tiporeporte === 6) {
  //   document.getElementById('repDetalleCordina').classList.remove('ocultar');
  //   document.getElementById('exelDetalleCordi').classList.remove('ocultar');
  // } else if (tiporeporte === 7) {
  //   document.getElementById('repCoordinacion').classList.remove('ocultar');
  //   document.getElementById('exelCoordinacion').classList.remove('ocultar');
  //   document.getElementById('btnGraficaCordina').classList.remove('ocultar');
  // } else if (tiporeporte === 8) {
  //   document.getElementById('repCandidato').classList.remove('ocultar');
  //   document.getElementById('exelCandidato').classList.remove('ocultar');
  //   this.GeneraEstatusBolsa();
  // } else if (tiporeporte === 9) {
  //   document.getElementById('repVacante').classList.remove('ocultar');
  //   document.getElementById('exelVacante').classList.remove('ocultar');
  //   document.getElementById('btnGraficaVacante').classList.remove('ocultar');
  // } else if (tiporeporte === 10) {
  //   // document.getElementById('DivBotones').classList.add('botones');
  //   document.getElementById('repCliente').classList.remove('ocultar');
  //   document.getElementById('exelCliente').classList.remove('ocultar');
  //   document.getElementById('btnGraficaCliente').classList.remove('ocultar');
  //   document.getElementById('Divdiv3').classList.remove('ocultar');
  //   document.getElementById('Divdivbusca').classList.add('ocultar');
  //   // document.getElementById('Divdiv').classList.add('ocultar');
  // } else if (tiporeporte === 11) {
  //   document.getElementById('repCubierto').classList.remove('ocultar');
  //   document.getElementById('exelCubierto').classList.remove('ocultar');
  // } else {
  //   document.getElementById('report1').classList.remove('ocultar');
  //   document.getElementById('exel2').classList.remove('ocultar');
  // }
  if (tiporeporte === 4 || tiporeporte === 5) {
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    // document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
  } else if (tiporeporte === 6) {
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    // document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    // document.getElementById('divBusCoordina2').classList.remove('ocultar');
  } else if (tiporeporte === 7) {
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    document.getElementById('divestatus2').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    // document.getElementById('divBusCoordina2').classList.add('ocultar');

  } else if (tiporeporte === 8) {
    // document.getElementById('Divdiv').classList.add('ocultar');
    document.getElementById('divEstado').classList.remove('ocultar');
    document.getElementById('divEdad').classList.remove('ocultar');
    document.getElementById('divgenero').classList.remove('ocultar');
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
    document.getElementById('divestatus2').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.add('ocultar');
    document.getElementById('divSolicitante').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divEmpresas').classList.add('ocultar');
    document.getElementById('divSucursal').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    // document.getElementById('divBusCoordina2').classList.add('ocultar');
  } else if (tiporeporte === 9) {
    document.getElementById('divEmpresas2').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.remove('ocultar');
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divFechafinal').classList.add('ocultar');
    document.getElementById('divFechaInicial').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
  } else if (tiporeporte === 10) {
    document.getElementById('divTipoReclu').classList.add('ocultar');
    document.getElementById('divBusCoordina').classList.add('ocultar');
    document.getElementById('divreclutador').classList.add('ocultar');
    document.getElementById('divestatus').classList.add('ocultar');
  } else {
    document.getElementById('divTipoReclu').classList.remove('ocultar');
    document.getElementById('divestatus').classList.remove('ocultar');
    document.getElementById('divcordinacion').classList.remove('ocultar');
    document.getElementById('divSolicitante').classList.remove('ocultar');
    document.getElementById('divBusCoordina').classList.remove('ocultar');
    document.getElementById('divEmpresas').classList.remove('ocultar');
    document.getElementById('divSucursal').classList.remove('ocultar');
  }

  if (this.TipoUsuario === 11) {
    document.getElementById('divreclutador').classList.add('ocultar');
  }

 }

 CordinacionOcul() {
  document.getElementById('DivGraficaCordina').classList.remove('ocultar');
  document.getElementById('DivCoordinacion').classList.add('ocultar');
 }

 limpiarFiltros() {
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
  this.FormCoordinacion = new FormGroup({
    CoordinaControl: new FormControl({ value: '', disabled: false })
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

  this.date = new FormControl(new Date());
  this.date2 = new FormControl(new Date());
  this.date3 = new FormControl(new Date());

  this.tipoReporte = 1;

  this.objsucursal = [];
  this.objempresa = [];
  this.objsolicit = [];
  this.objrecluta = [];
  this.objstatus = [];
  this.objtipocordi = [];
  this.objtiporeclu = [];
  this.objusercoo = [];
  this.objestado = [];

  // this.Ocultar(0);
 }
}
