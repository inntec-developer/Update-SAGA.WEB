import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { CreateRequisicion } from '../../../../../models/vtas/Requisicion';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { UpdateInfoRequiComponent } from '../update-info-requi/update-info-requi.component';
import { UpdateRequisicionComponent } from '../update-requisicion/update-requisicion.component';

@Component({
  selector: 'app-requisicion-nueva',
  templateUrl: './requisicion-nueva.component.html',
  styleUrls: ['./requisicion-nueva.component.scss'],
  providers:[CatalogosService, RequisicionesService]
})
export class RequisicionNuevaComponent implements OnInit {
  @ViewChild('updateRequi') updateRequi : UpdateInfoRequiComponent;

  public damfoId: string;
  public direccionId: string;
  public requisicionId: string;
  public folio: any[];
  public createRequi: boolean;
  public dataRequisicion : any[];
  public Horarios: any[];
  public EstatusRequi: any;

  constructor(
    private setings : SettingsService,  private serviceCatalogo: CatalogosService, private serviceRequisiciones: RequisicionesService, private _Router: Router,
    private _Route: ActivatedRoute, private spinner: NgxSpinnerService, private fb : FormBuilder)
  { 
    //Recupera la informacion que se manda en los parametros.
    this.spinner.show();
    this._Route.params.subscribe(params => {
      if(params['IdDamfo'] != null && params['IdDireccion'] != null){
        this.damfoId = params['IdDamfo'];
        this.direccionId = params['IdDireccion']
        this.createRequi = true;
      }else{
        this.createRequi = false;
      }
      if(this.createRequi){
        //Manda la informacion para la creacion de la Requisicion.
        let datas: CreateRequisicion = new CreateRequisicion();
        datas.IdDamfo = this.damfoId;
        datas.IdAddress = this.direccionId;
        datas.IdEstatus = 4;
        datas.Usuario = sessionStorage.getItem('usuario');
        datas.UsuarioId = sessionStorage.getItem('id');
        this.serviceRequisiciones.createNewRequi(datas).subscribe(data => {
          debugger;
          this.requisicionId = data.id;
          this.folio = data.folio;
          this.Horarios = data.horariosRequi;
          this.EstatusRequi = data.estatusId
        });
      }
    });
  }
  ngOnInit() {  }
}
