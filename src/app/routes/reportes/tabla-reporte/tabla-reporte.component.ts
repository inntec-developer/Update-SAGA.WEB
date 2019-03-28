import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ReportesService } from '../../../service/Reporte/reportes.service';
import { ExcelService } from '../../../service/ExcelService/excel.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConection } from '../../../service/api-conection.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-tabla-reporte',
  templateUrl: './tabla-reporte.component.html',
  styleUrls: ['./tabla-reporte.component.scss'],
  providers:[ReportesService]
})
export class TablaReporteComponent implements OnInit {
  @Input('data') valor:any;
  public General : any[];
  public palabra :string;
 
  // public objsucursal : any[];
  // public objempresa : any[];
  // public objsolicit : any[];
  // public objrecluta : any[];
  
  constructor(
    private Servicio: ReportesService,
    private Exel: ExcelService,
    private spinner: NgxSpinnerService
//    private pipe:DatePipe
  ) { }

  ngOnInit() {}

  Guardar(valor){
   
    var dato = valor;
    var p = document.getElementById('palabra');
    var palabra = p['value'];
   
  }

  Prueba(lista){
    console.log(lista);
  }


  Generar(oficina,solicitante,reclutador,empresa,estatus){
    this.spinner.show();
    
  var ofc = '';
  var sol = '';
  var rec = '';
  var emp = '';
  var est = '';

  if(oficina != undefined){
    for (let item of oficina) {
      ofc += item +',';
      console.log(ofc); // 1, "string", false
    }
  }

  if(solicitante != undefined){
    for (let item of solicitante) {
      sol += item +',';
      console.log(sol); // 1, "string", false
    }
  }

  if(reclutador != undefined){
    for (let item of reclutador) {
      rec += item +',';
      console.log(rec); // 1, "string", false
    }
  }

  if(empresa != undefined){
    for (let item of empresa) {
      emp += item +',';
      console.log(emp); // 1, "string", false
    }
  }

  if(estatus != undefined){
    for (let item of estatus) {
      est += item +',';
      console.log(est); // 1, "string", false
    }
  }

ofc = oficina == undefined?'0':ofc;
sol = solicitante == undefined?'0':sol;
rec = reclutador == undefined?'0':rec;
emp = empresa == undefined?'0':emp;
est = estatus == undefined?'0':est;


    
    let pal = document.getElementById('palabra');
 //   let est = document.getElementById('estatusR');
 //   let rec = document.getElementById('reclutadorR');
 //   let sol = document.getElementById('solicitanteR');
 //   let emp = document.getElementById('empresaR');
    let trcu = document.getElementById('tiporeclutaR');
    let coo = document.getElementById('condinacionR');
    let inc = document.getElementById('fechaInicial');
    let fin = document.getElementById('fechaFinal');
   // let ofc = document.getElementById('oficina');
   


    var palabra = pal['value'];
 //   var estatus = est['value'];
 //   var reclutado = rec['value'];
 //   var solicitante = sol['value'];
//    var empresa = emp['value'];
    var tiporecluta = trcu['value'];
    var tipocordina = coo['value'];
    var inicio = inc['value'];
    var final = fin['value'];
    let tipo = document.getElementById('TipoReporte')['value'];
    
    this.Servicio.GetInforme(palabra,ofc,tipo,inicio,final,emp,sol,tiporecluta,tipocordina,est,rec)
    .subscribe( data => {
    // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    this.General = data;
    this.spinner.hide();
    console.log(this.General)
    });
  }

  Exportar(){
    var obj = [];
    console.log(this.General)
    this.General.forEach(item => {
      obj.push({
        Folio: item.folio.toString(),
        'Solicitud ': this.convertDateTime(item.fch_Creacion),
        Empresa: item.empresa,
        Puesto : item.vBtra,
        Estado: item.estado,
        Reclutador  : item.nombreReclutado == ''?'SIN ASIGNAR':item.nombreReclutado,
        'No.'	: item.numero,
        'Cumplimiento'	: item.porcentaje + '%',
        Estatus: item.estatus,
        'Fecha estatus': this.convertDateTime(item.fch_Modificacion),
        Solicita: item.nombreApellido,
        'Coordinación ': item.clasesReclutamiento
      })
     });
     this.Exel.exportAsExcelFile(obj,'Reporte')

     
    // this.Servicio.GetInforme()
    // .subscribe( data => {
    // // this.popGenerico(data.mensaje,data.bandera,'Publicacion');
    // this.General = data;
    // console.log(this.General)
    // this.General.forEach(item => {
    //   obj.push({
    //     Folio: item.folio.toString(),
    //     Vacante: item.vBtra,
    //     'Fecha alta': this.convertDateTime(item.fch_Creacion),
    //     'Fecha limite': this.convertDateTime(item.fch_Limite),
    //     Empresa: item.empresa,
    //     Solicita: item.propietario,
    //     No	: item.numero,
    //     Estatus: item.estatus,
    //     'Fecha estatus': this.convertDateTime(item.fch_Modificacion)
    //   })
    //  });
    // this.Exel.exportAsExcelFile(obj,'Reporte')
    // });
  }

  

  convertDateTime(dateTime){
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
    
   // var date = res.split("-");
   // var yyyy = date[0];
   // var mm = date[1];
   // var dd = date[2];
 // var fecha = yyyy+'-' + mm + dd
//  return new Date(yyyy,mm,dd);
   return ('');
}

}
