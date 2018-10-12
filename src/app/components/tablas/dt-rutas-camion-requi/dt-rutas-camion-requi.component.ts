import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogRutasComponent } from './dialog-rutas/dialog-rutas.component';
import { MatDialog } from '@angular/material';
import { ModalDirective } from 'ngx-bootstrap';
import { RequisicionesService } from '../../../service';

const swal = require('sweetalert');

@Component({
  selector: 'app-dt-rutas-camion-requi',
  templateUrl: './dt-rutas-camion-requi.component.html',
  styleUrls: ['./dt-rutas-camion-requi.component.scss'],
  providers: [RequisicionesService]
})
export class DtRutasCamionRequiComponent implements OnInit {
  @Input('DireccionId') DireccionId: string;
  @Input('DAMFO290Id') DAMFO290Id: string;
  @ViewChild('RutasModal') ShownModal: ModalDirective;
  rowAux = [];

  private rows: Array<any> = [];
  private ruta: any = null;
  isModalRutasShown: boolean = false;
  RutaCamion: string = '';
  ViaCamion: string = '';
  Accion: string;
  Edit: boolean;
  TableDisable: boolean = false;

  constructor(
    private dialog: MatDialog,
    private rutasService: RequisicionesService,
    private toasterService: ToasterService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.DireccionId != null) {
      this.cargarRutas(this.DireccionId);
    } else if (this.DAMFO290Id != null) {
      this.cargarRutasDamfo(this.DAMFO290Id);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.DireccionId && !changes.DireccionId.isFirstChange()) {
      this.cargarRutas(this.DireccionId);
    }
    if (changes.DAMFO290Id && !changes.DAMFO290Id.isFirstChange()) {
      this.cargarRutasDamfo(this.DAMFO290Id);
    }
  }




  // Acciones para rutas de la direcición de Requisición.
  cargarRutas(id): void {
    this.rutasService.getRequiRutasCamion(id).subscribe(data => {
      this.rows = data;
      if(this.rows.length == 0){
        this.TableDisable = true;
      }
    }, err => {
      console.error(err)
    })
  }

  public columns: Array<any> = [
    { title: 'Ruta', className: 'text-info text-center' },
    { title: 'Vía', className: 'text-info text-center' },
  ]

  public config: any = {
    className: ['table-striped table-bordered mb-0 -d-table-fixed']
  };

  public onCellClick(data: any): any {
    let index = this.rows.indexOf(data.row);
    this.ruta = data;
    data.selected ? data.selected = false : data.selected = true;
    if (!data.selected) {
      this.ruta = null;
    }

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    }
    else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }


  agregarRutasCamion() {
    let ruta = {
      DireccionId: this.DireccionId,
      Edit: false
    }
    let dialogRuta = this.dialog.open(DialogRutasComponent, {
      width: '25%',
      height: 'auto',
      data: ruta
    });
    dialogRuta.afterClosed().subscribe(result => {
      if(result){
        this.rows = result;
        if(this.rows.length > 0){
          this.TableDisable = false;
        }
      }
    });
  }

  updateRutasCamion() {
    let ruta = {
      Id: this.ruta.id,
      DireccionId: this.DireccionId,
      RutaCamion: this.ruta.ruta,
      ViaCamion: this.ruta.via,
      Edit: true
    }
    let dialogRuta = this.dialog.open(DialogRutasComponent, {
      width: '25%',
      height: 'auto',
      data: ruta
    });
    dialogRuta.afterClosed().subscribe(result => {
      if(result){
        this.rows = result;
        if(this.rows.length > 0){
          this.TableDisable = false;
        }
      }
    });
  }

  private _deleteRuta() {
    if (this.ruta != null) {
      let rc = {
        Id: this.ruta.id,
        DireccionId: this.ruta.direccionId,
        Ruta: this.ruta.ruta,
        Via: this.ruta.via,
        Usuario: sessionStorage.getItem('usuario')
      }
      this.rutasService.deleteRutaCamion(rc).subscribe(data => {
        if (data == 200) {
          this.cargarRutas(this.DireccionId);
          setTimeout(() => {
            let msg = 'La ruta de camión se elimino correctamente.';
            this.popToast('success', 'Ruta de Camión', msg);
            this.ruta = null;
            swal('Eliminada', '', 'success');
          }, 500);

        } else if (data == 404) {
          let msg = 'Algo salio mal intenta de nuevo, si el problema persiste comunicate al departamento de TI.';
          this.popToast('error', 'Ruta de Camión', msg);
        }
      }, err => {
        var msg = err.status + ' : ' + err.message;
        this.popToast('error', 'Ruta de Camión', msg);
      });
    }
  }

  // Acciones para rutas de direcciones del DAMFO 290
  cargarRutasDamfo(Id: string): any {
    this.rutasService.getDamfoRutasCamion(Id).subscribe(data => {
      this.rows = data;
    }, err => {
      console.log(err);
    })
  }

  public columnsD: Array<any> = [
    { title: 'Dirección', className: 'text-info text-center' },
    { title: 'Ruta', className: 'text-info text-center' },
    { title: 'Vía', className: 'text-info text-center' },
  ]

  public configD: any = {
    className: ['table-striped table-bordered mb-0 -d-table-fixed']
  };

  public onCellClickD(data: any): any {
    let index = this.rows.indexOf(data.row);
    this.ruta = data;
    data.selected ? data.selected = false : data.selected = true;
    if (!data.selected) {
      this.ruta = null;
    }

    if (this.rowAux.length == 0) {
      this.rowAux = data;
    }
    else if (data.selected && this.rowAux != []) {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }


  /*
  * Creacion de mensajes
  * */

  sweetalertDeleteRuta() {
    swal({
      title: 'Eliminar ruta de camión',
      text: 'Esta seguro que desea eliminar la ruta ' + this.ruta.ruta + ' ' + this.ruta.via,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Si, Eliminar.',
      cancelButtonText: 'No, Cancelar',
      closeOnConfirm: false,
      closeOnCancel: false,
    }, (isConfirm) => {
      if (isConfirm) {
        this._deleteRuta();
      } else {
        swal('Cancelado', 'La ruta de camión no sufrio cambios.', 'error');
      }
    });
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
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    }
    this.toasterService.pop(toast);
  }
}
