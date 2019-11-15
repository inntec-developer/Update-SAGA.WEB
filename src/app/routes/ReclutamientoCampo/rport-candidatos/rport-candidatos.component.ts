import { DlgCandidatoToRequiComponent } from './../../../components/dlg-candidato-to-requi/dlg-candidato-to-requi.component';
import { Component, OnInit, Input } from '@angular/core';
import { ToasterConfig, ToasterService, Toast } from 'angular2-toaster';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DlgEditarCandidatosComponent } from '../dlg-editar-candidatos/dlg-editar-candidatos.component';
import { ReclutamientoCampoService } from '../../../service/ReclutamientoCampo/reclutamiento-campo.service';
const Swal = require('sweetalert2');
@Component({
  selector: 'app-rport-candidatos',
  templateUrl: './rport-candidatos.component.html',
  styleUrls: ['./rport-candidatos.component.scss']
})
export class RportCandidatosComponent implements OnInit {

  requisicionId;
  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';

  // Varaibles del paginador
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  registros: number;
  clearFilter = false;
  dataSource = [];

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-info', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Localidad', className: 'text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad',
    filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    { title: 'Genero', className: 'text-info', name: 'genero', filtering: { filterString: '', placeholder: 'Genero' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'TELEFONO', className: 'text-info', name: 'telefono', filtering: { filterString: '', placeholder: 'Telefono' } },
    { title: 'EMAIL', className: 'text-info', name: 'email', filtering: { filterString: '', placeholder: 'Email' } },
    { title: 'Reclutador', className: 'text-info', name: 'reclutador', filtering: { filterString: '', placeholder: 'Reclutador' } }
  ];

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-striped mb-0 d-table-fixed']
  };

  candidatoId: any;
  ProcesoCandidatoId: any;
  rowAux: any = [];
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
  vacantes: any;
  reclutador: any;
  vBtra: any;
  reclutadorId: any;
  rowIndex = -1;
  objLiberar: { RequisicionId: any; CandidatoId: any; ReclutadorId: any; ProcesoCandidatoId: any; }[];
  dlgLiberar: boolean;
  data: any;

  constructor(private _service: PostulateService, private settings: SettingsService,
     private toasterService: ToasterService,
     private _campoService: ReclutamientoCampoService,
     private router: Router,
     private _Route: ActivatedRoute,
     private dialog: MatDialog) {
      this._Route.queryParams.subscribe(params => {
        if (params['requisicionId'] != null) {
          this.data = params;
          this.requisicionId = params['requisicionId'];
          this.reclutador = params['reclutador'];
          this.reclutadorId = params['reclutadorId'];
          this.vBtra = params['vBtra'];
          this.GetCandidatos();
        }
      });
      }

  ngOnInit() {
  }

  Regresar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'reclutador': this.reclutador,
        'reclutadorId': this.reclutadorId
      },
      skipLocationChange: true
    };
    this.router.navigate(['/webcampo/reclutadorvacantes'], navigationExtras);
  }
  GetCandidatos() {
    this._campoService.GetCandidatosProceso(this.requisicionId).subscribe(data => {
      this.dataSource = [];
      data.forEach(element => {
        if(element.apartados != null) {
          this.dataSource.push({
            candidatoId: element.candidatoId,
            horario: element.horario,
            nombre: element.apartados.nombre,
            nom: element.apartados.nombre,
            apellidoPaterno: element.apartados.apellidoPaterno,
            apellidoMaterno: element.apartados.apellidoMaterno,
            localidad: element.apartados.localidad,
            edad: element.apartados.edad,
            curp: element.apartados.curp,
            lada: element.apartados.lada,
            telefono: element.apartados.telefono,
            email: element.apartados.email,
            genero: element.apartados.genero,
            reclutador: element.apartados.reclutador,
            reclutadorId: element.apartados.reclutadorId,
            procesoId: element.procesoId,
            propietarioId: element.propietarioId,
            vacantes: element.vacantes,
            EstadoNacimientoId: 0,
            estatusId: element.estatusId
          });
        }
        if (element.informacion != null) {
        this.dataSource.push({
          candidatoId: element.candidatoId,
          horario: element.horario,
          nombre: element.informacion.nombre,
          nom: element.informacion.nom,
          apellidoPaterno: element.informacion.apellidoPaterno,
          apellidoMaterno: element.informacion.apellidoMaterno,
          localidad: element.informacion.localidad,
          edad: element.informacion.edad,
          curp: element.informacion.curp,
          lada: element.informacion.lada,
          telefono: element.informacion.telefono,
          email: element.informacion.email,
          genero: element.informacion.genero,
          reclutador: element.informacion.reclutador,
          reclutadorId: element.informacion.reclutadorId,
          procesoId: element.procesoId,
          propietarioId: element.propietarioId,
          vacantes: element.vacantes,
          EstadoNacimientoId: element.informacion.estadoNacimiento,
          estatusId: element.estatusId
        });
      }
      });
      this.onChangeTable(this.config);
      console.log(this.dataSource);
    });
  }

  public onCellClick(data: any, rowIndex) {

    data.selected ? data.selected = false : data.selected = true; // para poner el background cuando seleccione
    data.selected ? this.candidatoId = data.candidatoId : this.candidatoId = null; // agrega y quita el row seleccionado
    data.selected ? this.ProcesoCandidatoId = data.procesoId : this.ProcesoCandidatoId = null;
    this.vacantes = data.vacantes;
    this.rowIndex = rowIndex;
   
    if (this.rowAux.length === 0) {
      this.rowAux = data;
    } else if (data.selected && this.rowAux !== []) {
      const aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

    //#region filtros y paginacion


    public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
      const start = (page.page - 1) * page.itemsPerPage;
      const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }

    public changeFilter(data: any, config: any): any {
      let filteredData: Array<any> = data;
      this.columns.forEach((column: any) => {
        this.clearFilter = true;
        if (column.filtering.filterString !== '') {
          filteredData = filteredData.filter((item: any) => {
            if (item[column.name] != null) {
              return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
            }
          });
        }
      });
      return filteredData;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
      if (config.filtering) {
        (<any>Object).assign(this.config.filtering, config.filtering);
      }

      this.registros = this.dataSource.length;
      this.rows = this.dataSource;
      const filteredData = this.changeFilter(this.dataSource, this.config);
      this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
      this.length = filteredData.length;
    }

    editar() {
      const dialogDlt = this.dialog.open(DlgEditarCandidatosComponent, {
        width: '90%',
        height: 'auto',
        data: this.rowAux,
        disableClose: true
      });
      dialogDlt.afterClosed().subscribe(result => {
        if (result === 0) {
          this.popToast('warning', 'EDITAR CANDIDATO', 'No se realizó ningún cambio');
          this.onChangeTable(this.config);
        } else {
          this.dataSource[this.rowIndex] = result;
          this.rowAux = result;
          this.popToast('success', 'EDITAR CANDIDATO', 'Los cambios se realizaron con éxito');
          this.onChangeTable(this.config);
        }
      });
    }
    openDialogLiberar(row) {
      console.log(row)
      this.objLiberar = [{
        RequisicionId: this.requisicionId,
        CandidatoId: row.candidatoId,
        ReclutadorId: this.settings.user['id'],
        ProcesoCandidatoId: this.ProcesoCandidatoId,
      }];
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: 'Se liberará el candidato ' + row.nombre + ' de la vacante ' + this.vBtra,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '!SI, LIBERAR!',
        cancelButtonText: '¡NO, CANCELAR!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.dlgLiberar = true;
//  swalWithBootstrapButtons.fire('LIBERAR CANDIDATO', 'Se libero correctamente', 'success');

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'CANCELADO',
            'No se realizó ningún cambio',
            'error'
          );
        }
      });

    }

    openDialogApartar(row) {
      const dialogDlt = this.dialog.open(DlgCandidatoToRequiComponent, {
        width: '90%',
        height: 'auto',
        data: {vBtra: this.vBtra, reclutador: this.reclutador, requisicionId: this.requisicionId},
        disableClose: true
      });
      dialogDlt.afterClosed().subscribe(result => {
        this.refreshTable();
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
      });

    }
    onClose(value) {
      if (value === 200) {
        this.dlgLiberar = false;
        this.objLiberar = [];
        this.refreshTable();
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
      } else if (value === 404) {
        this.dlgLiberar = false;
        this.objLiberar = [];
        this.onChangeTable(this.config);
        this.popToast('error', 'Error', 'No se realizó ningun cambio');
      } else {
        this.objLiberar = [];
        this.dlgLiberar = false;
      }
    }
    public clearfilters() {
      this.clearFilter = false;
      // (<HTMLInputElement>document.getElementById('filterInput')).value = '';
      this.columns.forEach(element => {
        element.filtering.filterString = '';
        (<HTMLInputElement>document.getElementById(element.name + '_1')).value = '';
      });
      this.onChangeTable(this.config);
    }

    public refreshTable() {
        this.columns.forEach(element => {
          element.filtering.filterString = '';
         (<HTMLInputElement>document.getElementById(element.name + '_1')).value = '';
        });
        this.rowAux = [];
        this.rowIndex = -1;
        this.GetCandidatos();
      }
    //#endregion

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);

  }
}
