import { Component, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { AsignarRequis } from '../../../../../../../models/models';
import { AsignarRequisicionComponent } from './../../../../../../../components/asignar-requisicion/asignar-requisicion.component';
import { RequisicionesService } from '../../../../../../../service/requisiciones/requisiciones.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../../../../core/settings/settings.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const swal = require('sweetalert');

@Component({
  selector: 'app-dialog-assing-requi',
  templateUrl: './dialog-assing-requi.component.html',
  styleUrls: ['./dialog-assing-requi.component.scss'],
  providers: [
    RequisicionesService,
    AsignarRequis,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class DialogAssingRequiComponent implements OnInit {
  @ViewChild('asginaciones') asignaciones: AsignarRequisicionComponent;
  public Ponderacion = [
    {
      Id: 1,
      Ponderacion: 1
    },
    {
      Id: 2,
      Ponderacion: 2
    },
    {
      Id: 3,
      Ponderacion: 3
    }
  ];
  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  placeHolderSelect: string;
  loading: boolean;
  public return: any;
  public formAsignaciones: FormGroup;
  public formRS: FormGroup;
  asignadosRequi: any = [];
  alertAssing: boolean;
  RequiId: string;
  checked: boolean;
  today: any;
  Confidencial: boolean;
  redesSociales: boolean;
  oficiorequisicionId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceRequisicion: RequisicionesService,
    public dialogAssing: MatDialogRef<DialogAssingRequiComponent>,
    public fb: FormBuilder,
    public asignarRequi: AsignarRequis,
    private _Router: Router,
    private settings: SettingsService
  ) {
    dialogAssing.disableClose = true;
    this.placeHolderSelect = 'ASIGNAR RECLUTADORES';
    this.formAsignaciones = new FormGroup({
      fch_Cumplimiento: new FormControl('', [Validators.required]),
      diasEnvio: new FormControl('', [Validators.required]),
      Ponderacion: new FormControl('', [Validators.required])
    })
    this.formRS = new FormGroup({
      Oficio: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      Comentario: new FormControl('', [Validators.maxLength(500)])
    });
  }
  ngOnInit() {
    this.initForm();
    this.getInformacion();
    this.getAsignacion(this.data.asignados);
  }

  initForm() {
    this.formAsignaciones = this.fb.group({
      fch_Cumplimiento: ['', Validators.required],
      diasEnvio: ['', Validators.required],
      Ponderacion: ['', Validators.required]
    });
    this.formRS = this.fb.group({
      Oficio: ['', [Validators.required, Validators.maxLength(100)]],
      Comentario: ['', Validators.maxLength(500)]
    });
  }

  getInformacion() {
    if (this.data != null) {
      let Ponderacion = 0;
      if (this.data['ponderacion'] == null) {
        switch (this.data['claseReclutamientoId']) {
          case 1:
            Ponderacion = 3;
            break;
          case 2:
            Ponderacion = 2;
            break;
          case 3:
            Ponderacion = 1;
            break;
        }
      } else {
        Ponderacion = this.data['ponderacion']['ponderacion'];
      }

      this.today = this.data.fch_Creacion;
      this.RequiId = this.data.id;
      this.Confidencial = this.data.confidencial;
      this.formAsignaciones.patchValue({
        fch_Cumplimiento: this.data.fch_Cumplimiento,
        diasEnvio: this.data.diasEnvio,
        Ponderacion: Ponderacion
      });
      if (this.data['oficio'] != null) {
        this.redesSociales = true;
        this.oficiorequisicionId = this.data['oficio']['id'];
        this.formRS.patchValue({
          Oficio: this.data['oficio']['oficio'],
          Comentario: this.data['oficio']['comentario'] || ''
        });
      }
    }
  }

  onCloseDialog() {
    this.dialogAssing.close();
  }

  getAsignacion($event: any) {
    this.asignadosRequi = $event;
    if (this.asignadosRequi.length > 0) {
      this.alertAssing = false;
    } else {
      this.alertAssing = true;
    }
  }

  Save() {
    if (this.formAsignaciones.get('diasEnvio').value > 0 && this.formAsignaciones.get('diasEnvio').value <= 20) {
      this.loading = true;
      this.asignadosRequi.push(this.settings.user['id']);
      const List = [];

      this.asignadosRequi.forEach(a => {
        List.push({ id: a });
      });

      const list = this._eliminarObjetosDuplicados(List, 'id');
      const asg = [];
      list.forEach(a => {
        asg.push({
          RequisicionId: this.RequiId,
          GrpUsrId: a['id'],
          UsuarioAlta: this.settings.user['usuario'],
          UsuarioMod: this.settings.user['usuario'],
          fch_Modificacion: new Date(),
          Tipo: 2
        });
      });
      // for (let a of list) {
      //   asg.push({
      //     RequisicionId: this.RequiId,
      //     GrpUsrId: a['id'],
      //     CRUD: '',
      //     UsuarioAlta: this.settings.user['usuario'],
      //     UsuarioMod: this.settings.user['usuario'],
      //     fch_Modificacion: new Date()
      //   });
      // }

      const Ponderacion = {
        id: this.data['ponderacion'] ? this.data['ponderacion']['id'] : '',
        ponderacion: this.formAsignaciones.get('Ponderacion').value,
        requisicionId: this.RequiId
      };

      const assing = {
        id: this.RequiId,
        fch_Cumplimiento: this.formAsignaciones.get('fch_Cumplimiento').value,
        diasEnvio: this.formAsignaciones.get('diasEnvio').value,
        usuario: this.settings.user['usuario'],
        aprobadorId: this.settings.user['id'],
        asignacionRequi: asg,
        ponderacion: Ponderacion
      };

      this.asignarRequi = assing;
      this.serviceRequisicion.asignarRequisicion(this.asignarRequi)
        .subscribe(data => {
          this.return = data;
          if (this.return === 200) {
            if (this.redesSociales) {
              const oficio = {
                Id: this.oficiorequisicionId || '',
                Oficio: this.formRS.get('Oficio').value,
                Comentario: this.formRS.get('Comentario').value || '',
                RequisicionId: this.RequiId
              };
              this.serviceRequisicion.SendEmailRedesSociales(oficio).subscribe(result => {
                if (result !== 404) {
                  if (!this.Confidencial) {
                    swal({
                      title: 'Se ha notificado al departamento de medios.',
                      text: 'Desea diseñar la Vacante para Publicar en Bolsa DAMSA ?',
                      type: 'success',
                      showCancelButton: true,
                      confirmButtonText: 'SI, Diseñar',
                      cencelButtomText: 'No',
                      closeOnConfirm: true,
                      showLoaderOnConfirm: true
                    }, (isConfirm: any) => {
                      window.onkeydown = null;
                      window.onfocus = null;
                      if (isConfirm) {
                        this._Router.navigate(['/reclutamiento/configuracionVacante/',
                         this.RequiId, this.data.folio, this.data.vBtra], { skipLocationChange: true });
                      }
                    });
                  } else {
                    swal('Medios / Redes sociales', 'Se ha notificado al departamento de medios.', 'success');
                  }

                  this.dialogAssing.close(true);
                  this.formRS.reset();
                  this.loading = false;
                } else {
                  swal('Redes sociales', 'Algo salio mal al intentar notificar al departamento de redes sociales.', 'error');
                  this.loading = false;
                }
              });
            } else {
              this.dialogAssing.close(true);
              this.loading = false;
              if (!this.Confidencial) {
                swal({
                  title: 'Diseñador de Vacante',
                  text: 'Desea diseñar la vacante para su publicación en Bolsa DAMSA?',
                  type: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'SI, Diseñar',
                  cencelButtomText: 'No',
                  closeOnConfirm: true,
                  showLoaderOnConfirm: true
                }, (isConfirm: any) => {
                  window.onkeydown = null;
                  window.onfocus = null;
                  if (isConfirm) {
                    this._Router.navigate(['/reclutamiento/configuracionVacante/',
                    this.RequiId, this.data.folio, this.data.vBtra], { skipLocationChange: true });
                  }
                });
              } else {
                swal('Asignación', 'La asignación se realizó con éxito', 'success');
              }
            }

            if (!this.redesSociales && !this.data.confidencial) {
              if (this.data.aprobadorId === this.settings.user['id']) {
                swal({
                  title: 'Diseñador de Vacante',
                  text: 'Desea diseñar la vacante para su publicación en Bolsa DAMSA?',
                  type: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'SI, Diseñar',
                  cencelButtomText: 'No',
                  closeOnConfirm: true,
                  showLoaderOnConfirm: true
                }, (isConfirm: any) => {
                  window.onkeydown = null;
                  window.onfocus = null;
                  if (isConfirm) {
                    this._Router.navigate(['/reclutamiento/configuracionVacante/',
                    this.RequiId, this.data.folio, this.data.vBtra], { skipLocationChange: true });
                  }
                });
              }
            }
          } else if (this.return === 300) {
            swal('Aprobación / Asignación Requisición',
            'Este folio ya fue aprobado por otro usuario, actualice la tabla de Vacantes.', 'info');
            this.loading = false;
            this.dialogAssing.close(true);
          } else {
            swal('Aprobación / Asignación Requisición', 'Algo Salio mal intentar actualizar la información.', 'error');
            this.loading = false;
          }
        });
    } else {
    }
  }
  // Funcion para eliminar elementos repetidos de una lista.
  _eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup = {};

    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
  }

  validateAsignados(): boolean {
    if (this.asignadosRequi.length > 0) {
      return true;
    } else {
      return true;
    }
  }

  sweetalertNotificarRedesSociales() {
    swal({
      title: 'Redes Sociales',
      text: 'Desea notificar el departamento de Medio, para la publicación de la vacante en redes sociales',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#00FF00',
      confirmButtonText: 'Si',
      cancelButtonColor: '#FF2D11',
      cancelButtonText: 'No',
      closeOnConfirm: false,
      closeOnCancel: false,
      showLoaderOnConfirm: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        window.onkeydown = null;
        window.onfocus = null;
        this.serviceRequisicion.SendEmailRedesSociales(this.RequiId).subscribe(result => {
          if (result != 404) {
            swal('Redes sociales', 'Se ha notificado con exito la publicacion de la vacante.', 'success');
          } else {
            swal('Redes sociales', 'Algo salio mal al intentar notificar al departamento de redes sociales.', 'error');
          }
        });
      }
    });
  }
}

