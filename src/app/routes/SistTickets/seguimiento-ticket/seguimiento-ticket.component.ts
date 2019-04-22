import { RegistroReclutadorComponent } from './../../../components/registro-reclutador/registro-reclutador.component';
import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { CandidatosService } from './../../../service/Candidatos/candidatos.service';
import { DlgAsignarPerfilComponent } from './../../../components/dlg-asignar-perfil/dlg-asignar-perfil.component';
import { SistTicketsService } from './../../../service/SistTickets/sist-tickets.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogShowRequiComponent } from '../../recl/vacantes/vacantes/components/dialogs/dialog-show-requi/dialog-show-requi.component';
import { MatDialog } from '@angular/material';
import { InfoCandidatoService } from '../../../service/SeguimientoVacante/info-candidato.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { RequisicionesService } from '../../../service';
import { DialogHorariosConteoComponent } from '../../../components/dialog-horarios-conteo/dialog-horarios-conteo.component';
import { PostulateService } from '../../../service/SeguimientoVacante/postulate.service';

@Component({
  selector: 'app-seguimiento-ticket',
  templateUrl: './seguimiento-ticket.component.html',
  styleUrls: ['./seguimiento-ticket.component.scss'],
  providers: [RequisicionesService, CandidatosService]
})
export class SeguimientoTicketComponent implements OnInit {
  @ViewChild('modallib') modal;
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';

  modulo = sessionStorage.getItem('modulo');
  moduloId;
  fila = [];
  ticket = [];
  finalizar = false;
  atender = false;
  examen = false;
  date = new Date;
  timeW;
  postulaciones: any = [];
  loading: boolean;

  dataSource: any = [];
  apartar = true;
  requisicionId: any;
  examenId: any = 0;

  examenesCandidato = { 'tecnicos': [], 'psicometricos': [] };
  exaTecnico: boolean = false;
  exaPsico: boolean = false;
  minutosEnAtencion: number = 0;
  minutosEnEspera: number = 0;
  registrar: boolean = false;
  objLiberar: any = [];
  dlgLiberar: boolean = false;
  filteredData: any = [];
  filteredDataPos: any = [];
  search = "";

  constructor( private _service: SistTicketsService, 
      private _Router: Router, private dialog: MatDialog, 
      private _serviceCandidato: InfoCandidatoService,  
      private serviceCandidato: CandidatosService,
      private servicePost: PostulateService,
      private toasterService: ToasterService,
      private service: RequisicionesService, 
    private _serviceExamen: ExamenesService) { 
        setInterval(() => this.timeWait(), 60000);    
  }
  
  Reinciar()
  {
    this.ticket = [];
    this.finalizar = false;
    this.atender = false;
    this.examen = false;
    this.postulaciones = [];
    this.dataSource = [];
    this.apartar = true;
    this.requisicionId = null;
    this.examenId = 0;
    
    this.examenesCandidato = { 'tecnicos': [], 'psicometricos': [] };

  }
  ngOnInit() {
    // setInterval(() => this.timeWait(), 1000);
    this.moduloId = sessionStorage.getItem('moduloId');
    this.GetFilaTickets();
    //this.GetTicket('6FD2758C-A533-E911-AF44-E4B31877AAB4');

  }

  public GetFilaTickets()
  {
    this._service.GetFilaTickets(1, sessionStorage.getItem('id')).subscribe( data => {
        this.fila = data;
        console.log(this.fila)
    })
  }

  public GetTicket(ticketId)
  {
    this._service.GetTicketRecl(ticketId, sessionStorage.getItem('id')).subscribe(data => {
      this.ticket = data;

      this.ticket[0].estado == 3 ? this.finalizar = false : this.finalizar = true;
      this.ticket[0].estado == 2 ? this.atender = true : this.atender = false;

      if(this.ticket[0].candidato.length > 0 )
      {
        this.GetPostulaciones(this.ticket[0].candidato[0].candidatoId);
        this.ExamenesCandidatos();
      }
     // this.GetFilaTickets();

      
   
    })

  }
  GetPostulaciones(candidatoId)
  {
    this._service.GetPostulaciones(candidatoId).subscribe(data => {
      this.postulaciones = data;
      this.filteredDataPos = data;
      this.GetMisVacantes();
    });
  }

  GetMisVacantes() {
    this._service.GetVacantesReclutador(sessionStorage.getItem('id')).subscribe(data => {
      this.dataSource = data;
      this.filteredData = data;
    });
  }

  public Atender()
  {

    this._service.GetTicketPrioridad(sessionStorage.getItem('id'), sessionStorage.getItem('moduloId')).subscribe(data => {
      if(data != 417)
      {
        this.GetTicket(data);
        setInterval(() => this.minutosEnAtencion+=1, 60000);
        this.GetFilaTickets();
      }
     else
     {

      this.Reinciar();
      this.atender = true;
     }
    });
   
  }

  public Finalizar(ticketId, estatus)
  {
    this._service.UpdateStatusTicket(ticketId, estatus, sessionStorage.getItem('moduloId')).subscribe(data => {
      //this.GetTicket(ticketId)
      this.Reinciar();
      this.minutosEnAtencion = 0;
    });
  }

  GetHorarioRequis(estatusTicket) {
    if (this.ticket[0].candidato[0].estatusId != 27) {
      this.service.GetHorariosRequiConteo(this.ticket[0].requisicionId).subscribe(data => {
        var aux = data.filter(element => !element.vacantes)

        if (aux.length == 0) {
          aux = [{ id: 0, nombre: "Los horarios ya están cubiertos" }]
        }

        this.OpenDlgHorarios(aux, 18, 'ENTREVISTA RECLUTAMIENTO', this.ticket[0].requisicionId, estatusTicket);
      })
    }
    else {
      this.Finalizar(this.ticket[0].ticketId, estatusTicket);
    }
  }

  OpenDlgHorarios(data, estatusId, estatus, requi, estatusTicket) {
    let dialogDlt = this.dialog.open(DialogHorariosConteoComponent, {
      width: '45%',
      height: 'auto',
      data: data,
      disableClose: true
    });

    dialogDlt.afterClosed().subscribe(result => {
      if (result != 0) {

       let horarioId = result.horarioId;

        var datos = { candidatoId: this.ticket[0].candidato[0].candidatoId, estatusId: estatusId, requisicionId: requi, horarioId: horarioId, tipoMediosId: result.mediosId, ReclutadorId: sessionStorage.getItem('id') };

        this.serviceCandidato.UpdateFuenteRecl(datos).subscribe(result =>{ 
          this.servicePost.SetProceso(datos).subscribe(data => {
            if (data == 201) {
              if(estatusTicket == 3)
              {
                this.popToast('success', 'Seguimiento', 'El candidato se encuentra en examenes');
                this.Finalizar(this.ticket[0].ticketId, estatusTicket);
              }
              else
              {
                this.popToast('success', 'Seguimiento', 'El proceso termino correctamente');
                this.Finalizar(this.ticket[0].ticketId, estatusTicket);
              }
            }
            else if (data == 300) {
              this.popToast('info', 'Apartado', 'El candidato ya esta apartado o en proceso');
            }
            else {
              this.popToast('error', 'Error', 'Ocurrió un error al intentar actualizar datos')
            }
          })
        });

      }
     
    });
  }

  SetApartar(datos, ticket)
  {
    this._serviceCandidato.setApartarCandidato(datos)
      .subscribe(data => {
        switch (data) {
          case 200: {

            this._service.UpdateRequiTicket(ticket.ticketId, datos.requisicionId).subscribe(data =>{
              if(data == 200)
              {
                this.loading = false;
                       
                var msg = 'El candidato se apartó correctamente.';
                this.popToast('success', 'Apartado', msg);
    
                this.GetTicket(ticket.ticketId)
              }
              else
              {
                var msg = 'Error el intentar apartar el candidato. Consulte al departamento de soporte si el problema persiste.';
                this.popToast('error', 'Apartado', msg);
                this._liberarCandidato(datos, ticket)
              }
            })
          
            break;
          }
          case 304: {
            msg = 'El candidato ya esta apartado o en proceso.';
            this.popToast('info', 'Apartado', msg); ''
            this.loading = false;

            break;
          }
          case 404: {
            var msg = 'Error el intentar apartar el candidato. Consulte al departamento de soporte si el problema persiste.';
            this.popToast('error', 'Apartado', msg);
            this.loading = false;

            break;
          }
          default: {
            var msg = 'Error inesperado y desconocido, reporte el problema al departamento de soporte.';
            this.popToast('error', 'Oops!!', msg);
            this.loading = false;

            break;
          }
        }
      }, err => {
        console.log(err);
      });
    
  }

  _apartarCandidato(row, candidato) {
    this.examenId = row.examenId;
    let propietario = false;
    this.dataSource.forEach(element => {
      if (element.id == row.id) {
        propietario = true;
        return
      }
    });

    if (!propietario) {
      if (row.reclutadores.length > 1) {
        let dialogDlt = this.dialog.open(DlgAsignarPerfilComponent, {
          width: '45%',
          disableClose: true,
          data: row.reclutadores
        });


        dialogDlt.afterClosed().subscribe(result => {

          var procesoCandidato = {
            candidatoId: candidato.candidato[0].candidatoId,
            requisicionId: row.id,
            folio: row.folio,
            reclutador: result.nombre,
            reclutadorId: result.reclutadorId,
            estatusId: 18
          }

          this.SetApartar(procesoCandidato, candidato);

        });
      }
      else if (row.reclutadores.length == 1) {
        let procesoCandidato = {
          candidatoId: candidato.candidato[0].candidatoId,
          requisicionId: row.id,
          folio: row.folio,
          reclutador: row.reclutadores[0].nombre,
          reclutadorId: row.reclutadores[0].reclutadorId,
          estatusId: 18
        }

        this.SetApartar(procesoCandidato, candidato);
      }
    }
    else {

      this.loading = true;
      let procesoCandidato = {
        candidatoId: candidato.candidato[0].candidatoId,
        requisicionId: row.id,
        folio: row.folio,
        reclutador: sessionStorage.getItem('nombre'),
        reclutadorId: sessionStorage.getItem('id'),
        estatusId: 18
      }
      this.SetApartar(procesoCandidato, candidato);
    }

  }

  onClose(value)
  {
    if(value == 200)
    {
      this.modal.hide();
      this.dlgLiberar = false;
      this.objLiberar = [];
      this.GetTicket(this.ticket[0].ticketId)
        this.apartar = true;
        this.popToast('success', 'SEGUIMIENTO', 'El candidato se liberó correctamente');

      
    }
    else if(value == 404)
    {
      this.modal.hide();
      this.dlgLiberar = false;
      this.objLiberar = [];
      this.popToast('error', 'SEGUIMIENTO', 'Ocurrió un error al intentar actualizar datos');
 
    }
    else
    {
      this.modal.hide();
      this.dlgLiberar = false;
      this.objLiberar = [];
    }

  }
  openDialogLiberar(row, candidato){

    this.objLiberar = [{
      RequisicionId: row.id,
      CandidatoId: candidato.candidato[0].candidatoId,
      ReclutadorId: sessionStorage.getItem('id')
    }];

    this.dlgLiberar = true;
  }
  
  _liberarCandidato(row, candidato)
  {
    this._service.LiberarCandidato(row.id, candidato.candidato[0].candidatoId).subscribe(data =>{
      if(data == 201)
      {
        this.GetTicket(candidato.ticketId)
        this.apartar = true;
        this.popToast('success', 'Apartado', 'El candidato se liberó correctamente');
      }
      else
      {
        var msg = 'Error el intentar liberar candidato. Consulte al departamento de soporte si el problema persiste.';
        this.popToast('error', 'Apartado', msg);
      }
    });

  }

  openDialogShowRequi(row) {

    let dialogShow = this.dialog.open(DialogShowRequiComponent, {
      width: '200%',
      height: '100%',
      data: { folio: row.folio, id: row.id, vacante: row.vBtra }
    });
    dialogShow.afterClosed().subscribe(result => {
      if(result)
      {
        
      }
    });
  }

  ExamenesCandidatos()
  {
    this._serviceExamen.GetExamenCandidato(this.ticket[0].candidato[0].candidatoId).subscribe(exa => {
      this.examenesCandidato.tecnicos = exa[0];
      this.examenesCandidato.psicometricos = exa[1];

      if(this.examenesCandidato.tecnicos.length > 0)
      {
        if(this.examenesCandidato.tecnicos[0].resultado > 0 && this.examenesCandidato.tecnicos[0].requisicionId == this.ticket[0].requisicionId)
        {
          this.exaTecnico = true;
        }
      }
      if(this.examenesCandidato.psicometricos.length > 0)
      {
        if(this.examenesCandidato.psicometricos[0].resultado.toUpperCase() != "SIN RESULTADO" && this.examenesCandidato.psicometricos[0].requisicionId == this.ticket[0].requisicionId)
        {
          this.exaPsico = true;
        }
      }
    });
  }

  registrarUsuario() {
    let dialogDlt = this.dialog.open(RegistroReclutadorComponent, {
      width: '45%',
      height: 'auto',
      disableClose: true
    });

    dialogDlt.afterClosed().subscribe(result => {
      if (result != 417) {
        this._service.UpdateCandidatoTicket(this.ticket[0].ticketId, result).subscribe(data => {
          var datos = { candidatoId: result, estatusId: 18, requisicionId: this.ticket[0].requisicionId, ReclutadorId: sessionStorage.getItem('id') };

          this.servicePost.SetProceso(datos).subscribe(data => {
            this.GetTicket(this.ticket[0].ticketId);

            this.popToast('success', 'Seguimiento', 'El registro se realizó correctamente');
          });

        });
      }
      else if(result == 417) {
        this.popToast('error', 'Seguimiento', 'Ocurrió un error al intentar registrar candidato');
      }
    });
  }

  public Search(data: any, opc, aux) {
    console.log(aux)
    this.search = data.target.value;
    let tempArray: Array<any> = [];
   
    let colFiltar: Array<any> = [{ title: "folio" }, { title: "vBtra" }, { title: "cliente" }];

    aux.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
      }
    });

    if(opc == 1)
    {
      this.postulaciones = tempArray;
    }
    else{
    this.dataSource = tempArray;
    }
  }
  timeWait()
  {
    this.GetFilaTickets();
    let d = new Date();
    let s = d.getSeconds() * 6;
    let m = d.getMinutes();
  

  }

  MinutosEnEspera()
  {
    if(this.fila.length > 0)
    {
      this.minutosEnEspera += 1; 
      this.fila.forEach(e => {
        e.te = this.minutosEnEspera;
      })
    }

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
