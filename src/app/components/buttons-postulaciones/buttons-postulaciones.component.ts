import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ApiConection } from './../../service/api-conection.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CandidatosService } from './../../service/Candidatos/candidatos.service';
import { DialogHorariosConteoComponent } from '../../components/dialog-horarios-conteo/dialog-horarios-conteo.component'
import { DialogLiberarCandidatoComponent } from './../dialog-liberar-candidato/dialog-liberar-candidato.component';
import { DlgComentariosNRComponent } from './../dlg-comentarios-nr/dlg-comentarios-nr.component';
import { EditarContratadosComponent } from '../editar-contratados/editar-contratados.component';
import { InfoCandidatoService } from '../../service/SeguimientoVacante/info-candidato.service';
import { MatDialog } from '@angular/material';
import { ModalDirective } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostulateService } from './../../service/SeguimientoVacante/postulate.service';
import { RequisicionesService } from '../../service';
import { element } from 'protractor';

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
  @ViewChild('modallib') modal;

  public dataSource: Array<any> = [];

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  dataContratados: any = [];
  public actualizoContratados = false;
  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = {};
  postulados: any;
  dlgLiberar = false;
  //candidatoId = 'f66da23e-9d69-e811-80e1-9e274155325e';'621ede7a-2fbc-e811-80ea-9e274155325e'
  candidatoId;
  isModalShow: boolean = false;
  editarContratados: boolean = false;
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
  nr = true; //no recontatable
  flagContratados = true;
  rowAux: any = [];
  conteo = [];
  horarioId: any;
  ProcesoCandidatoId: any;

  bsModalRef: BsModalRef;
  objLiberar = [];
  constructor(
    private serviceRequi: RequisicionesService,
    private service: PostulateService,
    private serviceLiberar: InfoCandidatoService,
    private serviceCandidato: CandidatosService,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getpostulados();
    this.GetConteoVacante();
  }

  // openModal(templateModal: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(templateModal, { class: 'atras' });
  // }

  ValidarEstatus(estatus) {
    var auxc = this.dataSource.filter(element => {
      return element.estatusId == 24
    });

    if (auxc.length == this.conteo[0]['totalVacantes'] && estatus != 42 && estatus != 24) {
      this.GetHorarioRequis(estatus, estatus)
    }
    else if (this.estatusVacante == 39) {
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
      this.rechazado = true;
      this.nr = true;

    }
    else if (estatus === 10 || estatus === 12) //postulado apartado
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = false;
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
      this.nr = true;
    }
    else if (estatus === 40) //rechazado por cliente
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
      this.nr = false;
    }
    else if (estatus === 28) //nr
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
      this.nr = true;
    }
    else if (estatus === 42) //EN REVISION
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
      this.nr = true;
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
          foto: ApiConection.ServiceUrlFoto + element.perfil[0]['foto'],
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
          fecha: element.fecha,
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
        if (element.contratados.length > 0) {
          perfil.nombre = element.contratados[0]['nombre'];
          perfil.apellidoPaterno = element.contratados[0]['apellidoPaterno'];
          perfil.apellidoMaterno = element.contratados[0]['apellidoMaterno'];
          perfil.curp = element.contratados[0]['curp'];
          perfil.rfc = element.contratados[0]['rfc'];
          perfil.nss = element.contratados[0]['nss'];
          perfil.edad = element.contratados[0]['edad'];
          perfil.editarCURP = true;
        }

        this.dataSource.push(perfil);
        this.showFilterRow = true;
        this.onChangeTable(this.config);

      })
    }, error => this.errorMessage = <any>error);
  }

  GetConteoVacante() {
    this.service.GetConteoVacante(this.RequisicionId, this.clienteId).subscribe(data => {
      this.conteo = data;
      ///////// Esto es lo que tengo que modificar falla como loco............................................................... calineta el procesador y la memoria se desgorda.
      var cc = this.conteo.filter(element => {
        if (element.contratados > 0) {
          return 1;
        }
      });
      cc.length > 0 ? this.flagContratados = false : this.flagContratados = true;
    })

  }

  GetHorarioRequis(estatusId, estatus) {

    this.serviceRequi.GetHorariosRequiConteo(this.RequisicionId).subscribe(data => {
      // if (data.length > 0) {
      var aux = data.filter(element => !element.vacantes)

      if (aux.length == 0) {
        aux = [{ id: 0, nombre: "Los horarios ya están cubiertos" }]
      }

      this.OpenDlgHorarios(aux, estatusId, estatus);
      // }
      // else {
      //   var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId };
      //   this.SetApiProceso(datos, estatusId, estatus);
      // }
    })
  }

  UpdateFuenteReclutamiento(data, estatusId, estatus) {
    this.serviceCandidato.UpdateFuenteRecl(data).subscribe(result => {
      this.SetApiProceso(data, estatusId, estatus);
    });
  }

  OpenDlgHorarios(data, estatusId, estatus) {
    let dialogDlt = this.dialog.open(DialogHorariosConteoComponent, {
      width: '45%',
      height: 'auto',
      data: data,
      disableClose: true
    });

    dialogDlt.afterClosed().subscribe(result => {
      if (result != 0) {

        this.horarioId = result.horarioId;

        var nom = data.filter(x => x.id == this.horarioId);
        var aux = this.dataSource;
        var idx = aux.findIndex(x => x.candidatoId === this.candidatoId);
        this.dataSource[idx]['horario'] = nom[0]['nombre'];
        this.dataSource[idx]['horarioId'] = this.horarioId;

        var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId, tipoMediosId: result.mediosId, ReclutadorId: sessionStorage.getItem('id') };

        if (estatusId == 24) {
          this.SetApiProceso(datos, estatusId, estatus)
        }
        else {
          this.UpdateFuenteReclutamiento(datos, estatusId, estatus);
        }

      }
      else {
        this.onChangeTable(this.config)
      }
    });
  }

  onClose(value) {
    if (value == 200) {
      this.modal.hide();
      this.dlgLiberar = false;
      this.objLiberar = [];
      var aux = this.dataSource;
      var idx = aux.findIndex(x => x.candidatoId === this.candidatoId);

      this.dataSource[idx]['estatusId'] = 27;
      this.dataSource[idx]['estatus'] = 'Liberado';

      this.ValidarEstatus(27);

      this.onChangeTable(this.config)
      this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');


    }
    else if (value == 404) {
      this.modal.hide();
      this.dlgLiberar = false;
      this.objLiberar = [];
      this.onChangeTable(this.config)
      this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar datos');

    }
    else {
      this.objLiberar = [];
      this.modal.hide();
      this.dlgLiberar = false;
    }

  }
  openDialogLiberar() {

    this.objLiberar =[{
      RequisicionId: this.RequisicionId,
      CandidatoId: this.candidatoId,
      ReclutadorId: sessionStorage.getItem('id'),
      ProcesoCandidatoId: this.ProcesoCandidatoId,
    }];

    this.dlgLiberar = true;
  }

  // OpenDialogLiberacion(estatusId,estatus) {
  //   let dialogLiberar = this.dialog.open(DialogLiberarCandidatoComponent, {
  //     width: '28%',
  //     height: 'auto',
  //   });
  //   dialogLiberar.afterClosed().subscribe(result => {
  //     if (result) {
  //       var data = {
  //         RequisicionId: this.RequisicionId,
  //         CandidatoId: this.candidatoId,
  //         ReclutadorId: sessionStorage.getItem('id'),
  //         MotivoId: result.motivo,
  //         ProcesoCandidatoId: this.ProcesoCandidatoId,
  //         Comentario: result.comentario,
  //       }

  //       this.serviceLiberar.setLiberarCandidato(data).subscribe(result => {
  //           switch(result){
  //             case 200:{

  //             }
  //             case 404: {
  //               this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar datos');
  //               break;
  //             }
  //           }
  //         });
  //     }
  //     else
  //     {
  //       this.onChangeTable(this.config)
  //     }
  //   });
  // }

  OpenEditarComponent(datos) {
    this.dataContratados = this.dataSource.filter(element => {
      return element.candidatoId === datos.candidatoId
      //  if( element.estatusId == 24 )
      //   {
      //     element.areaReclutamiento = 'SIN ASIGNAR';
      //     element.areaReclutamientoId = -1;
      //     element.fuenteReclutamiento = 'SIN ASIGNAR';
      //     element.fuenteReclutamientoId = -1;

      //     return element;
      //   }
    });

    this.editarContratados = true;

    // let dialogRef = this.dialog.open(EditarContratadosComponent, {
    //    width: '200%',
    //    height: 'auto',
    //   data: this.dataContratados
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("entro")
    // })

    //this.bsModalRef = this.modalService.show(EditarContratadosComponent, {initialState, class:'modal-lg'});
    //this.bsModalRef.content.closeBtnName = 'Close';
  }

  OpenDialogComentariosNR(data, estatusId, estatus) {
    var aux = {
      CandidatoId: this.candidatoId,
      nombre: this.rowAux.nombre + ' ' + this.rowAux.apellidoPaterno + ' ' + this.rowAux.apellidoMaterno,
      curp: this.rowAux.curp,
      foto: this.rowAux.foto,
      requisicionId: this.RequisicionId,
      ReclutadorId: sessionStorage.getItem('id')
    };

    let dialog = this.dialog.open(DlgComentariosNRComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: aux
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.SetApiProceso(data, 42, 'En Revision')

      }
    })
  }

  SetProceso(estatusId, estatus) {

    if (this.candidatoId != null) {
      if (estatusId == 27) {
        this.openDialogLiberar();
      } else if (estatusId == 18) {
        this.GetHorarioRequis(estatusId, estatus);
      }
      else if (estatusId == 42) {
        var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId, ReclutadorId: sessionStorage.getItem('id') };
        this.OpenDialogComentariosNR(datos, estatusId, estatus);

      }
      else if (estatusId == 24) {
        var idx = this.conteo.findIndex(x => x.id === this.horarioId);
        if (idx > -1) {
          if (this.conteo[idx]['contratados'] == this.conteo[idx]['vacantes']) {
            this.GetHorarioRequis(estatusId, estatus)
          }
          else {
            var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId, ReclutadorId: sessionStorage.getItem('id') };
            this.OpenEditarComponent(datos);
            //this.SetApiProceso(datos, estatusId, estatus);
          }
        }

      }
      else {
        var datos = { candidatoId: this.candidatoId, estatusId: estatusId, requisicionId: this.RequisicionId, horarioId: this.horarioId, ReclutadorId: sessionStorage.getItem('id') };
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
        this.onChangeTable(this.config)

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
      else if (estatusId == 24 || estatusId == 25 || estatusId == 27 || estatusId == 40 || estatusId == 42) {
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

          if (estatusId === 22 && this.estatusVacante != "33" && this.estatusVacante != "30" && this.estatusVacante != "39" && this.estatusVacante != "38") // si es cita con cliente cambio automatico a envio al cliente
          {
            var datosVacante = { estatusId: 30, requisicionId: this.RequisicionId };

            this.service.SetProcesoVacante(datosVacante).subscribe(data => {
            })
          }
          else if (estatusId == 23 && this.estatusVacante != "33" && this.estatusVacante != "39" && this.estatusVacante != "38") {
            var datosVacante = { estatusId: 33, requisicionId: this.RequisicionId }; //espera de contratacion

            this.service.SetProcesoVacante(datosVacante).subscribe(data => {
            })
          }
          else if (estatusId == 12 || estatusId == 17 && this.estatusVacante != 29 && this.estatusVacante != "33" && this.estatusVacante != "39" && this.estatusVacante != "38") {
            var datosVacante = { estatusId: 29, requisicionId: this.RequisicionId }; //espera de contratacion

            this.service.SetProcesoVacante(datosVacante).subscribe(data => {
            })
          }

          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

          // if (estatusId == 22 && this.estatusVacante != "30"  && this.estatusVacante != "39") {
          //   this.popToast('warning', 'Estatus', 'El estatus de la vacante es diferente a envio al cliente.');
          // }
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

    this.isModalShow = true;

    // this.ValidarEstatus(row.estatusId);
    // row.selected = true;
    //this.spinner.show();
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();

    // }, 1000);

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

    this.onChangeTable(this.config);
  }

  closeModal(modal) {
    if (modal == 1) {
      this.ShownModal.hide();
      this.isModalShow = false;
    }
    else {
      if (this.actualizoContratados) {
        var datos = { candidatoId: this.candidatoId, estatusId: 24, requisicionId: this.RequisicionId, horarioId: this.horarioId, ReclutadorId: sessionStorage.getItem('id') };
        this.SetApiProceso(datos, 24, 'Contratado')
        this.editarContratados = false;
      }
      else {
        this.editarContratados = false;
      }
    }

    this.refresh();

  }



  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Horario', className: 'text-info', name: 'horario', filtering: { filterString: '', placeholder: 'Horario' } },
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-info', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-info', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    { title: 'NSS', className: 'text-success', name: 'nss', filtering: { filterString: '', placeholder: 'NSS' } },
    { title: 'Estatus', className: 'text-info text-center', name: 'estatus', filtering: { filterString: '', placeholder: 'Estatus' } }
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

  public clearfilters() {
    this.showFilterRow = false;
    this.columns.forEach(element => {
      element.filtering.filterString = '';
      (<HTMLInputElement>document.getElementById(element.name)).value = '';
    });
    this.onChangeTable(this.config);
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
