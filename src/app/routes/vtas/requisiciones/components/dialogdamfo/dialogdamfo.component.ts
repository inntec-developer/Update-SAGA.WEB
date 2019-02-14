import { CreateRequisicion } from './../../../../../models/vtas/Requisicion';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyOutputType, Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validator } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'

import { RequisicionesService } from '../../../../../service/index';

const swal = require('sweetalert');

//Services


@Component({
  selector: 'app-dialogdamfo',
  templateUrl: './dialogdamfo.component.html',
  styleUrls: ['./dialogdamfo.component.scss'],
  providers: [RequisicionesService]
})
export class DialogdamfoComponent implements OnInit, OnChanges {
  IdDamfo: string;
  formDireccion: FormGroup;
  IdDireccion: string;
  DisabledButton: boolean = false;
  HorariosVacantes: any;

  constructor(
    public dialogRef: MatDialogRef<DialogdamfoComponent>,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: RequisicionesService
  ) {
    dialogRef.disableClose = true;
  }

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 2000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  ngOnInit() {
    this.IdDamfo = this.data.id;
    this.formDireccion = new FormGroup({
      direccion: new FormControl()
    })
  }

  FiltroDireccion(event) {
    if (!event.returnValue) {
      this.IdDireccion = event;
    }
    else {
      this.IdDireccion = null;
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.IdDireccion && !change.IdDireccion.isFirstChange()) {
      alert(this.IdDireccion);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createRequisicion() {
    this.DisabledButton = true;
    var horarios = '';
    if (this.IdDireccion != null) {
      this.service.getVacantesDamfo(this.IdDamfo).subscribe(data => {
        this.HorariosVacantes = data;
        this.DisabledButton = false;
        this.HorariosVacantes.forEach(element => {
          horarios = horarios + element.nombre + ' (' + element.vacantes + ') \n';
        });
        swal('Requisición Generada.!', 'Vacante(s) registrada(s) del DAM-FO-290: \n' + horarios + '\n El número de vacante(s) en la requisición van en 0 (cero), realice los cambios correspondientes.', 'success');
      }, err => {
        console.log(err);
      });
      if (this.data.tipoReclutamiento === "Puro") {
        let datas: CreateRequisicion = new CreateRequisicion();
        datas.IdDamfo = this.IdDamfo;
        datas.IdAddress = this.IdDireccion;
        // datas.IdEstatus = 43;
        datas.Usuario = sessionStorage.getItem('usuario');
        datas.UsuarioId = sessionStorage.getItem('id');
        this.service.createNewRequi(datas).subscribe(data => {
          // this.requisicionId = data.id;
          // this.folio = data.folio;
          if (data == 417) {
            this.popToast('error', 'Oops!!', 'Ocurrio un error al generar requisición');
            this.DisabledButton = false;
          }
          else {
            let tipousuarioid = sessionStorage.getItem('tipoUsuario');
            if(tipousuarioid == '3')
            {
              this._Router.navigate(['/ventas/requisicionPuro']);
            }
            else
            {
            this._Router.navigate(['/ventas/requisicion']);
            
            }
            this.onNoClick();
          }
        });
      }
      else {
        this._Router.navigate(['/ventas/requisicionNueva', this.IdDamfo, this.IdDireccion], { skipLocationChange: true });
        this.onNoClick();
      }


    } else {
      this.popToast('error', 'Oops!!', 'Seleccione una dirección para continuar');
      this.DisabledButton = false;
    }

  }

}
