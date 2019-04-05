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

  titulo = 'Pincha aqui'
  ngOnInit() {

  }

  ExecProcedure()
  {
    this.titulo = "Espera a que te salga el mensaje de confirmación \\m/"
    this._service.ExecProcedurePause().subscribe(data => {
      if(data == 200)
      {
        this.titulo = 'Click aqui'
        this.popToast('success', 'JOB - PAUSE', 'El JOB se ejecutó con éxito');

      }
      else
      {
        this.popToast('error', 'JOB - PAUSE', 'Ocurrio un error al intentar ejecutar el JOB');
      
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
