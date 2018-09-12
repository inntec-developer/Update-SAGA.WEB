import { element } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from './../../service/SeguimientoVacante/postulate.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-buttons-postulaciones',
  templateUrl: './buttons-postulaciones.component.html',
  styleUrls: ['./buttons-postulaciones.component.scss']
})
export class ButtonsPostulacionesComponent implements OnInit {

  @Input() RequisicionId;
  @ViewChild('MessageModal') ShownModal: ModalDirective;
 
  public dataSource: Array<any> = [];
  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = {};
  postulados: any;
  candidatoId;
  isModalShown: boolean = false;
  contratado = true;
  cr = true; //cita reclutamiento
  enr = true; //entrevista reclutamiento
  fr = true; //finalista reclutameinto
  enc = true; //entrevista cliente
  fc = true; // finalista cliente
  evt = true; //evaluacion tecnica
  evps = true; //evaluacion psicometrica
  evm = true; //evaluacion medica
  pst = true; //postulado
  liberado = true; //liberado
  rowAux = [];

  constructor(private service: PostulateService, private toasterService: ToasterService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getpostulados();
  }

  ValidarEstatus(estatus)
  {
    if(estatus === 10 || estatus === 12) //postulado apartado
    {
      this.cr = false;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
      this.contratado = true;
    }
    else if(estatus === 24) //contratado
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = true;
      this.contratado = true;
    }
    else if(estatus === 17) //cita reclutamiento
    {
      this.cr = true;
      this.enr = false;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
    }
    else if(estatus === 18) //entrevista reclutamiento
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = false;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
    }
    else if(estatus === 21) //finalista reclutamiento
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = false;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
    }
    else if(estatus === 22) //entrevista cliente
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = false;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
    }
    else if(estatus === 23) //finalista cliente
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.contratado = false
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
    }
    else if(estatus === 13) // evalución técnica, psicométrica, médica
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = false;
      this.evm = false;
      this.pst = true;
      this.liberado = false;
    }
    else if( estatus === 14)
    {
      this.cr = true;
      this.enr = true;
      this.fr = false;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = false;
      this.pst = true;
      this.liberado = false;
    }
    else if( estatus === 15)
    {
      this.cr = true;
      this.enr = true;
      this.fr = false;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = true;
      this.liberado = false;
    }
    else if( estatus === 27) //liberado
    {
      this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.pst = false;
      this.liberado = true;
    }
 
  }
  getpostulados() {
    this.service.GetProceso(this.RequisicionId, localStorage.getItem('id')).subscribe(data => { 
      this.dataSource = [];
      data.forEach(element => {
        var perfil = {
          nombre: element.perfil[0]['nombre'],
          areaExp: element.perfil[0]['areaExp'],
          areaInt: element.perfil[0]['areaInt'],
          curp: element.perfil[0]['curp'],
          rfc: element.perfil[0]['rfc'],
          edad: element.perfil[0]['edad'],
          localidad: element.perfil[0]['localidad'],
          sueldoMinimo: element.perfil[0]['sueldoMinimo'],
          estatus: element.estatus,
          candidatoId: element.candidatoId,
          estatusId: element.estatusId
        }
        this.dataSource.push(perfil)
        
      })
    }, error => this.errorMessage = <any>error);
  }

  SetProceso(estatusId)
  {
    if(this.candidatoId != null)
    {
      var datos = {candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: 0};

      this.service.SetProceso(datos).subscribe(data => {
        if(data == 201)
        {
          this.SetStatusBolsa(this.candidatoId, estatusId);

          this.cr = true;
          this.enr = true;
          this.fr = true;
          this.enc = true;
          this.fc = true;
          this.contratado = true;
          this.evt = true;
          this.evps = true;
          this.evm = true;
          this.pst = true;
          this.liberado = true;
          this.getpostulados();
        }
      })
    }

  }

  SetStatusBolsa(candidatoId, estatusId)
  {
    if(this.candidatoId != null)
    {
      if( estatusId === 10 || estatusId === 12)
      {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 1};
      }
      else if( estatusId == 13 || estatusId == 14 || estatusId == 15)
      {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 2};
      }
      else if(estatusId == 16 || estatusId == 17 || estatusId == 18)
      {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 3};
      }
      else if(estatusId == 21 || estatusId == 22 || estatusId == 23)
      {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 4};
      }
      else if(estatusId == 24 || estatusId == 25 || estatusId == 27)
      {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 5};
      }

      this.service.SetStatusBolsa(datos).subscribe(data => {
        if(data == 201)
        {
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');    
        }
      })
    }

  }

  public onCellClick(data: any) {

    data.selected ? data.selected = false : data.selected = true; //para poner el backgroun cuando seleccione
    data.selected ? this.candidatoId = data.candidatoId : this.candidatoId = null; //agrega y quita el row seleccionado

    if(!data.selected)
    {
      this.cr = false;
      this.enr = false;
      this.fr = false;
      this.enc = false;
      this.fc = false;
      this.contratado = false;
      this.evt = false;
      this.evps = false;
      this.evm = false;
    }
    else
    {
      this.ValidarEstatus(data.estatusId)
    }

    if(this.rowAux == [])
    {
      this.rowAux = data;
    }
    else if(this.rowAux != [] && data.selected)
    {
      var aux = data;
      data = this.rowAux;
      data.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
    
    // let index = this.dataSource.indexOf(data.row);
    // this.element = data;
    // /* add an class 'active' on click */
    // $('#resultDataTable').on('click', 'tr', function (event: any) {
    //   //noinspection TypeScriptUnresolvedFunction
    //   $(this).addClass('selected').siblings().removeClass('selected');
    // });
  }


  VerCandidato(row)
  {
     
    this.candidatoId = row.candidatoId;
    this.isModalShown = true;

    this.ValidarEstatus(row.estatusId);
    //this.spinner.show();
  //   setTimeout(() => {
  //     /** spinner ends after 5 seconds */
  //     this.spinner.hide();

  // }, 1000);

  }

refresh()
{
  this.getpostulados();
  this.cr = true;
      this.enr = true;
      this.fr = true;
      this.enc = true;
      this.fc = true;
      this.contratado = true;
      this.evt = true;
      this.evps = true;
      this.evm = true;
      this.liberado = true;
      this.pst = true;
}

  closeModal()
  {
    this.ShownModal.hide();
    this.isModalShown = false;
  }
    
  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Nombre Candidato', className: 'text-primary', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-primary', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-primary', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-primary', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-primary text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-primary text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'Estatus', className: 'text-primary text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } }
  ]

  public config: any = {
    paging: true,
    //sorting: { colums: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped mb-0 d-table-fixed']
  }

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    debugger;
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        this.showFilterRow = true;
        filteredData = filteredData.filter((item: any) => {
          if (item[column.name] != null)
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name] == null) {
          flag = true;
        } else {
          if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
            flag = true;
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    debugger;
    if (config.filtering) {
      (<any>Object).assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      (<any>Object).assign(this.config.sorting, config.sorting);
    }
    this.registros = this.dataSource.length;
    this.rows = this.dataSource;
    let filteredData = this.changeFilter(this.dataSource, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
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
