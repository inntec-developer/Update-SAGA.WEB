import { SettingsService } from './../../../core/settings/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.scss']
})
export class AddExamenComponent implements OnInit {
  se = new FormControl('', [Validators.required]);
  nom: any;
  catalogo = [];
  respuestas = [];

  examen = [];
  tipoexamenId = 0;
  preguntas = '';
  tipoPregunta = 0;

  resp1 = '';
  pa = false;
  nomExamen = '';
  respInc = '';
  msg = '';
  img = false;
  respVal: boolean;
  imgPregunta: any = []; // { Pregunta: '', Tipo: 0, file: '', name: '', type: '' };
tiposPregunta = [
  {id: 1, descripcion: 'Pregunta Abierta'},
  {id: 2, descripcion: 'Opción multiple'},
  {id: 3, descripcion: 'Puntaje'},
];
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
  ruta: any = 1;
  respDesc = '';
  respValue = 0;
  descripcion: any;

  constructor(private service: ExamenesService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private _Router: Router,
    private _Route: ActivatedRoute) {
      this._Route.queryParams.subscribe(params => {
        if (params['ruta'] != null) {
          this.ruta = params['ruta'];
        }
      });
   }

  ngOnInit() {
    this.GetCatalogoExamenes();
  }

  GetCatalogoExamenes() {
    this.service.GetCatalogo().subscribe(data => {
      this.catalogo = data;
    });
  }

  AgregarRespuesta(resp, value) {
    if (this.preguntas !== '') {
      if (this.tipoPregunta === 1) {
          this.respuestas = [];
          this.resp1 = '';
      } else if ( this.tipoPregunta === 3) {
        this.respuestas.push({ resp: resp, value: value, file: '', name: '', type: '' });
        this.respDesc = '';
        this.respValue = 0;
      }  else {
        if (this.respuestas.length > 0 && value === 1) {
          let aux = false;
          this.respuestas = this.respuestas.filter(function (item) {
            if (item.value === 1) {
              item.resp = resp;
              item.file = '';
              item.name = '';
              item.type = '';
              aux = true;
            }
            return item;
          });

          if (!aux) {
            this.respuestas.push({ resp: resp, value: value, file: '', name: '', type: '' });
          }
        } else {
          this.respuestas.push({ resp: resp, value: value, file: '', name: '', type: '' });
        }
      }

      this.respInc = '';
    }
  }
  updateTipoExamen() {
    if (this.examen.length > 0) {
      this.examen.forEach(e => {
        e.TipoExamen.Id = this.tipoexamenId;
      });
    }
  }

  AgregarPregunta() {
    if (this.respuestas.length > 1) {
      if (this.imgPregunta.length === 0) {
        this.imgPregunta.push({ Pregunta: this.preguntas, Tipo: this.tipoPregunta, file: '', name: '', type: '' });
      } else {
        this.imgPregunta[0]['Tipo'] = this.tipoPregunta;
      }

      this.examen.push({ Pregunta: this.imgPregunta[0],
        Respuestas: this.respuestas,
        TipoExamen: { Id: this.tipoexamenId, Nombre: this.nomExamen },
        Descripcion: '',
        usuarioId: ''
      });

    } else if (this.respuestas.length === 0) {
      if (this.imgPregunta[0].file.length === 0) {
        this.imgPregunta = [{ Pregunta: this.preguntas, Tipo: this.tipoPregunta, file: '', name: '', type: '' }];
      } else {
        this.imgPregunta[0].Tipo = 1;
      }

      this.examen.push({
        Pregunta: this.imgPregunta[0],
        Respuestas: this.respuestas,
        TipoExamen: { Id: this.tipoexamenId, Nombre: this.nomExamen },
        Descripcion: '',
        usuarioId: ''
      });

    }
    this.preguntas = '';
    this.respuestas = [];
    this.resp1 = '';
    this.respDesc = '';
    this.respValue = 0;
    this.tipoPregunta = 0;
    this.pa = false;
    this.respInc = '';
    this.msg = '';
    this.img = false;
    this.respVal = false;
    this.imgPregunta = [];
  
  }

  UpdatePregunta(value, index, $event) {
    const self = this;

    if ($event) {
      const file: File = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        self.examen[index].Pregunta.Pregunta = value;
        self.examen[index].Pregunta.file = reader.result;
        self.examen[index].Pregunta.name = file.name;
        self.examen[index].Pregunta.type = file.type;
      };
    } else {
      self.examen[index].Pregunta.Pregunta = value;
      self.examen[index].Pregunta.file = '';
      self.examen[index].Pregunta.name = '';
      self.examen[index].Pregunta.type = '';
    }
  }

  UpdateResp(value, index1, index2, $event) {
    if ($event) {
      const file: File = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const self = this;

      reader.onload = function () {
        if (index1 === -1) {
          self.respuestas[index2].file = reader.result;
          self.respuestas[index2].name = file.name;
          self.respuestas[index2].type = file.type;
        } else {
          self.examen[index1].Respuestas[index2].resp = value;
          self.examen[index1].Respuestas[index2].file = reader.result;
          self.examen[index1].Respuestas[index2].name = file.name;
          self.examen[index1].Respuestas[index2].type = file.type;
        }
      };
    } else {
      this.examen[index1].Respuestas[index2].resp = value;
      this.examen[index1].Respuestas[index2].file = '';
      this.examen[index1].Respuestas[index2].name = '';
      this.examen[index1].Respuestas[index2].type = '';
    }
  }

  AgregarExamen() {
    this.examen[0].Descripcion = this.descripcion;
    this.examen[0].UsuarioId = this.settings.user['id'];
    this.service.InsertExamenes(this.examen).subscribe(data => {
      if (data === 200) {
        this.popToast('success', 'Generar Examen', 'El examen se generó con éxito');
        this.Borrar();
      } else {
        this.popToast('error', 'Generar Examen', 'Ocurrió un error al intentar generar examen');

      }
    });
  }


  fileChangeListener($event, resp, value, prVal) {
    const file: File = $event.target.files[0];

    if (this.isImage(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      resp = resp || file.name;
      if ( this.preguntas === '') {
        this.preguntas = file.name;
      }
      const self = this;
      reader.onload = function () {
          if (prVal === 1) {
            self.imgPregunta = [{
              Pregunta: self.preguntas,
              Tipo: self.tipoPregunta,
              file: reader.result,
              name: file.name,
              type: file.type
            }];
          } else {
            if (value === 1) {
              let aux = false;
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
              } else {
                self.respuestas.push({ resp: resp, value: value, file: reader.result, name: file.name, type: file.type });
              }
            } else if (value === 0) {
              self.respuestas.push({ resp: resp, value: value, file: reader.result, name: file.name, type: file.type });
            } else {
              self.respuestas = [];
              self.resp1 = '';
            }
            self.respInc = '';
          }

      };
    } else {
      this.popToast('error', 'Generar Examen', 'Solo puede agregar imágenes');
    }
  }

  Borrar() {
    this.examen = [];
    this.respuestas = [];
    this.preguntas = '';
    this.resp1 = '';
    this.pa = false;
    this.respInc = '';
    this.tipoexamenId = 0;
    this.nomExamen = '';
    this.se.setValue('');
    this.imgPregunta = []; // { Pregunta: '', Tipo: 0, file: '', name: '', type: '' };
    this.img = false;
    this.descripcion = '';

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

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }


}
