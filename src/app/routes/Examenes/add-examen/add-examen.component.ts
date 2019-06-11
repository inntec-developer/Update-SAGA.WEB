import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ExamenesService } from './../../../service/Examenes/examenes.service';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.scss']
})
export class AddExamenComponent implements OnInit {
  se = new FormControl('', [Validators.required]);
  nom:any;
  catalogo = [];
  respuestas = [];
  respImgs = [];
  examen = [];
  tipoexamenId = "0";
  preguntas = "";
  resp1="";
  pa;
  nomExamen = "";
  respInc = "";
  msg: string = "";
  img : boolean = false;
  constructor(private service: ExamenesService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.GetCatalogoExamenes();
  }

  GetCatalogoExamenes()
  {
    this.service.GetCatalogo().subscribe(data =>{
      this.catalogo = data;
    })
  }

  AgregarRespuesta(resp, value)
  {
    if (this.preguntas != "") {
      if (value == 1 && this.respuestas.length > 0) {
        var aux = false;
        this.respuestas = this.respuestas.filter(function (item) {
          if (item.value === 1) {
            item.resp = resp;
            aux = true;
          }
          return item;
        });

        if (!aux) {
          this.respuestas.push({ resp: resp, value: value });
        }

      }
      else if (value != 3) {
        this.respuestas.push({ resp: resp, value: value });
      }
      else {
        this.respuestas = [];
        this.resp1 = "";
      }

      this.respInc = "";
    }
  }

  AgregarPregunta()
  {
    if(this.respuestas.length > 3)
    {
      this.examen.push({Pregunta: this.preguntas, Tipo: 2, Respuestas: this.respuestas, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})

      this.preguntas = "";
      this.respuestas = [];
      this.respImgs = [];
      this.resp1 = "";
      this.pa = 0;
      this.respInc = "";
      this.msg = "";
    }
    else if(this.respuestas.length == 0 && this.respImgs.length == 0)
    {
      this.examen.push({Pregunta: this.preguntas, Tipo: 1, Respuestas: this.respuestas, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})

      this.preguntas = "";
      this.respuestas = [];
      this.respImgs = [];
      this.resp1 = "";
      this.pa = 0;
      this.respInc = "";
      this.msg = "";
    }
    else if(this.respuestas.length == 0 && this.respImgs.length > 0)
    {
      this.examen.push({Pregunta: this.preguntas, Tipo: 1, Respuestas: this.respImgs, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})

      this.preguntas = "";
      this.respuestas = [];
      this.respImgs = [];
      this.resp1 = "";
      this.pa = 0;
      this.respInc = "";
      this.msg = "";
    }
    else
    {
      this.msg = "Debe agregar mas de una opción de respuesta para la pregunta";
    }
  }

  UpdatePregunta(value, index)
  {
    this.examen[index].Pregunta = value;

  }

  UpdateResp(value, index)
  {
    this.examen[index].resp = value;
  }

  UpdateRespImg(value,index1, index2, $event)
  {
    let file: File = $event.target.files[0];

    let formData = new FormData();
    formData.append('file', file, file.name);

    this.examen[index1].Respuestas[index2].resp = file.name;
    this.examen[index1].Respuestas[index2].ruta = formData;
  }
  AgregarExamen()
  {
    console.log(this.examen)
    // this.service.InsertExamenes(this.examen).subscribe( data => {

    //   if(data == 200)
    //   {
    //     this.popToast('success', 'Generar Examen', 'El examen se generó con éxito');
    //     this.Borrar();
    //   }
    //   else
    //   {
    //     this.popToast('error', 'Generar Examen', 'Ocurrió un error al intentar generar examen');

    //   }
    // })
  }

  fileChangeListener($event, value) 
  {
    let file: File = $event.target.files[0];

    let formData = new FormData();
    formData.append('file', file, file.name);

    if (this.preguntas != "") {
      if (value == 1 && this.respuestas.length > 0) {
        var aux = false;
        this.respuestas = this.respuestas.filter(function (item) {
          if (item.value === 1) {
            item.resp = file.name;
            item.ruta = formData;
            aux = true;
          }
          return item;
        });

        if (!aux) {
          this.respuestas.push({ resp: file.name, value: value, ruta: formData });
        }

      }
      else if (value != 3) {
        this.respuestas.push({ resp: file.name, value: value, ruta: formData });
      }
      else {
        this.respuestas = [];
        this.resp1 = "";
      }

      this.respInc = "";
    }

    // this.service.UploadFile(file, this.candidatoId).subscribe(result => {
    //   if(result === 201)
    //   {
    //     this.ngOnInit();
    //     this.alerts[0]['msg'] = "El archivo " + file.name + " se subió con éxito";
    //     this.alert = this.alerts[0];
    //     this.verMsj = true;
    //   }
    //   else
    //   {
    //     this.alerts[1]['msg'] = "Ocurrió un error al intentar subir archivo " + file.name;
    //     this.alert = this.alerts[1];
    //     this.verMsj = true;
    //   }
    // });

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
