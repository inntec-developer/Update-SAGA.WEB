import { VacantesReclutadorComponent } from './../../routes/recl/vacantes/vacantes/vacantes-reclutador/vacantes-reclutador.component';
import { SettingsService } from './../../core/settings/settings.service';
import { PostulateService } from './../../service/SeguimientoVacante/postulate.service';
import { Component, OnInit, Input } from '@angular/core';
import { Toast, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-candidatos-cubiertos-rport',
  templateUrl: './candidatos-cubiertos-rport.component.html',
  styleUrls: ['./candidatos-cubiertos-rport.component.scss']
})
export class CandidatosCubiertosRportComponent implements OnInit {
  @Input() RequisicionId;

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
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'NSS', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'Sexo', className: 'text-info', name: 'genero', filtering: { filterString: '', placeholder: 'Genero' } },
    { title: 'Reclutador', className: 'text-info', name: 'reclutador', filtering: { filterString: '', placeholder: 'Reclutador' } }
  ];

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-striped mb-0 d-table-fixed']
  };
  objLiberar: { RequisicionId: any; CandidatoId: any; ReclutadorId: any; ProcesoCandidatoId: any; }[];
  candidatoId: any;
  ProcesoCandidatoId: any;
  dlgLiberar = false;
  rowAux = [];
  liberado = false;

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


  constructor(private _service: PostulateService, private settings: SettingsService,
     private toasterService: ToasterService) { }

  ngOnInit() {
    this.GetCandidatos();
  }

  GetCandidatos() {
    this._service.GetCandidatosCubiertos(this.RequisicionId).subscribe(data => {
      this.dataSource = [];
      data.forEach(element => {
        if (element.informacion != null) {
        this.dataSource.push({
          candidatoId: element.candidatoId,
          horario: element.horario,
          nombre: element.informacion.nombre,
          localidad: element.informacion.localidad,
          edad: element.informacion.edad,
          curp: element.informacion.curp,
          rfc: element.informacion.rfc,
          nss: element.informacion.nss,
          genero: element.informacion.genero,
          reclutador: element.informacion.reclutador,
          reclutadorId: element.informacion.reclutadorId,
          procesoId: element.procesoId,
          propietarioId: element.propietarioId,
          vacantes: element.vacantes
        });
      }
      });
      this.onChangeTable(this.config);
    });
  }

  openDialogLiberar() {

    this.objLiberar = [{
      RequisicionId: this.RequisicionId,
      CandidatoId: this.candidatoId,
      ReclutadorId: this.settings.user['id'],
      ProcesoCandidatoId: this.ProcesoCandidatoId,
    }];

    this.dlgLiberar = true;
  }

  public onCellClick(data: any) {

    data.selected ? data.selected = false : data.selected = true; // para poner el background cuando seleccione
    data.selected ? this.candidatoId = data.candidatoId : this.candidatoId = null; // agrega y quita el row seleccionado
    data.selected ? this.ProcesoCandidatoId = data.procesoId : this.ProcesoCandidatoId = null;
this.vacantes = data.vacantes;
    if (this.settings.user['id'] === data.reclutadorId || this.settings.user['id'] === data.propietarioId) {
      this.liberado = true;
    } else {
      this.liberado = false;
    }

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

  onClose(value) {
    if (value === 200) {
      this.dlgLiberar = false;
      this.objLiberar = [];
      if (this.dataSource.length === this.vacantes ) {
        const datosVacante = { estatusId: 33, requisicionId: this.RequisicionId };
      } else {
        const datosVacante = { estatusId: 31, requisicionId: this.RequisicionId };
      }
      this._service.SetProcesoVacante(datosVacante).subscribe(data => {
        if (data !== 417) {
        this.GetCandidatos();
        this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
        } else {
          this.GetCandidatos();
          this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar el estatus de la vacante');
        }
      });
    } else if (value === 404) {
      this.dlgLiberar = false;
      this.objLiberar = [];
      this.onChangeTable(this.config);
      this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar datos');

    } else {
      this.objLiberar = [];
      this.dlgLiberar = false;
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
        this.GetCandidatos();
      }
    //#endregion

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
