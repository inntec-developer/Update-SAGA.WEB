import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-vacante',
  templateUrl: './info-vacante.component.html',
  styleUrls: ['./info-vacante.component.scss'],
  providers: [RequisicionesService,
    CatalogosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class InfoVacanteComponent implements OnInit {
  @Input('Folios') Folios: string;
  @Input('Requisicion') Requisicion: string;
  @Output() EstatusId: EventEmitter<number> = new EventEmitter();
  public RequiId: string;
  public Prioridades: any[];
  public Estatus: any[];
  public msj: string;
  public requisicion: Array<any[]>;
  sueldoMinimo: any;
  sueldoSemanalMin: number;
  sueldoDiarioMin: number;
  sueldoMaximo: number;
  sueldoDiarioMax: number;
  sueldoSemanalMax: number;
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
  asignados: Array<any[]> = [];
  vBtra: any;


  constructor(
    public fb: FormBuilder,
    public serviceRequisicion: RequisicionesService,
    public serviceCatalogos: CatalogosService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (this.Folios != null) {
      this.getPrioridades();
      this.getEstatus(2);
    }

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.Folios != null && this.Requisicion != null) {
      this.getInitialData();
      this.GetDataRequi();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.Folios && !changes.Folios.isFirstChange() || changes.Requisicion && !changes.Requisicion.isFirstChange()) {
      if (this.Folios != null && this.Requisicion != null) {
        this.getInitialData();
        this.GetDataRequi();
      }
    }
  }

  getInitialData() {
    this.serviceRequisicion.getRequiFolio(this.Folios)
      .subscribe(DataRequisicion => {
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
        this.EstatusId.emit(this.estatusId);
      });
  }

  getPrioridades() {
    this.serviceCatalogos.getPrioridades()
      .subscribe(data => {
        this.Prioridades = data;
      })
  }

  getEstatus(tipoMov: number) {
    this.serviceCatalogos.getEstatusRequi(tipoMov)
      .subscribe(data => {
        this.Estatus = data;
      });
  }

  GetDataRequi() {
    this.serviceRequisicion.getNewRequi(this.Requisicion)
      .subscribe(data => {
        this.requisicion = data;
        this.spinner.hide();
      });
  }
}