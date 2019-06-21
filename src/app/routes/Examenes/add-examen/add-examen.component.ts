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

  examen = [];
  tipoexamenId = 0;
  preguntas = "";

  resp1="";
  pa = false;
  nomExamen = "";
  respInc = "";
  msg: string = "";
  img : boolean = false;
  respVal: boolean;
  imgPregunta = { Pregunta: "", Tipo: 0,  file:"", name: "", type: ""};


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
      if(value == 3)
      {
        if(this.pa)
        {       
          this.respuestas = [];
        }
        else
        {
          this.resp1 = "";
        }
      }
      else
      {
        if (this.respuestas.length > 0 && value == 1) {
          var aux = false;
          this.respuestas = this.respuestas.filter(function (item) {
            if (item.value === 1) {
              item.resp = resp;
              item.file = "";
              item.name = ""
              item.type = ""
              aux = true;
            }
            return item;
          });

          if (!aux) {
            this.respuestas.push({ resp: resp, value: value, file: "", name: "", type: "" });
          }
        }
        else
        {
          this.respuestas.push({ resp: resp, value: value, file: "", name: "", type: "" });
        }
      }
        
      this.respInc = "";
    }
  }

  updateTipoExamen()
  {
    if(this.examen.length > 0)
    {
      this.examen.forEach(e => {
        e.TipoExamen.Id = this.tipoexamenId;
      });
    }
  }

  AgregarPregunta()
  {
    if(this.respuestas.length > 3)
    {
      if(this.imgPregunta.file.length == 0)
      {
        this.imgPregunta = {Pregunta: this.preguntas, Tipo: 2, file: '', name: '', type: ''}
      }
      else
      {
        this.imgPregunta.Tipo = 2;
      } 

      this.examen.push({Pregunta:this.imgPregunta, Respuestas: this.respuestas, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})

      this.preguntas = "";
      this.respuestas = [];
      this.resp1 = "";
      this.pa = false;
      this.respInc = "";
      this.msg = "";
      this.img = false;
      this.respVal = false;
      this.imgPregunta = { Pregunta: "",Tipo: 0, file:"", name: "", type: ""};
    }
    else if(this.respuestas.length == 0)
    {
      if(this.imgPregunta.file.length == 0)
      {
        this.imgPregunta = {Pregunta: this.preguntas, Tipo: 1, file: '', name: '', type: ''}
      }
      else
      {
        this.imgPregunta.Tipo = 1;
      } 

      this.examen.push({Pregunta:this.imgPregunta, Respuestas: this.respuestas, TipoExamen: {Id: this.tipoexamenId, Nombre: this.nomExamen}})

      this.preguntas = "";
      this.respuestas = [];
      this.resp1 = "";
      this.pa = false;
      this.respInc = "";
      this.msg = "";
      this.img = false;
      this.respVal = false;
      this.imgPregunta = { Pregunta: "", Tipo: 0, file:"", name: "", type: ""};
    }
    else
    {
      this.msg = "Debe agregar mas de una opción de respuesta para la pregunta";
    }
  }

  UpdatePregunta(value, index, $event)
  {
    debugger;
    var self = this;

    if ($event) {
      let file: File = $event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
     
      reader.onload = function () {
        self.examen[index].Pregunta.Pregunta = value;
        self.examen[index].Pregunta.file = reader.result;
        self.examen[index].Pregunta.name = file.name;
        self.examen[index].Pregunta.type = file.type;
      }
    }
    else {
      self.examen[index].Pregunta.Pregunta = value;
      self.examen[index].Pregunta.file = "";
      self.examen[index].Pregunta.name = "";
      self.examen[index].Pregunta.type = "";
    }
  }

  UpdateResp(value, index1, index2, $event)
  {
    if ($event) {
      let file: File = $event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var self = this;

      reader.onload = function () {
        self.examen[index1].Respuestas[index2].resp = value;
        self.examen[index1].Respuestas[index2].file = reader.result;
        self.examen[index1].Respuestas[index2].name = file.name;
        self.examen[index1].Respuestas[index2].type = file.type;
      }
    }
    else {

      self.examen[index1].Respuestas[index2].resp = value;
      self.examen[index1].Respuestas[index2].file = "";
      self.examen[index1].Respuestas[index2].name = "";
      self.examen[index1].Respuestas[index2].type = "";
    }
  }
  AgregarExamen()
  {
    console.log(this.examen)
    this.service.InsertExamenes(this.examen).subscribe( data => {
      if(data == 200)
      {
        this.popToast('success', 'Generar Examen', 'El examen se generó con éxito');
        this.Borrar();
      }
      else
      {
        this.popToast('error', 'Generar Examen', 'Ocurrió un error al intentar generar examen');

      }
    })
  }


  fileChangeListener($event, resp, value, prVal) 
  {
    let file: File = $event.target.files[0];

    if(this.isImage(file.type))
    {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    var self = this;
  
    resp = resp || file.name;

    reader.onload = function () {
      // self.base64textString = reader.result;
      if (self.preguntas != "") {
        if (prVal == 1) {
          self.imgPregunta = { Pregunta: self.preguntas, Tipo: 3, file: reader.result, name: file.name, type: file.type };
        }
        else {
          if (value == 1) {
            var aux = false; 
            if (self.respuestas.length > 0) {
              self.respuestas = self.respuestas.filter(function (item) {
                if (item.value === 1) {
                  item.resp = resp;
                  item.file = reader.result;
                  item.name = file.name;
                  item.type = file.type;
                  aux = true;
                }
                return item;
              });

              if (!aux) {
                self.respuestas.push({ resp: resp, value: value, file: reader.result, name: file.name, type: file.type });
              }
            }
            else
            {
              self.respuestas.push({ resp: resp, value: value, file: reader.result, name: file.name, type: file.type });
            }
          }
          else if (value == 0) {
            self.respuestas.push({ resp: resp, value: value, file: reader.result, name: file.name, type: file.type });
          }
          else {
            self.respuestas = [];
            self.resp1 = "";
          }
          self.respInc = "";
        }
      }
    };
  }
  else
  {
    this.popToast('error', 'Generar Examen', 'Solo puede agregar imágenes');
  }
  }

  Borrar()
  {
    this.examen = [];
    this.respuestas = [];
    this.preguntas = "";
    this.resp1 = "";
    this.pa = false;
    this.respInc = "";
    this.tipoexamenId = 0;
    this.nomExamen = "";
    this.se.setValue('');
    this.imgPregunta = { Pregunta: "", Tipo: 0,  file:"", name: "", type: ""};
    this.img = false;

  }

   /**
   * Check file is image
   *
   * @param {*} fileType
   * @returns {boolean}
   */
  public isImage(fileType: any): boolean {
    return /^image\/(.*)$/.test(fileType);
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
