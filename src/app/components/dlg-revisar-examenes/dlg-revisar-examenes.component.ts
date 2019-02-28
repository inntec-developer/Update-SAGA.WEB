import { ExamenesService } from './../../service/Examenes/examenes.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dlg-revisar-examenes',
  templateUrl: './dlg-revisar-examenes.component.html',
  styleUrls: ['./dlg-revisar-examenes.component.scss']
})
export class DlgRevisarExamenesComponent implements OnInit {

 resultado = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public examen: any, private service: ExamenesService, private toasterService: ToasterService) { }

  ngOnInit() { }


  ActualizarResultado()
  {
    let aux = {ExamenId: this.examen[0].examenId, CandidatoId: this.examen[0].candidatoId, RequisicionId: this.examen[0].requisicionId, Resultado:this.resultado};
    this.service.ActualizarResultado(aux).subscribe(data =>{
      if(data == 200)
      {
        this.popToast('success', 'Agregar Resultado', 'La actualización de datos se realizó con éxito');
        this.resultado = 0;
      }
      else
      {
        this.popToast('error', 'Agregar Resultado', 'Ocurrió un error al intentar agregar resultado');

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
