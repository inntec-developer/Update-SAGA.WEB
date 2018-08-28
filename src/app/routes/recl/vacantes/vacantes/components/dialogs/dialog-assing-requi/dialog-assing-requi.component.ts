import { AsignarRequisicionComponent } from './../../../../../../../components/asignar-requisicion/asignar-requisicion.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { AsignarRequis } from '../../../../../../../models/models';
import { RequisicionesService } from '../../../../../../../service/requisiciones/requisiciones.service';


@Component({
  selector: 'app-dialog-assing-requi',
  templateUrl: './dialog-assing-requi.component.html',
  styleUrls: ['./dialog-assing-requi.component.scss'],
  providers: [
    RequisicionesService,
    AsignarRequis,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},    
  ]
})
export class DialogAssingRequiComponent implements OnInit {
  @ViewChild('asginaciones') asignaciones: AsignarRequisicionComponent;
  textBtnCerrar: string;
  textBtnAceptar: string;
  placeHolderSelect: string;
  loading: boolean;
  public return: any;
  public formAsignaciones : FormGroup;
  public asignadosRequi :  any[] = [];
  alertAssing: boolean;
  errorDE: boolean;
  RequiId: string;
  checked: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any, 
    private serviceRequisicion: RequisicionesService,
    public dialogAssing : MatDialogRef<DialogAssingRequiComponent>,
    public fb : FormBuilder,
    public asignarRequi : AsignarRequis,
    private toasterService: ToasterService,
  ) {
    this.textBtnCerrar = 'Cancelar';
    this.textBtnAceptar = 'Aceptar'
    this.placeHolderSelect = 'ASIGNAR RECLUTADORES / CELULAS / GRUPOS TRABAJO';
   }

   

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formAsignaciones =  this.fb.group({
      fch_Cumplimiento: ['', Validators.required],
      diasEnvio: ['', Validators.required]
    })

  }

  ngAfterContentChecked() {
    if(!this.checked){
      this.getInformacion()
      this.getAsignacion(this.data.asignados);
    }
  }

  getInformacion(){
    if(this.data != null){
      this.RequiId = this.data.id;
      this.formAsignaciones.patchValue({
        fch_Cumplimiento: this.data.fch_Cumplimiento,
        diasEnvio: this.data.diasEnvio
      })
    }
    this.checked = true;
  }

  onCloseDialog(){
    this.dialogAssing.close();
  }

  getAsignacion($event){
    this.asignadosRequi = $event;
    if(this.asignadosRequi.length > 0)
      this.alertAssing = false;
    console.log(this.asignadosRequi);
  }

   
  Save(){
    this.errorDE = false;
    if(this.formAsignaciones.get('diasEnvio').value > 0 && this.formAsignaciones.get('diasEnvio').value <= 20 ){
      this.loading = true;
      this.asignadosRequi.push(localStorage.getItem('id'));
      let asg = [];
      for(let a of this.asignadosRequi){
        asg.push({
          RequisicionId: this.RequiId,
          GrpUsrId: a,
          CRUD: '',
          UsuarioAlta : localStorage.getItem('usuario'),
          UsuarioMod : localStorage.getItem('usuario'),
          fch_Modificacion : new Date()        
        });
      }

      var assing = {
        id: this.data.id,
        fch_Cumplimiento : this.formAsignaciones.get('fch_Cumplimiento').value,
        diasEnvio: this.formAsignaciones.get('diasEnvio').value,
        usuario: localStorage.getItem('usuario'),
        asignacionRequi: asg
      }
      this.asignarRequi = assing;
      this.serviceRequisicion.asignarRequisicion(this.asignarRequi)
        .subscribe(data => {
          this.return = data;
          if(this.return == 200){
            this.loading = false;
            this.dialogAssing.close();
          }
          else{
              this.loading = false;
          }
        });
    }
    else{
      this.errorDE = true;
    }
  }
}

