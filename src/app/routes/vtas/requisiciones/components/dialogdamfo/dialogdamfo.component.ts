import { SettingsService } from './../../../../../core/settings/settings.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequisicionesService } from '../../../../../service/index';

const swal = require('sweetalert2');

@Component({
  selector: 'app-dialogdamfo',
  templateUrl: './dialogdamfo.component.html',
  styleUrls: ['./dialogdamfo.component.scss'],
  providers: [RequisicionesService]
})
export class DialogdamfoComponent implements OnInit, OnChanges {
  IdDamfo: string;
  formDireccion: FormGroup;
  IdDireccion: string;
  DisabledButton = false;
  HorariosVacantes: any;
  requisicionId: any;
  IdEstatus: number;
  confidencial = false;
  warn = 'warn';
spinner = false;

  constructor(
    private settings: SettingsService,
    private serviceRequisiciones: RequisicionesService,
    public dialogRef: MatDialogRef<DialogdamfoComponent>,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: RequisicionesService
  ) {
    dialogRef.disableClose = true;
  }

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7, tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 2000,
      body: body
    };
    this.toasterService.pop(toast);
  }
  ngOnInit() {
    this.IdDamfo = this.data.id;
    this.formDireccion = new FormGroup({
      direccion: new FormControl()
    });
  }
  FiltroDireccion(event) {
    if (!event.returnValue) {
      this.IdDireccion = event;
    } else {
      this.IdDireccion = null;
    }
  }
  ngOnChanges(change: SimpleChanges) {
    if (change.IdDireccion && !change.IdDireccion.isFirstChange()) {
      alert(this.IdDireccion);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }

  createRequisicion() {
    this.DisabledButton = true;
    let horarios = '';
    if (this.IdDireccion != null) {
      this.service.getVacantesDamfo(this.IdDamfo).subscribe(data => {
        this.HorariosVacantes = data;
        this.DisabledButton = false;
        this.HorariosVacantes.forEach(element => {
          horarios = horarios + element.nombre + ' (' + element.vacantes + ') \n';
        });
        if (this.data.tipoReclutamiento === 'Puro') {
          this.IdEstatus = 43;
        } else {
          this.IdEstatus = 4;
        }
        this.Crear();
      }, err => {
        console.log(err);
      });
    } else {
      this.popToast('error', 'Oops!!', 'Seleccione una dirección para continuar');
      this.DisabledButton = false;
    }

  }

 Crear() {
    this.spinner = true;
       const obj = {
      IdDamfo: this.IdDamfo,
      IdAddress: this.IdDireccion,
      IdEstatus: this.IdEstatus,
      Usuario: this.settings.user['usuario'],
      UsuarioId: this.settings.user['id'],
      Confidencial: this.confidencial
      };

      this.serviceRequisiciones.createNewRequi(obj).subscribe(result => {
        if (result !== 404) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              id: result.id,
              folio: result.folio,
              estatusId: result.estatusId,
              tipoReclutamientoId: result.tipoReclutamientoId,
              horariosRequi: JSON.stringify(result.horariosRequi)
            },
            skipLocationChange: true
          };

         this.requisicionId = result.id;
          if (this.confidencial === false) {
            this.serviceRequisiciones.PublicarNuevaRequisicion(this.requisicionId).subscribe(x => {
              // hacer un log en la api para cuando tenga error el publicar requisicion
              // if (x !== 404) {
              //   this.popToast('success', 'Publicación de Requisición',
              //     'Se ha publicado correctamente en Bolsa de Trabajo la requisición.');
              // } else {
              //   this.popToast('error', 'Nueva Requisicion', 'Error al intentar publicado en Bolsa de Trabajo la requisición.');
              // }
              this.onNoClick();
              swal.fire({
                position: 'center',
                type: 'success',
                title: '<h4 class="text-info">¡REQUISICIÓN GENERADA!</h4>',
                html: '<p class="text-warning">Capture número de vacantes y asigne un Coordinador.</p>',
                showConfirmButton: false,
                timer: 3000,
                onClose: () => {
                  this._Router.navigate(['/ventas/requisicionNueva/'], navigationExtras);
                }
              });
            });
          } else {
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '<strong>¡REQUISICIÓN GENERADA!</strong>',
              html: '<p class="text-warning">Capture número de vacantes y asigne un Coordinador.</p>',
              showConfirmButton: false,
              timer: 2500,
              onClose: () => {
                this.onNoClick();
                this._Router.navigate(['/ventas/requisicionNueva/'], navigationExtras);
              }
            });
          }
          this.spinner = false;
        } else {
          this.spinner = false;
          swal('ERROR', 'Algo salió mal al intentar generar la requisición.', 'error');
        }
      });
  }

}
