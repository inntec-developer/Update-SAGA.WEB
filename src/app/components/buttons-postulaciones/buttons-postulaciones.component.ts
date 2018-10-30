import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { element } from 'protractor';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DialogHorariosConteoComponent } from '../../components/dialog-horarios-conteo/dialog-horarios-conteo.component'
import { DialogLiberarCandidatoComponent } from './../dialog-liberar-candidato/dialog-liberar-candidato.component';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from './../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../service';
import {EditarContratadosComponent} from '../editar-contratados/editar-contratados.component';


@Component({
  selector: 'app-buttons-postulaciones',
  templateUrl: './buttons-postulaciones.component.html',
  styleUrls: ['./buttons-postulaciones.component.scss'],
  providers: [RequisicionesService, PostulateService, InfoCandidatoService, CandidatosService]
})
export class ButtonsPostulacionesComponent implements OnInit {

  @Input() RequisicionId;
  @Input() vacante;
  @Input() clienteId;
  @Input() estatusVacante;


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
  //candidatoId = 'f66da23e-9d69-e811-80e1-9e274155325e';'621ede7a-2fbc-e811-80ea-9e274155325e'
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
  rechazado = true;
  flagContratados = true;
  rowAux = [];
  conteo = [];
  horarioId: any;
  ProcesoCandidatoId: any;

  bsModalRef: BsModalRef;

  constructor(
    private serviceRequi: RequisicionesService,
    private service: PostulateService,
    private serviceLiberar: InfoCandidatoService,
    private serviceCandidato: CandidatosService,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog, 
    private modalService: BsModalService ) {}

  ngOnInit() {
    this.getpostulados();
    this.GetConteoVacante();

  }

  // openModal(templateModal: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(templateModal, { class: 'atras' });
  // }

  ValidarEstatus(estatus) {
    if (estatus === 10 || estatus === 12) //postulado apartado
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
      this.rechazado = true;
    }
    else if (estatus === 24) //contratado
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
      this.liberado = false;
      this.contratado = true;
      this.rechazado = true;
    }
    else if (estatus === 17) //cita reclutamiento
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
      this.rechazado = true;
    }
    else if (estatus === 18) //entrevista reclutamiento
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
      this.rechazado = true;
    }
    else if (estatus === 21) //finalista reclutamiento
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
      this.rechazado = false;
    }
    else if (estatus === 22) //entrevista cliente
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
      this.rechazado = false;
    }
    else if (estatus === 23) //finalista cliente
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
      this.liberado = true;
      this.rechazado = false;
    }
    else if (estatus === 13) // evalución técnica, psicométrica, médica
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
      this.rechazado = true;
    }
    else if (estatus === 14) {
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
      this.rechazado = true;
    }
    else if (estatus === 15) {
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
      this.rechazado = true;
    }
    else if (estatus === 27) //liberado
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
      this.rechazado = true;
    }
    else if (estatus === 40) //liberado
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
      this.pst = true;
      this.liberado = true;
      this.rechazado = true;
    }

  }
  getpostulados() {

    this.service.GetProceso(this.RequisicionId, sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = [];
      data.forEach(element => {
        var perfil = {
          id: element.id,
          horarioId: element.horarioId,
          horario: element.horario,
          nombre: element.perfil[0]['nombre'],
          apellidoPaterno: element.perfil[0]['apellidoPaterno'],
          apellidoMaterno: element.perfil[0]['apellidoMaterno'],
          areaExp: element.perfil[0]['areaExp'],
          areaInt: element.perfil[0]['areaInt'],
          curp: element.perfil[0]['curp'],
          rfc: element.perfil[0]['rfc'],
          nss: element.perfil[0]['nss'],
          edad: element.perfil[0]['edad'],
          localidad: element.perfil[0]['localidad'],
          sueldoMinimo: element.perfil[0]['sueldoMinimo'],
          estatus: element.estatus,
          candidatoId: element.candidatoId,
          estatusId: element.estatusId,
          folio: element.folio,
          usuario: element.usuario,
          usuarioId: element.usuarioId,
          fecha:element.fecha, 
          areaReclutamiento: element.areaReclutamiento, 
          areaReclutamientoId: element.areaReclutamientoId,
          fuenteReclutamiento: element.fuenteReclutamiento,
          fuenteReclutamientoId: element.fuenteReclutamientoId,
          requisicionId: this.RequisicionId,
          paisNacimiento: element.perfil[0]['paisNacimiento'] != null ? element.perfil[0]['paisNacimiento'] : 0, 
          estadoNacimiento: element.perfil[0]['estadoNacimiento'] != null ? element.perfil[0]['estadoNacimiento'] : 0,
          municipioNacimiento: element.perfil[0]['municipioNacimiento'] != null ? element.perfil[0]['municipioNacimiento'] : 0, 
          generoId: element.perfil[0]['generoId'],
          editarCURP: false

        }
        this.dataSource.push(perfil);

      })
    }, error => this.errorMessage = <any>error);
  }

  GetConteoVacante() {
    this.service.GetConteoVacante(this.RequisicionId, this.clienteId).subscribe(data => {
      this.conteo = data;
      this.conteo[0]['contratados'] > 0 ? this.flagContratados = false : this.flagContratados = true;
    })

  }

  GetHorarioRequis(estatusId, estatus) {
    
    this.serviceRequi.GetHorariosRequiConteo(this.RequisicionId).subscribe(data => {
  
      // if (data.length > 0) {
        var aux = data.filter(element => !element.vacantes)

        if(aux.length == 0)
    {
          aux = [{id: 0, nombre: "Los horarios ya están cubiertos"}]
        }

        this.OpenDlgHorarios(aux, estatusId, estatus);
      // }
      // else {
      //   var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId };
      //   this.SetApiProceso(datos, estatusId, estatus);
      // }
    })
  }

  UpdateFuenteReclutamiento(data)
  {
    this.serviceCandidato.UpdateFuenteRecl(data).subscribe(result =>{ console.log(result)});
  }

  OpenDlgHorarios(data, estatusId, estatus) {
    let dialogDlt = this.dialog.open(DialogHorariosConteoComponent, {
      width: '45%',
      height: 'auto',
      data: data,
      disableClose: true
    });
    var window: Window
    dialogDlt.afterClosed().subscribe(result => {
      if (result) {
        this.horarioId = result.horarioId;

        var nom = data.filter(x => x.id == this.horarioId);
        var aux = this.dataSource;
        var idx = aux.findIndex(x => x.candidatoId === this.candidatoId);
        this.dataSource[idx]['horario'] = nom[0]['nombre'];
        this.dataSource[idx]['horarioId'] = this.horarioId;

        var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId, tipoMediosId: result.mediosId };

        this.UpdateFuenteReclutamiento(datos);
        this.SetApiProceso(datos, estatusId, estatus);
      }
      else {
        this.onChangeTable(this.config)
      }
    });
  }



  OpenDialogLiberacion(estatusId,estatus) {
    let dialogLiberar = this.dialog.open(DialogLiberarCandidatoComponent, {
      width: '25%',
      height: 'auto',
    });
    dialogLiberar.afterClosed().subscribe(result => {
      if (result) {
        var data = {
          RequisicionId: this.RequisicionId,
          CandidatoId: this.candidatoId,
          ReclutadorId: sessionStorage.getItem('id'),
          MotivoId: result.motivo,
          ProcesoCandidatoId: this.ProcesoCandidatoId,
          Comentario: result.comentario,
        }
      }
      this.serviceLiberar.setLiberarCandidato(data).subscribe(result => {
          switch(result){
            case 200:{
              var aux = this.dataSource;
              var idx = aux.findIndex(x => x.candidatoId === this.candidatoId);
              this.ValidarEstatus(estatusId);
    
              this.dataSource[idx]['estatusId'] = estatusId;
              this.dataSource[idx]['estatus'] = estatus;
    
              this.onChangeTable(this.config)
              this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');
              break;
            }
            case 404: {
              this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar datos');
              break;
            }
          }
      });
    });
  }

  SetProceso(estatusId, estatus) {
    if (this.candidatoId != null) {
      if(estatusId == 27){
        this.OpenDialogLiberacion(estatusId, estatus);
      }else if (estatusId == 18) {
        this.GetHorarioRequis(estatusId, estatus);
      }
      else  {
        var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId };
        this.SetApiProceso(datos, estatusId, estatus);
      }
    }

  }

  SetApiProceso(datos, estatusId, estatus) {
    this.service.SetProceso(datos).subscribe(data => {
      if (data == 201) {
        this.SetStatusBolsa(this.candidatoId, estatusId, estatus);
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
        this.GetConteoVacante();
      }
      else if (data == 300) {
        this.popToast('info', 'Apartado', 'El candidato ya esta apartado o en proceso');
      }
      else {
        this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar datos')
      }
    })
  }

  SetStatusBolsa(candidatoId, estatusId, estatus) {
    if (this.candidatoId != null) {
      if (estatusId === 10) {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 1 };
      }
      else if (estatusId >= 12 && estatusId <= 15) {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 2 };
      }
      else if (estatusId == 16 || estatusId == 17 || estatusId == 18) {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 3 };
      }
      else if (estatusId == 21 || estatusId == 22 || estatusId == 23) {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 4 };
      }
      else if (estatusId == 24 || estatusId == 25 || estatusId == 27 || estatusId == 40) {
        var datos = { candidatoId: candidatoId, requisicionId: this.RequisicionId, estatusId: 5 };
      }

      this.service.SetStatusBolsa(datos).subscribe(data => {
        if (data == 201) {
          var aux = this.dataSource;
          var idx = aux.findIndex(x => x.candidatoId === this.candidatoId);
          this.ValidarEstatus(estatusId);

          this.dataSource[idx]['estatusId'] = estatusId;
          this.dataSource[idx]['estatus'] = estatus;

          this.onChangeTable(this.config)

          if (estatusId === 17 || estatusId === 21 || estatusId === 27 || estatusId === 24) {
            var datos = { candidatoId: this.candidatoId, estatusId: estatusId, vacante: this.vacante, nombre: this.dataSource[idx]['nombre'] };

            this.service.SendEmailCandidato(datos).subscribe();

          }

          if (estatusId === 22) // si es cita con cliente cambio automatico a envio al cliente 
          {
            var datosVacante = { estatusId: 30, requisicionId: this.RequisicionId };

            this.service.SetProcesoVacante(datosVacante).subscribe(data => {
              console.log(data)
            })
          }
          else if (estatusId == 23) {
            var datosVacante = { estatusId: 33, requisicionId: this.RequisicionId };

            this.service.SetProcesoVacante(datosVacante).subscribe(data => {
              console.log(data)
            })
          }



          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

          if (estatusId == 22 && this.estatusVacante != "30") {
            this.popToast('warning', 'Estatus', 'El estatus de la vacante es diferente a envio al cliente.');
          }
        }
      })
    }

  }

  public onCellClick(data: any) {

    data.selected ? data.selected = false : data.selected = true; //para poner el backgroun cuando seleccione
    data.selected ? this.candidatoId = data.candidatoId : this.candidatoId = null; //agrega y quita el row seleccionado
    data.selected ? this.horarioId = data.horarioId : this.horarioId = null; //agrega y quita el row seleccionado
    data.selected ? this.ProcesoCandidatoId = data.id : this.ProcesoCandidatoId = null;

    if (!data.selected) {
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
    }
    else {
      this.ValidarEstatus(data.estatusId)
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

    // let index = this.dataSource.indexOf(data.row);
    // this.element = data;
    // /* add an class 'active' on click */
    // $('#resultDataTable').on('click', 'tr', function (event: any) {
    //   //noinspection TypeScriptUnresolvedFunction
    //   $(this).addClass('selected').siblings().removeClass('selected');
    // });
  }


  VerCandidato(row) {

    this.candidatoId = row.candidatoId;

    this.isModalShown = true;

    // this.ValidarEstatus(row.estatusId);
    // row.selected = true;
    //this.spinner.show();
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();

    // }, 1000);

  }

  OpenEditarComponent()
  {
    var aux = this.dataSource.filter( element => {
      return element.estatusId === 24
    //  if( element.estatusId == 24 )
    //   {
    //     element.areaReclutamiento = 'SIN ASIGNAR';
    //     element.areaReclutamientoId = -1;
    //     element.fuenteReclutamiento = 'SIN ASIGNAR';
    //     element.fuenteReclutamientoId = -1;

    //     return element;
    //   }
    });

    let dialogRef = this.dialog.open(EditarContratadosComponent, {
      height: 'auto',
      width: 'auto',
      data: aux
    });

    dialogRef.afterClosed().subscribe(result => {

    })

    //this.bsModalRef = this.modalService.show(EditarContratadosComponent, {initialState, class:'modal-lg'});
    //this.bsModalRef.content.closeBtnName = 'Close';
  }

  EstatusModal($event) {
    var idx = this.dataSource.findIndex(x => x.candidatoId === $event.candidatoId);

    this.dataSource[idx]['estatusId'] = $event.estatusId;
    this.dataSource[idx]['estatus'] = $event.estatus;

    this.ValidarEstatus($event.estatusId);
    this.dataSource[idx]['selected'] = true;

    this.onChangeTable(this.config);

  }

  refresh() {
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

  closeModal() {
    this.ShownModal.hide();
    this.isModalShown = false;
  }

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-primary', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
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
