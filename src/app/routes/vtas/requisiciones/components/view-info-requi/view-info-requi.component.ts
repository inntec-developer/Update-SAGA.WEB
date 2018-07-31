import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogosService, RequisicionesService } from '../../../../../service/index';
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

  @Output() EstatusId : EventEmitter<number> = new EventEmitter();;

  public formRequi : FormGroup;


    constructor(
      public fb: FormBuilder,
      public serviceRequisicion: RequisicionesService,
      public serviceCatalogos: CatalogosService
    ) {
        this.formRequi = new FormGroup({
          folio: new FormControl(),
          fch_Solicitud: new FormControl(),
          fch_Limite: new FormControl('',[Validators.required]),
          prioridad: new FormControl(),
          fch_Cumplimiento: new FormControl(),
          confidencial: new FormControl(),
          estatus:  new FormControl(),
        });
     }

    ngOnInit() {
      this.getPrioridades();
      this.getEstatus(2);
      this.formRequi = this.fb.group({
        folio : [{value: '', disabled: true}],
        fch_Solicitud: [{value: '', disabled:true}],
        fch_Limite: [{value: '', disabled:true}],
        prioridad: [{value:'', disabled:true}, Validators.required ],
        fch_Cumplimiento: [{value: '', disabled: true}, Validators.required],
        confidencial: [{value:false, disabled:true}],
        estatus: [{value:'', disabled:true}, Validators.required ],
      });
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
          this.RequiId = DataRequisicion.id;
          this.formRequi.patchValue({
            folio: DataRequisicion.folio,
            fch_Solicitud: DataRequisicion.fch_Creacion,
            fch_Limite: DataRequisicion.fch_Limite,
            prioridad: DataRequisicion.prioridad.id,
            estatus: DataRequisicion.estatus.id,
            fch_Cumplimiento: DataRequisicion.fch_Cumplimiento,
            confidencial: DataRequisicion.confidencial,
        });
        this.EstatusId.emit(this.formRequi.get('estatus').value);
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
