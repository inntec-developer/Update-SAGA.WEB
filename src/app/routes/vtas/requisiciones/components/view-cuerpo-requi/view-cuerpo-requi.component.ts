import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
//Services
import { CatalogosService, RequisicionesService } from '../../../../../service/index';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatTableDataSource, PageEvent} from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-cuerpo-requi',
  templateUrl: './view-cuerpo-requi.component.html',
  styleUrls: ['./view-cuerpo-requi.component.scss'],
  providers: [RequisicionesService, CatalogosService]
})
export class ViewCuerpoRequiComponent implements OnInit, AfterContentChecked {
  @Input() Requisicion: string;
  public formCliente : FormGroup;
  public formRecl : FormGroup;
  public formContrato : FormGroup;
  public formPerfil : FormGroup;
  public formSueldo : FormGroup;
  public requiId: string;
  public requisicion: any[];
  public checked : boolean = false;
  sueldoMinimo: any;
  sueldoSemanalMin: number;
  sueldoDiarioMin: number;
  sueldoMaximo: number;
  sueldoDiarioMax: number;
  sueldoSemanalMax: number;

  constructor(
    private serviceRequisiciones: RequisicionesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.formCliente = this.fb.group({
      nombrecomercial: [{value: '', disabled:true}],
      razonSocial: [{value: '', disabled:true}],
      rfc: [{value: '', disabled:true}],
      giroEmpresa: [{value: '', disabled:true}],
      actividadEmpresas: [{value: '', disabled:true}]
    });

    this.formRecl = this.fb.group({
      tipo: [{value:'', disabled:true}],
      clase: [{value:'', disabled:true}]
    });

    this.formContrato = this.fb.group({
      tipoContrato: [{value:'', disabled:true}],
      diasPrueba: [{value:'',disabled:true}]
    });

    this.formPerfil = this.fb.group({
      vBtra:[{value: '', disabled:true}],
      edadMinima:[{value: '', disabled:true}],
      edadMaxima:[{value: '', disabled:true}],
      genero:[{value: '', disabled:true}],
      estadoCivil:[{value: '', disabled:true}],
    });

    this.formSueldo = this.fb.group({
      diaCorte: [{value:'', disabled:true}],
      tipoNomina: [{value:'', disabled:true}],
      diaPago: [{value:'', disabled:true}],
      periodoPago: [{value:'', disabled:true}],
      especifique: [{value:'', disabled:true}],
    });

  }

  ngAfterContentChecked(){
    if(this.Requisicion != null && this.checked == false ){
      this.checked=true;
      this.GetDataRequi();
    }
  }

  GetDataRequi(){
    this.spinner.show();
    this.requiId = this.Requisicion;
    this.serviceRequisiciones.getNewRequi(this.requiId)
      .subscribe(data => {
        console.log('Data:  ', data)
        this.formCliente.patchValue({
          nombrecomercial: data.cliente.nombrecomercial,
          razonSocial: data.cliente.razonSocial,
          rfc: data.cliente.rfc,
          giroEmpresa: data.cliente.giroEmpresas.giroEmpresa,
          actividadEmpresas: data.cliente.actividadEmpresas.actividadEmpresa
        });
        this.formRecl.patchValue({
          tipo: data.tipoReclutamiento.tipoReclutamiento,
          clase: data.claseReclutamiento.clasesReclutamiento
        });
        this.formContrato.patchValue({
          tipoContrato: data.contratoInicial.tipoContrato,
        });
        if(data.contratoInicial.periodoPrueba){
          this.formContrato.patchValue({
            diasPrueba: data.tiempoContrato.tiempo
          });
  
        }
        this.formPerfil.patchValue({
          vBtra: data.vBtra,
          edadMinima: data.edadMinima,
          edadMaxima: data.edadMaxima,
          genero: data.genero.genero,
          estadoCivil: data.estadoCivil.estadoCivil
        });

        this.formSueldo.patchValue({
          diaCorte: data.diaCorte.diaSemana,
          tipoNomina: data.tipoNomina.tipoDeNomina,
          diaPago: data.diaPago.diaSemana,
          periodoPago: data.periodoPago.periodoPago,
          especifique: data.especifique
        });
        // Sueldos Minimos 
        this.sueldoMinimo = parseFloat(data.sueldoMinimo);
        this.sueldoDiarioMin = this.sueldoMinimo / 30;
        this.sueldoSemanalMin = this.sueldoDiarioMin * 7; 
        // Sueldos Maximos
        this.sueldoMaximo = parseFloat(data.sueldoMaximo);
        this.sueldoDiarioMax = this.sueldoMaximo / 30;
        this.sueldoSemanalMax = this.sueldoDiarioMax * 7; 
        this.requisicion = data;
        this.spinner.hide();
      });
    }
}