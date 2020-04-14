import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import { SettingsService } from '../../../core/settings/settings.service';
const swal = require('sweetalert2');
@Component({
  selector: 'app-generar-entrevista',
  templateUrl: './generar-entrevista.component.html',
  styleUrls: ['./generar-entrevista.component.scss']
})
export class GenerarEntrevistaComponent implements OnInit {
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';
  
  rowAux: any = [];
  preguntas: any = [];

  cuestionarios = [];
  cuestionario = [];
  descripcion = '';
  descripcionEnt = '';
  nombre = '';
  nomExamen = '';
  todas = false;
  alea = 0;
  max = 1;
  entForm: FormGroup;

  constructor(private service: ExamenesService, private settings: SettingsService) {
   this.entForm = new FormGroup({
      'controlCuestionarios': new FormControl(''),
      'controlTodas': new FormControl(false),
      'controlAlea': new FormControl(0, [Validators.required, Validators.max(this.max)]),
      'controlDesc': new FormControl('', [Validators.required]),
      'controlNombre': new FormControl('', [Validators.required])
    });
   }

  ngOnInit() {
    this.GetExamenes();
  }

  GetExamenes() {
    this.service.GetExamenes(10).subscribe(data => {
      this.cuestionarios = data;
    });
  }

  GetExamen(ExamenId) {
    this.service.GetExamen(ExamenId).subscribe(data => {
      this.cuestionario = data;
      this.alea = 0;
      this.todas = false;
      this.max = this.cuestionario.length;
    });
  }

  AgregarPregunta(p, index) {
    p.selected = !p.selected;
    if (p.selected) {
      this.preguntas.push(p);
    } else {
      const idx = this.preguntas.findIndex(x => x.preguntaId === p.preguntaId);
      if (idx !== -1) {
        this.preguntas.splice(idx, 1);
      }
    }
    this.rowAux = p;
  }

  SelectAll() {
    if (this.todas) {
      if ((this.preguntas || [] ).length === 0) {
        this.preguntas = JSON.parse(JSON.stringify(this.cuestionario));
      } else {
        this.preguntas = this.preguntas.concat(JSON.parse(JSON.stringify(this.cuestionario)));
      }
      this.cuestionario.forEach(x => x.selected = true);
    } else {
      this.preguntas = [];
      this.cuestionario.forEach(x => x.selected = false);
    }
  }
  SelectAlea() {
    if ( (this.preguntas || [] ).length === 0) {
      this.preguntas = JSON.parse(JSON.stringify(this.cuestionario));
      this.preguntas.sort(() => Math.random() - this.alea);
      this.preguntas = this.preguntas.splice(0, this.alea);
    } else {
      let aux = JSON.parse(JSON.stringify(this.cuestionario));
      aux.sort(() => Math.random() - this.alea);
      aux = aux.splice(0, this.alea);
      this.preguntas = this.preguntas.concat(aux);
    }
  }

  GenerarEntrevista() {
    this.preguntas.forEach((element, idx) => {
      element.Orden = idx + 1;
    });
    const aux = {
      Nombre: this.nombre,
      Descripcion: this.descripcionEnt,
      Preguntas: this.preguntas,
      usuarioId: this.settings.user['id']
    };
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿ESTÁS SEGURO?',
      html: '¡Se generará entrevista ' + this.nombre + ' total de preguntas ' +
      '<strong>' + this.preguntas.length.toString() + '</strong>!' + '<br/><br/>' +
      'El proceso puede durar varios segundos por favor espere',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI, GENERAR',
      cancelButtonText: 'CANCELAR',
      reverseButtons: true
    }).then((isConfirm) => {
      if (isConfirm.value) {
        this.service.InsertEntrevista(aux).subscribe(data => {
          if (data === 200) {
           this.Borrar();
            this.entForm.controls.controlCuestionarios.reset();
            this.nombre = '';
            this.descripcionEnt = '';
            this.cuestionario = [];
            swalWithBootstrapButtons.fire(
              'GENERAR ENTREVISTA',
              '¡El proceso se realizó con éxito!',
              'success'
            );
          } else {
            swalWithBootstrapButtons.fire('ERROR',
            'Ocurrió un error al intentar generar entrevista. Por farvor intentelo de nuevo', 'error');
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        isConfirm.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('CANCELADO', 'No se realizó ningún cambio', 'error');
      }
    });
  }

  Borrar(): void {
    this.preguntas = [];
    this.alea = 0;
    this.todas = false;
  }
  ValidarMax() {
    if (this.entForm.controls.controlAlea.value > this.cuestionario.length) {
      this.entForm.controls.controlAlea.setValue(this.cuestionario.length);
    }
  }
}
