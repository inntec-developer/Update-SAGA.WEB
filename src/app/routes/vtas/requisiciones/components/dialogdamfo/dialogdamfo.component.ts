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
  providers:[RequisicionesService]
})
export class DialogdamfoComponent implements OnInit, OnChanges {
  IdDamfo: string;
  formDireccion :  FormGroup;
  IdDireccion: string;
  textBtnCancel: string;
  textBtnAccept: string;
  DisabledButton: boolean = false;
  HorariosVacantes: any;
  
  constructor(
    public dialogRef: MatDialogRef<DialogdamfoComponent>,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: RequisicionesService
  ) {
    this.textBtnCancel = 'Cancelar';
    this.textBtnAccept = 'Aceptar';
  }

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  popToast(type, title, body ) {
    var toast : Toast = {
      type: type,
      title: title,
      timeout:2000,
      body: body
    }
    this.toasterService.pop(toast);
  }

  ngOnInit() {
    this.IdDamfo = this.data.id;
    this.formDireccion =  new FormGroup({
      direccion: new FormControl()
    })

  }

  FiltroDireccion(event){
    this.IdDireccion = event;
  }

  ngOnChanges(change: SimpleChanges){
    if(change.IdDireccion && !change.IdDireccion.isFirstChange()){
      alert(this.IdDireccion);
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  createRequisicion(){
    this.DisabledButton = true;
    var horarios = '';
    if(this.IdDireccion != null){
      this.service.getVacantesDamfo(this.IdDamfo).subscribe(data => {
        this.HorariosVacantes = data;
        console.log(this.HorariosVacantes);
        this.DisabledButton = false;
        this.HorariosVacantes.forEach(element => {
          horarios = horarios + element.nombre + ' (' + element.vacantes + ') \n';
        });
        swal('Requisición Generada.!', 'Vacante(s) registrada(s) del DAM-FO-290: \n' + horarios + '\n El número de vacante(s) en la requisición van en 0 (cero), realice los cambios correspondientes.', 'success');
      }, err => {
        console.log(err);
      });
      this._Router.navigate(['/ventas/requisicionNueva', this.IdDamfo, this.IdDireccion], {skipLocationChange:true});
      this.onNoClick();
    }else{
      this.popToast('error', 'Oops!!','Seleccione una dirección para continuar' );
      this.DisabledButton = false;
    }

  }

}
