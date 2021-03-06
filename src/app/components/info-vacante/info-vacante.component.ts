import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../service';
import { Cliente, Requisicion } from './../../models/models';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminServiceService } from '../../service/AdminServicios/admin-service.service';

@Component({
  selector: 'app-info-vacante',
  templateUrl: './info-vacante.component.html',
  styleUrls: ['./info-vacante.component.scss'],
  providers: [RequisicionesService, AdminServiceService,
    CatalogosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class InfoVacanteComponent implements OnInit, OnChanges {
  @Input('HiddenPrint') HiddenPrint: any;
  @Input('Folios') Folios: string;
  @Input('Requisicion') Requisicion: string;
  @Input('ShowSection') ShowSection: any;
  @Output() EstatusId: EventEmitter<number> = new EventEmitter();


  public cliente: any;
  public RequiId: string;
  public Prioridades: any[];
  public Estatus: any[];
  public requisicion: any;
  public fch_Solicitud: any;
  public folio: any;
  public fch_Limite: any;
  public prioridad: any;
  public estatus: any;
  public fch_Cumplimiento: any;
  public confidencial: any;
  public estatusId: any;
  public prioridadId: any;
  public vacantes: any;
  public asignados: Array<any[]> = [];
  public vBtra: any;

  // Arreglos
  public horariosRequi: any;
  solicitante: any;
  coordinador: any;

  arte: string;



  constructor(
    public fb: FormBuilder,
    public serviceRequisicion: RequisicionesService,
    public serviceCatalogos: CatalogosService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _service: AdminServiceService
  ) { }

  ngOnInit() {
    if (this.Folios != null) {
      this.getPrioridades();
      this.getEstatus(2);
    }
  }

  // ngAfterViewInit(): void {
  //   if (this.Folios != null && this.Requisicion != null) {
  //     this.getInitialData();
  //     this.GetDataRequi();
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {
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
        this.solicitante = DataRequisicion.solicitante || 'SIN ASIGNAR';
        this.coordinador = DataRequisicion.coordinador || 'SIN ASIGNAR';
        this.asignados = DataRequisicion.asignadosN || 'SIN ASIGNAR';
        this.vBtra = DataRequisicion.vBtra;
        this.EstatusId.emit(this.estatusId);
      });
  }

  getPrioridades() {
    this.serviceCatalogos.getPrioridades()
      .subscribe(data => {
        this.Prioridades = data;
      });
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
        this.cliente = data['cliente'];
        const aux = data['arte'];
        let id = aux.lastIndexOf('/');
        const nom = aux.substr(id + 1, aux.length);
        id = nom.lastIndexOf('.');
        let type = nom.substr(id + 1, nom.length);
        type = type.replace('.', '');
        this._service.GetBG('ArteRequi/BG/' + nom).subscribe(r => {
          this.arte = 'data:image/' + type + ';base64,' + r;
        });

        this.horariosRequi = data['horarios'];
        this.spinner.hide();
      });
  }
}
