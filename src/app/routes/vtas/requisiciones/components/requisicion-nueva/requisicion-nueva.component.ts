import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CreateRequisicion } from '../../../../../models/vtas/Requisicion';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { UpdateInfoRequiComponent } from '../update-info-requi/update-info-requi.component';

const swal = require('sweetalert');

@Component({
  selector: 'app-requisicion-nueva',
  templateUrl: './requisicion-nueva.component.html',
  styleUrls: ['./requisicion-nueva.component.scss'],
  providers: [CatalogosService, RequisicionesService]
})
export class RequisicionNuevaComponent implements OnInit {
  @ViewChild('updateRequi') updateRequi: UpdateInfoRequiComponent;

  public damfoId: string;
  public direccionId: string;
  public requisicionId: string;
  public folio: any[];
  public createRequi: boolean;
  public dataRequisicion: any[];
  public Horarios: any[];
  public EstatusRequi: any;
  public estatusId: any;
  public TipoReclutamiento: any;
  public confidencial:boolean = false ;

  constructor(
    private settings: SettingsService,
    private serviceCatalogo: CatalogosService,
    private serviceRequisiciones: RequisicionesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
    //Recupera la informacion que se manda en los parametros.

    this._Route.params.subscribe(params => {
      if (params['IdDamfo'] != null && params['IdDireccion'] != null) {
        this.damfoId = params['IdDamfo'];
        this.direccionId = params['IdDireccion'];
        this.estatusId = params['IdEstatus']
        this.confidencial = params['Confidencial'];
        this.spinner.show();

        this.createRequi = true;
      } else {
        this.createRequi = false;
      }
      if (this.createRequi) {
        //Manda la informacion para la creacion de la Requisicion.
        let datas: CreateRequisicion = new CreateRequisicion();
        datas.IdDamfo = this.damfoId;
        datas.IdAddress = this.direccionId;
        datas.IdEstatus = this.estatusId;
        datas.Usuario = this.settings.user['usuario'];
        datas.UsuarioId = this.settings.user['id'];
        datas.Confidencial = this.confidencial;
        this.serviceRequisiciones.createNewRequi(datas).subscribe(data => {
          if (data != 404) {
            swal('Requisición Generada!', 'Capture número de vacantes y asigne un Coordinador.', 'success');
            this.requisicionId = data.id;
            this.folio = data.folio;
            this.Horarios = data.horariosRequi;
            this.EstatusRequi = data.estatusId
            this.TipoReclutamiento = data.tipoReclutamientoId;
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
            swal('Ups!', 'Algo salio mal al intentar generar la requisición.', 'error');
            this._Router.navigate(['/ventas/crearRequisicion']);
          }
        });
      }
    });
  }
  ngOnInit() { }
}
