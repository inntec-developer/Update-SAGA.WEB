import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.scss']
})
export class AddExamenComponent implements OnInit {
  se = new FormControl('', [Validators.required]);
  catalogo = [];
  respuestas = [];
  examen = [];
  tipoexamenId = "0";
  preguntas = "";
  resp1="";
  pa;
  nomExamen = "";
  respInc = "";
  constructor(private service: ExamenesService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.GetCatalogoExamenes();
  }

  GetCatalogoExamenes()
  {
    this.service.GetCatalogo().subscribe(data =>{
      this.catalogo = data;
      console.log(data)
    })
  }

  AgregarRespuesta(resp, value)
  {
    if(this.preguntas != "")
    {
      if(value == 1 && this.respuestas.length > 0)
      {
        var aux = false;
        this.respuestas = this.respuestas.filter(function(item){
          if( item.value === 1 )
          {
            item.resp = resp;
            aux = true;
          }
          return item;
        });

        if(!aux)
        {
          this.respuestas.push({ resp: resp, value: value});
        }
      
      }
      else if(value != 3)
      {
        this.respuestas.push({ resp: resp, value: value});
      }
      else
      {
        this.respuestas = [];
        this.resp1 = "";
      }

      this.respInc = "";
    }
   

  }

  AgregarPregunta()
  {
    if(this.respuestas.length > 0)
    {
      this.examen.push({Pregunta: this.preguntas, Tipo: 2, Respuestas: this.respuestas, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})
    }
    else
    {
      this.examen.push({Pregunta: this.preguntas, Tipo: 1, Respuestas: this.respuestas, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})
    }

    this.preguntas = "";
    this.respuestas = [];
    this.resp1 = "";
    this.pa = 0;
    this.respInc = "";
  }

  UpdateResp(row)
  {
    console.log(row)
  }

  AgregarExamen()
  {
    this.service.InsertExamenes(this.examen).subscribe( data => {

      if(data == 200)
      {
        this.popToast('success', 'Generar Examen', 'El examen se genero con éxito');
        this.Borrar();
      }
      else
      {
        this.popToast('error', 'Generar Examen', 'Ocurrio un error al intentar generar examen');

      }
    })
  }

  Borrar()
  {
    this.examen = [];
    this.respuestas = [];
    this.preguntas = "";
    this.resp1 = "";
    this.pa = 0;
    this.respInc = "";
    this.tipoexamenId = "0";
    this.nomExamen = "";
    this.se.setValue('');

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
 