import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-info-requi',
  templateUrl: './view-info-requi.component.html',
  styleUrls: ['./view-info-requi.component.scss'],
  providers:[ RequisicionesService,
              CatalogosService,
              {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
              {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
              {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
            ]
})
export class ViewInforRequiComponent implements OnInit, AfterContentChecked {
  @Input() Folios: string;
  public RequiId :string;
  public checked : boolean = false;
  public Prioridades : any[];
  public Estatus : any[];
  public msj: string;

  @Output() EstatusId : EventEmitter<number> = new EventEmitter();
  fch_Solicitud: any;
  folio: any;
  fch_Limite: any;
  prioridad: any;
  estatus: any;
  fch_Cumplimiento: any;
  confidencial: any;
  estatusId: any;
  prioridadId: any;
  vacantes: any;
  asignados:Array<any[]> = [];
  vBtra: any;


    constructor(
      public fb: FormBuilder,
      public serviceRequisicion: RequisicionesService,
      public serviceCatalogos: CatalogosService
    ) { }

    ngOnInit() {
      this.getPrioridades();
      this.getEstatus(2);
    }

    ngAfterContentChecked(){
      if(this.Folios != null && this.checked == false ){
        this.checked = true;
        this.getInitialData();
      }
    }

    getInitialData(){
      this.serviceRequisicion.getRequiFolio(this.Folios)
        .subscribe(DataRequisicion => {
          console.log(DataRequisicion);
          this.RequiId = DataRequisicion.id;
          this.folio = DataRequisicion.folio;
          this.fch_Solicitud = DataRequisicion.fch_Creacion;
          this.fch_Limite = DataRequisicion.fch_Limite;
          this.prioridad = DataRequisicion.prioridad.descripcion;
          this.prioridadId = DataRequisicion.prioridad.id;
          this.fch_Cumplimiento = DataRequisicion.fch_Cumplimiento;
          this.estatus = DataRequisicion.estatus.descripcion;
          this.estatusId = DataRequisicion.estatus.id;
          this.confidencial = DataRequisicion.confidencial;
          this.vacantes = DataRequisicion.vacantes;
          this.asignados = DataRequisicion.asignadosN;
          this.vBtra = DataRequisicion.vBtra;
          console.log(this.asignados);
        this.EstatusId.emit(this.estatusId);
      });
    }

    getPrioridades(){
      this.serviceCatalogos.getPrioridades()
        .subscribe(data => {
          this.Prioridades = data;
        })
    }

    getEstatus(tipoMov: number){
      this.serviceCatalogos.getEstatusRequi(tipoMov)
        .subscribe(data => {
          this.Estatus = data;
        });
    }
  }
