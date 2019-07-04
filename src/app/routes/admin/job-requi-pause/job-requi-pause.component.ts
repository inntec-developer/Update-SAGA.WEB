import { RequisicionesService } from './../../../service/requisiciones/requisiciones.service';
import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-job-requi-pause',
  templateUrl: './job-requi-pause.component.html',
  styleUrls: ['./job-requi-pause.component.scss'],
  providers: [RequisicionesService]
})
export class JobRequiPauseComponent implements OnInit {

  constructor(private _service: RequisicionesService, private toasterService: ToasterService) { }

  titulo = ''
  ngOnInit() {

  }

  ExecProcedure()
  {
    this.titulo = "Espera a que te salga el mensaje de confirmación \\m/"
    this._service.ExecProcedurePause().subscribe(data => {
      if(data == 200)
      {
        this.titulo = ''
        this.popToast('success', 'JOB - PAUSE', 'El JOB se ejecutó con éxito');

      }
      else
      {
        this.popToast('error', 'JOB - PAUSE', 'Ocurrio un error al intentar ejecutar el JOB');
        this.titulo = ''
      }
  
    })
  }
  ExecProcedureSinCambios()
  {
    this.titulo = "Espera a que te salga el mensaje de confirmación \\m/"
    this._service.ExecProcedureSinCambios().subscribe(data => {
    
      if(data == 200)
      {
        this.popToast('success', 'JOB - Sin cambio de estatus', 'El JOB se ejecutó con éxito');
        this.titulo = ''
      }
      else
      {
        this.popToast('error', 'JOB - Sin cambio de estatus', 'Ocurrio un error al intentar ejecutar el JOB');
        this.titulo = ''
      }
  
    })
  }
  ExecProcedureSinAsignar()
  {
    this.titulo = "Espera a que te salga el mensaje de confirmación \\m/"
    this._service.ExecProcedureSinAsignar().subscribe(data => {
    
      if(data == 200)
      {
        this.popToast('success', 'JOB - Sin asignar', 'El JOB se ejecutó con éxito');
        this.titulo = ''
      }
      else
      {
        this.popToast('error', 'JOB - Sin asignar', 'Ocurrio un error al intentar ejecutar el JOB');
        this.titulo = ''
      }
  
    })
  }
  ExecProcedurePendientesPuro()
  {
    this.titulo = "Espera a que te salga el mensaje de confirmación \\m/"
    this._service.ExecProcedurePendientesPuro().subscribe(data => {
    
      if(data == 200)
      {
        this.popToast('success', 'JOB - Pendientes Puro', 'El JOB se ejecutó con éxito');
        this.titulo = ''
      }
      else
      {
        this.popToast('error', 'JOB - Pendientes Puro', 'Ocurrio un error al intentar ejecutar el JOB');
        this.titulo = ''
      }
  
    })
  }

  ExecProcedureVencidas()
  {
    this.titulo = "Espera a que te salga el mensaje de confirmación \\m/"
    this._service.ExecProcedureVencidas().subscribe(data => {
    
      if(data == 200)
      {
        this.popToast('success', 'JOB - Vencidas', 'El JOB se ejecutó con éxito');
        this.titulo = ''
      }
      else
      {
        this.popToast('error', 'JOB - Vencidas', 'Ocurrio un error al intentar ejecutar el JOB');
        this.titulo = ''
      }
  
    })
  }
  /**
  * configuracion para mensajes de acciones.
  */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7,
   tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
   preventDuplicates: true,
 });

 popToast(type, title, body) {
   var toast: Toast = {
     type: type,
     title: title,
     timeout: 4000,
     body: body
   }
   this.toasterService.pop(toast);

 }
  
}
