import { Component, Inject, OnInit } from '@angular/core';
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
    this.getInformacion();
  }

  initForm(){
    this.formAsignaciones =  this.fb.group({
      fch_Cumplimiento: ['', Validators.required],
      diasEnvio: ['', Validators.required]
    })

  }

  getInformacion(){
    if(this.data != null){
      this.formAsignaciones.patchValue({
        fch_Cumplimiento: this.data.fch_Cumplimiento,
        diasEnvio: this.data.diasEnvio
      })
      this.RequiId = this.data.id;
    }
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

   
    // Toasts (Mensajes del sistema)
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
        timeout:4000,
        body: body
      }
      this.toasterService.pop(toast);
    }

  Save(){
    debugger;
    this.errorDE = false;
    console.log(this.RequiId);
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
              this.popToast('error', 'Oops!!','Algo salio mal intente de nuevo' );
              this.loading = false;
          }
        });
    }
    else{
      this.errorDE = true;
    }



    // if(this.asignadosRequi != []){
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.asignadosRequi.push(localStorage.getItem('id'));
    //     console.log('Asignados ', this.asignadosRequi);
    //     console.log('Cordinador Id: ', localStorage.getItem('id') )
    //   }, 5000)
    // }
    // else{
    //   this.alertAssing = true;
    // }
  }
}

