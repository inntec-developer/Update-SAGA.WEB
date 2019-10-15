import { AdminServiceService } from './../../../../../service/AdminServicios/admin-service.service';
import 'jspdf-autotable';

import * as jspdf from 'jspdf';

import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import { Component, OnInit } from '@angular/core';
import { DOCUMENT, DatePipe } from '@angular/common';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { MonedaPipe } from './../../../../../shared/pipes/moneda.pipe';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { ViewCuerpoRequiComponent } from '../view-cuerpo-requi/view-cuerpo-requi.component';
import { ViewInforRequiComponent } from '../view-info-requi/view-info-requi.component';
import html2canvas from 'html2canvas';
const swal = require('sweetalert2');
declare var $: any;

@Component({
  selector: 'app-view-requisicion',
  templateUrl: './view-requisicion.component.html',
  styleUrls: ['./view-requisicion.component.scss'],
  providers: [RequisicionesService, CatalogosService, MonedaPipe, DatePipe, AdminServiceService]
})
export class ViewRequisicionComponent implements OnInit {
  public imprimir: boolean;

  public RequisicionId: string;
  public Folio: number;
  public estatusId: number;
  public Vacante: any;
  public TipoReclutamiento: any;

  arteDamfo: any;
  Requisicion: any;

  documentosDamsa: any[];
  prestacionesLey: any[];

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  diasObligatorios = [
    { dia: '* 1 de Enero' },
    { dia: '* El primer lunes de febrero en conmemoración del 5 de febrero' },
    { dia: '* El tercer lunes de marzo en conmemoración del 21 de marzo' },
    { dia: '* 1 de Mayo' },
    { dia: '* 16 de Septiembre' },
    { dia: '* Tercer lunes de noviembre en conmemoración del 20 nomviembre' },
    { dia: '* El 1 de diciembre de cada seis años, cuando corresponda ala transmisión del poder ejecutivo' },
    { dia: '* 25 de Diciembre' },
    { dia: '* El que determinen las leyes federales y locales electorales, para efectuar la jornada electoral' }
  ];

  constructor(
    private _Router: Router,
    private _Route: ActivatedRoute,
    private settings: SettingsService,
    private serviceRequisiciones: RequisicionesService,
    private serviceCatalogos: CatalogosService,
    private toasterService: ToasterService,
    private monedaPipe: MonedaPipe,
    private datePipe: DatePipe,
    private _service: AdminServiceService
  ) {
    this._Route.params.subscribe(params => {
      if (params['IdRequi'] != null && params['Folio'] != null) {
        this.RequisicionId = params['IdRequi'];
        this.Folio = params['Folio'];
        this.Vacante = params['Vacante'];
        this.TipoReclutamiento = params['TipoReclutamientoId'];
        this.imprimir = false;
      }
    });
  }
  ngOnInit() {
    this.imprimir = true;
    this.serviceCatalogos.getDocumentosDamsa()
      .subscribe(data => {
        this.documentosDamsa = data;
      });
    this.serviceCatalogos.getPrestacionesLey()
      .subscribe(data => {
        this.prestacionesLey = data;
      });
    this.imprimir = false;
  }

  editRequi() {
    this._Router.navigate(
      ['/ventas/edicionRequisicion',
        this.RequisicionId,
        this.Folio,
        this.estatusId,
        this.TipoReclutamiento],
      { skipLocationChange: true }
    );
  }

  getEstatusRequi(event) {
    this.estatusId = event;
  }

  print() {
    this.imprimir = true;
    if (!this.settings.layout.isCollapsed) {
      this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      document.getElementById('content').style.marginLeft = '60px';
      document.getElementById('content').style.marginTop = '15px';
      document.getElementById('content').style.marginRight = '0px';
      document.getElementById('content').style.marginBottom = '15px';

      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = '0';
      document.getElementById('content').style.marginLeft = '0';
    }, 500);
  }

  createPDF() {
    this.imprimir = true;
    let timerInterval;
    swal.fire({
      title: '¡Descargar Requisición PDF!',
      html:  '<strong></strong><br/><br/>',
      text: 'El proceso puede durar varios segundos. Por favor espere...',
      type: 'warning',
      showConfirmButton: false,
      timer: 3000,
      onBeforeOpen: () => {
        swal.showLoading();
        timerInterval = setInterval(() => {
          swal.getContent().querySelector('strong')
            .textContent = swal.getTimerLeft();
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });
    this.serviceRequisiciones.getRequisicionPDF(this.RequisicionId).subscribe(result => {
      if (result !== 404) {
        this.Requisicion = result;
        this.imprimir = true;
        let row = 80;
        const nombrePerfil = this.Requisicion['vBtra'];
        const doc = new jspdf('p', 'pt', 'letter');
        // tslint:disable-next-line: max-line-length logo damsa
        const imgData = 'data:image/png;base64,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'
        let telefonos = '';
        const mocos = this.Requisicion.cliente;
        this.Requisicion.cliente.telefonos.forEach(element => {
          telefonos +=
            'tipo: ' + element.tipo
            + ' \tnúmero: (' + element.claveLada + ') ' + element.telefono.substr(0, 4) + '-' + element.telefono.substr(4, 8)
            + ' \tdirección: ' + element.calle
            + '\n';
        });
        doc.setFontSize(11);
        const Header = 'REQUISICIÓN';
        const xOffsetH = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Header) * doc.internal.getFontSize() / 2);
        doc.addImage(imgData, 'PNG', 40, 20, 130, 45);
        doc.text(Header, xOffsetH, 40);
        doc.setFontSize(10);
        doc.text('Folio:' + this.Requisicion.folio + '\nVacantes: ' + this.Requisicion['vacantes'], 500, 40);
        const InfoRequi = 'INFORMACIÓN REQUISICIÓN';
        const xOffsetInfoR = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(InfoRequi) * doc.internal.getFontSize() / 2);
        doc.setFontSize(8);
        doc.setLineWidth(0.5);
        doc.setDrawColor(15, 106, 229);
        doc.rect(20, 70, 570, 15);
        doc.text(InfoRequi, xOffsetInfoR, row);
        row += 5;
        const confidencial = this.Requisicion['confidencial'] ? 'SI' : 'NO';
        doc.text('CONFIDENCIAL: '
          + confidencial
          + '\t ESTATUS: '
          + this.Requisicion['estatus'].toUpperCase()
          + '\t PRIORIDAD: ' + this.Requisicion['prioridad']['descripcion'].toUpperCase(), 40, row += 10);
        row += 5;
        doc.text('FECHA SOLICITUD: '
          + this.datePipe.transform(new Date(this.Requisicion['creacion']), 'dd/MM/yyyy') + 'A LAS '
          + this.datePipe.transform(new Date(this.Requisicion['creacion']), 'hh:mm')
          + '\t FECHA LIMITE: ' + this.datePipe.transform(new Date(this.Requisicion['limite']), 'dd/MM/yyyy')
          + '\t FECHA CUMPLIMIENTO: ' + this.datePipe.transform(new Date(this.Requisicion['cumplimiento']), 'dd/MM/yyyy'), 40, row += 10);
        row += 5;
        const coordinador = this.Requisicion['coodinadore'] != null ? this.Requisicion['coodinadore'].toUpperCase() : 'SIN COORDINADOR';
        doc.text('SOLICITANTE: ' + this.Requisicion['solicitante'].toUpperCase(), 40, row += 10);
        row += 5;
        doc.text('COORDINADOR: ' + coordinador, 40, row += 10);
        row += 5;
        doc.text('ASIGNADOS: ', 40, row += 10);
        if (this.Requisicion['asignadosN'] != null) {
          this.Requisicion.asignadosN.forEach(x => {
            doc.text(x.nombre.toUpperCase() + ' ' + x.apellidoPaterno.toUpperCase() + ' ' + x.apellidoMaterno.toUpperCase(), 40, row += 10);
          });
        } else {
          doc.text('SIN ASIGNAR: ', 40, row += 10);
        }
        row += 10;
        const Cliente = 'CLIENTE';
        const xOffsetC = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Cliente) * doc.internal.getFontSize() / 2);
        doc.setFontSize(10);
        doc.setLineWidth(0.5);
        doc.setDrawColor(15, 106, 229);
        doc.rect(20, row, 570, 15);
        doc.text(Cliente, xOffsetC, row += 10);
        row += 5;
        doc.setFontSize(8);
        doc.text('RAZÓN SOCIAL: ' + this.Requisicion['cliente']['razonSocial'].toUpperCase(), 40, row += 10);
        doc.text('NOMBRE COMERCIAL: ' + this.Requisicion['cliente']['nombrecomercial'].toUpperCase(), 40, row += 10);
        doc.text('\nDIRECCION:\n' + this.Requisicion.direccion.toUpperCase()
          + '\nTELÉFONO(S): \n' + telefonos.toUpperCase(), 40, row += 10);
        row += this.Requisicion.cliente.telefonos.length * 10 + 40;
        const GiroEmpresa = 'GIRO DE LA EMPRESA';
        const xOffsetGE = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(GiroEmpresa) * doc.internal.getFontSize() / 2);
        doc.setFontSize(10);
        doc.rect(20, row, 570, 15);
        doc.text(GiroEmpresa, xOffsetGE, row += 10);
        row += 5;
        doc.setFontSize(8);
        const Giro = this.Requisicion['cliente']['giroEmpresa'].toUpperCase();
        const xOffsetG = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Giro) * doc.internal.getFontSize() / 2);
        doc.text(Giro, xOffsetG, row += 10);
        row += 5;
        const ActividadEmpresa = 'ACTIVIDAD DE LA EMPRESA';
        const xOffsetAe = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(ActividadEmpresa) * doc.internal.getFontSize() / 2);
        doc.setFontSize(10);
        doc.rect(20, row, 570, 15);
        doc.text(ActividadEmpresa, xOffsetAe, row += 10);
        row += 5;
        doc.setFontSize(8);
        const Actividad = this.Requisicion['cliente']['actividadEmpresa'].toUpperCase();
        const xOffsetA = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Actividad) * doc.internal.getFontSize() / 2);
        doc.text(Actividad, xOffsetA, row += 10);
        row += 5;
        const TipoReclutamiento = 'TIPO RECLUTAMIENTO';
        const xOffsetTR = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(TipoReclutamiento) * doc.internal.getFontSize() / 2);
        doc.setFontSize(10);
        doc.rect(20, row, 570, 15);
        doc.text(TipoReclutamiento, xOffsetTR, row += 10);
        row += 5;
        doc.setFontSize(8);
        const Tipo = this.Requisicion['tipoReclutamiento'].toUpperCase();
        const xOffsetT = (doc.internal.pageSize.width / 3) - (doc.getStringUnitWidth(Tipo) * doc.internal.getFontSize() / 3);
        doc.text(Tipo, xOffsetT, row += 10);
        doc.text(this.Requisicion['claseReclutamiento'].toUpperCase(), (xOffsetT * 2) + 10, row);
        row += 5;
        const Maps = 'MAPA UBICACIÓN';
        const xOffsetM = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Maps) * doc.internal.getFontSize() / 2);
        doc.setFontSize(10);
        doc.rect(20, row, 570, 15);
        doc.text(Maps, xOffsetM, row += 10);

        // Agregar mapas de Google al Documento ------------------------------------------->
        const HTML_Height = $('.Mps').height();
        const element = '.Mps';
        html2canvas($(element)[0], { useCORS: true }).then(function (canvas) {
          const imgData = canvas.toDataURL('image/jpg', 1.0);
          doc.addImage(
            imgData, 'JPEG',
            40,
            row += 10,
            570,
            300
          );
        });
        setTimeout(() => {
          doc.addPage();
          row = 20;
          const Rutas = 'RUTAS DE CAMION';
          const xOffsetR = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Rutas) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Rutas, xOffsetR, row += 10);
          doc.setFontSize(8);
          row += 5;
          let r = 0;
          this.Requisicion.rutasCamion.forEach(x => {
            const ruta = r + 1
              + '.- DIRECCION: ' + x.direccion.toUpperCase()
              + '\tRUTA: ' + x.ruta.toUpperCase()
              + '\tVIA: ' + x.via.toUpperCase();
            doc.text(ruta, 40, row += 10);
            r++;
          });
          r = 0;
          row += 5;
          const Contactos = 'CONTACTOS';
          const xOffsetCnt = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Contactos) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Contactos, xOffsetCnt, row += 10);
          row += 5;
          doc.setFontSize(8);
          this.Requisicion.cliente.contactos.forEach(x => {
            let contact = r + 1
              + '.- DIRECCION: ' + x.calle.toUpperCase()
              + '\nNOMBRE: ' + x.nombre.toUpperCase() + ' ' + x.apellidoPaterno.toUpperCase() + ' ' + x.apellidoMaterno.toUpperCase()
              + '\nPUESTO: ' + x.puesto.toUpperCase();
            x.telefonos.forEach(t => {
              contact = contact + '\nTELEFONO: (' + t.claveLada + ') ' + t.telefono.substr(0, 4) + '-' + t.telefono.substr(4, 8);
              if (t.extension !== '') {
                contact = contact + ' Ext: ' + t.extension;
              }
            });
            x.email.forEach(c => {
              contact = contact + '\nCORREO: ' + c.email;
            });
            doc.text(contact, 40, row += 10);
            row += 30 + x.telefonos.length * 10 + x.email.length * 10;
            r++;
          });
          row += 5;
          const NombrePerfil = this.Requisicion['vBtra'].toUpperCase();
          const xOffsetNomP = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(NombrePerfil) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(NombrePerfil, xOffsetNomP, row += 10);
          row += 5;
          doc.setFontSize(6);
          doc.setTextColor(255, 0, 0);
          doc.text('REQUISITOS A PETICION DEL CLIENTE:', 40, row += 10);
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          doc.text('SEXO: ' + this.Requisicion.genero.toUpperCase(), 40, row += 10);
          doc.text('EDAD: ' + this.Requisicion.edadMinima + ' AÑOS A ' + this.Requisicion.edadMaxima + ' AÑOS', 40, row += 10);
          doc.text('ESTADO CIVIL: ' + this.Requisicion.estadoCivil.toUpperCase(), 40, row += 10);
          doc.text('AREA: ' + this.Requisicion.areaExperiencia.toUpperCase(), 40, row += 10);
          this.Requisicion.escolaridades.forEach(x => {
            doc.text('ECOLARIDAD: ' + x.gradoEstudio.toUpperCase() + '\tNIVEL: ' + x.estadoEstudio.toUpperCase(), 40, row += 10);
          });
          let a = 1;
          let aptitudes = '';
          this.Requisicion.aptitudes.forEach(x => {
            if (a === 5) {
              aptitudes = aptitudes + '\n';
            }
            aptitudes = aptitudes + x.aptitud + ', ';
            a++;
          });
          doc.text('APTITUDES: ', 40, row += 15);
          const splitAptitudes = doc.splitTextToSize(aptitudes.toUpperCase(), 500);
          doc.text(40, row += 10, splitAptitudes);
          row += splitAptitudes.length * 10;
          const splitExperiencia = doc.splitTextToSize('EXPERIENCIA: ' + this.Requisicion.experiencia.toUpperCase(), 500);
          doc.text(40, row, splitExperiencia);
          row += splitExperiencia.length * 10;
          row += 5;
          const Horarios = 'HORARIOS';
          const xOffsetHR = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Horarios) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Horarios, xOffsetHR, row += 10);
          row += 5;
          let horarios = '';
          let hrs = 1;
          doc.setFontSize(8);
          this.Requisicion.horarios.forEach(h => {
            horarios = hrs + '.- HORARIO: ' + h.nombre + ' \tDE '
              + h.deDia.diaSemana.toUpperCase()
              + ' A ' + h.aDia.diaSemana.toUpperCase()
              + ' DE ' + this.datePipe.transform(new Date(h.deHora), 'hh:mm')
              + ' A ' + this.datePipe.transform(new Date(h.aHora), 'hh:mm')
              + '\tVACANTES: ' + h.numeroVacantes
              + '\t' + (h.activo === true ? 'ACTIVO' : 'INACTIVO');
            doc.text(horarios, 40, row += 10);
            const splitEspecificaciones = doc.splitTextToSize(h.especificaciones.toUpperCase(), 500);
            doc.text(40, row += 10, splitEspecificaciones);
            row += splitEspecificaciones.length * 10;
            hrs++;
          });
          row += 5;
          doc.setFontSize(8);
          doc.setTextColor(255, 0, 0);
          doc.text('PRINCIPALES ACTIVIDADES A DESARROLLAR:', 40, row += 10);
          doc.setTextColor(0, 0, 0);
          row += 5;
          let act = 1;
          let newPage = false;
          this.Requisicion.actividades.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            const splitActividades = doc.splitTextToSize(act + '.-' + x.actividades.toUpperCase(), 500);
            if (act === 1) {
              doc.text(40, row += 10, splitActividades);
            } else {
              doc.text(40, row, splitActividades);
            }
            row += splitActividades.length * 10;
            act++;
          });
          row += 5;
          doc.setFontSize(8);
          doc.setTextColor(255, 0, 0);
          doc.text('OBSERVACIONES DE TIPO CONFIDENCIAL, REQUISITOS DEL CLIENTE (Para consulta exclusiva del reclutador)', 40, row += 10);
          doc.setTextColor(0, 0, 0);
          row += 5;
          let obs = 1;
          this.Requisicion.observaciones.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            const splitObservaciones = doc.splitTextToSize(obs + '.- ' + x.observaciones.toUpperCase(), 500);
            if (obs === 1) {
              doc.text(40, row += 10, splitObservaciones);
            } else {
              doc.text(40, row, splitObservaciones);
            }
            row += splitObservaciones.length * 10;
            obs++;
          });
          newPage = false;
          row += 5;
          const Psicometrias = 'PSICOMETRIAS A APLICAR ';
          const xOffsetPSI = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Psicometrias) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Psicometrias, xOffsetPSI, row += 10);
          row += 5;
          doc.setFontSize(6);
          doc.setTextColor(255, 0, 0);
          doc.text('EN CASO DE QUE NO REQUERIR COLOCAR N/A', 40, row += 10);
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          let psico = 1;
          this.Requisicion.psicometriasDamsa.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            doc.text(psico + '.- ' + x.tipoPsicometria.toUpperCase() + '\t' + x.descripcion.toUpperCase(), 40, row += 10);
            psico++;
          });
          newPage = false;
          doc.setFontSize(6);
          doc.setTextColor(255, 0, 0);
          doc.text('PRUEBA SUGERIDA POR EL CLIENTE', 40, row += 10);
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          psico = 1;
          this.Requisicion.psicometriasCliente.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            doc.text(psico + '.- ' + x.psicometria.toUpperCase() + '\t' + x.descripcion.toUpperCase(), 40, row += 10);
            psico++;
          });
          newPage = false;
          row += 5;
          const Sueldo = 'SUELDO NOMINAL';
          const xOffsetSuel = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Sueldo) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Sueldo, xOffsetSuel, row += 10);
          row += 5;
          doc.setFontSize(8);
          doc.text('SUELDO MENSUAL: ', 40, row += 10);
          const minimo = 'MINIMO: ' + this.monedaPipe.transform(this.Requisicion.sueldoMinimo, '$');
          const maximo = 'MAXIMO: ' + this.monedaPipe.transform(this.Requisicion.sueldoMaximo, '$');
          doc.text(minimo + '\t' + maximo, 160, row);
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          doc.text('SUELDO SEMANAL: ', 40, row += 10);
          const minimoS = 'MINIMO:    ' + this.monedaPipe.transform(((this.Requisicion.sueldoMinimo / 30) * 7), '$');
          const maximoS = 'MAXIMO:    ' + this.monedaPipe.transform(((this.Requisicion.sueldoMaximo / 30) * 7), '$');
          doc.text(minimoS + '\t' + maximoS, 160, row);
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          doc.text('SUELDO DIARIO: ', 40, row += 10);
          const minimoD = 'MINIMO:    ' + this.monedaPipe.transform((this.Requisicion.sueldoMinimo / 30), '$');
          const maximoD = 'MAXIMO:    ' + this.monedaPipe.transform((this.Requisicion.sueldoMaximo / 30), '$');
          doc.text(minimoD + '\t' + maximoD, 160, row);
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          doc.text('DÍAS DE CORTE: \t'
            + this.Requisicion.diaCorte.toUpperCase()
            + '\tTIPO NOMINA: \t' + this.Requisicion.tipoDeNomina.toUpperCase(), 40, row += 10);
          doc.text('DÍAS DE PAGO AL TRABAJAR: \t' + this.Requisicion.diaPago.toUpperCase(), 40, row += 10);
          doc.text('PERIODO DE PAGO: \t' + this.Requisicion.periodoPago.toUpperCase() + '\n' + this.Requisicion.especifique, 40, row += 10);

          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          const Beneficios = 'BENEFICIOS';
          const xOffsetBen = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Beneficios) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Beneficios, xOffsetBen, row += 10);
          row += 5;
          doc.setFontSize(8);
          let ben = 1;
          this.Requisicion.beneficios.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            const beneficio = ben + '.- ' + x.tipoBeneficio + ', ' + this.monedaPipe.transform(x.cantidad, '$');
            doc.text(beneficio, 40, row += 10);
            doc.text('OBSERVACIONES: ' + x.observaciones, 40, row += 10);
            ben++;
          });
          newPage = false;
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          const Contrato = 'CONTRATO';
          const xOffsetCon = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Contrato) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Contrato, xOffsetCon, row += 10);
          row += 5;
          doc.setFontSize(8);
          doc.text('TIPO CONTRATO: ' + this.Requisicion.tipoContrato.toUpperCase() + '\t' + this.Requisicion.tiempo.toUpperCase(), 40, row += 10);
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          const Documentos = 'DOCUMENTOS';
          const xOffsetdOC = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Documentos) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Documentos, xOffsetdOC, row += 10);
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          doc.setFontSize(6);
          doc.setTextColor(255, 0, 0);
          const DocD = 'DOCUMENTOS OBLIGATORIOS DAMSA:';
          const xOffsetDocD = (doc.internal.pageSize.width / 3) - (doc.getStringUnitWidth(DocD) * doc.internal.getFontSize() / 3);
          doc.text(DocD, 40, row += 10);
          doc.text('DOCUMENTOS ADICIONALES A PETICION DEL CLIENTE:', (xOffsetDocD * 2) + 10, row);
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          let rowC = row;
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          let d = 1;
          this.documentosDamsa.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            doc.text(d + '.- ' + x.documentoDamsa.toUpperCase(), 40, row += 10);
            d++;
          });
          d = 1;
          this.Requisicion.documentosCliente.forEach(x => {
            if (rowC >= 755 && newPage === false) {
              doc.addPage();
              rowC = 20;
              newPage = true;
            }
            const splitDocAd = doc.splitTextToSize(d + '.- ' + x.documento.toUpperCase(), 245);
            if (d === 1) {
              doc.text((xOffsetDocD * 2) + 10, rowC += 10, splitDocAd);
            } else {
              doc.text((xOffsetDocD * 2) + 10, rowC, splitDocAd);
            }

            rowC += splitDocAd.length * 10;
            d++;
          });
          newPage = false;
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          const Proceso = 'PROCESO';
          const xOffsetPro = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Proceso) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Proceso, xOffsetPro, row += 10);
          doc.setFontSize(8);
          row += 5;
          d = 1;
          this.Requisicion.procesos.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            const splitProceso = doc.splitTextToSize(d + '.- ' + x.proceso.toUpperCase(), 500);
            if (d === 1) {
              doc.text(40, row += 10, splitProceso);
            } else {
              doc.text(40, row, splitProceso);
            }
            d++;
            row += splitProceso.length * 10;
          });
          newPage = false;
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          const Presaciones = 'PRESTACIONES';
          const xOffsetPres = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Presaciones) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Presaciones, xOffsetPres, row += 10);
          doc.setFontSize(6);
          doc.setTextColor(255, 0, 0);
          row += 5;
          const PresLey = 'PRESTACIONES DE LEY:';
          const xOffsetPLY = (doc.internal.pageSize.width / 3) - (doc.getStringUnitWidth(PresLey) * doc.internal.getFontSize() / 3);
          doc.text(PresLey, 40, row += 10);
          doc.text('PRESTACIONES ADICIONEALES OFRECIDAS POR EL CLIENTE', (xOffsetPLY * 2) + 10, row);
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          rowC = row;
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          d = 1;
          this.prestacionesLey.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            doc.text(d + '.- ' + x.prestacionLey.toUpperCase(), 40, row += 10);
            d++;
          });
          d = 1;
          this.Requisicion.prestacionesCliente.forEach(x => {
            if (rowC >= 755 && newPage === false) {
              doc.addPage();
              rowC = 20;
              newPage = true;
            }
            const splitpPres = doc.splitTextToSize(d + '.- ' + x.prestamo.toUpperCase(), 250);
            if (d === 1) {
              doc.text((xOffsetDocD * 2) + 40, rowC += 10, splitpPres);
            } else {
              doc.text((xOffsetDocD * 2) + 40, rowC, splitpPres);
            }
            d++;
            rowC += splitpPres.length * 10;
          });
          d = 1;
          this.diasObligatorios.forEach(x => {
            if (row >= 755 && newPage === false) {
              doc.addPage();
              row = 20;
              newPage = true;
            }
            const splitDias = doc.splitTextToSize(d + '.- ' + x.dia.toUpperCase(), 250);
            if (d === 1) {
              doc.text(55, row += 10, splitDias);
            } else {
              doc.text(55, row, splitDias);
            }
            d++;
            row += splitDias.length * 10;
          });

          newPage = false;
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }
          const Competencias = 'COMPETENCIAS';
          const xOffsetComp = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Competencias) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Competencias, xOffsetComp, row += 10);
          doc.setFontSize(6);
          doc.setTextColor(255, 0, 0);
          row += 5;
          const obj = 'SECCIÓN PARA USO EXCLUSIVO DE LOS EJECUTIVOS DE CUENTA Y RECLUTADORES';
          const xOffsetObj = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(obj) * doc.internal.getFontSize() / 2);
          doc.text(obj, xOffsetObj, row += 10);
          row += 5;
          if (row >= 755 && newPage === false) {
            doc.addPage();
            row = 20;
          }

          let cc = row;
          let ca = row;
          let cg = row;
          doc.setFontSize(8);
          doc.text('COMPETENCIAS CARDINALES  \t NIVEL', 40, cc += 10);
          doc.text('COMPETENCIAS POR AREA    \t NIVEL', 220, ca += 10);
          doc.text('COMPETENCIAS GERENCIALES \t NIVEL', 400, cg += 10);
          doc.setTextColor(0, 0, 0);
          d = 1;
          this.Requisicion.competenciasCardinal.forEach(x => {
            if (cc >= 755 && newPage === false) {
              doc.addPage();
              cc = 20;
              newPage = true;
            }
            const split = doc.splitTextToSize(d + '.- ' + x.competencia.toUpperCase(), 130);
            if (d === 1) {
              doc.text(40, cc += 10, split);
              doc.text(x.nivel, 180, cc);
            } else {
              doc.text(40, cc, split);
              doc.text(x.nivel, 180, cc);
            }
            d++;
            cc += split.length * 10;
          });
          d = 1;
          this.Requisicion.competenciasArea.forEach(x => {
            if (ca >= 755 && newPage === false) {
              doc.addPage();
              ca = 20;
              newPage = true;
            }
            const split = doc.splitTextToSize(d + '.- ' + x.competencia.toUpperCase(), 130);
            if (d === 1) {
              doc.text(220, ca += 10, split);
              doc.text(x.nivel, 360, ca);
            } else {
              doc.text(220, ca, split);
              doc.text(x.nivel, 360, ca);
            }
            d++;
            ca += split.length * 10;
          });
          d = 1;
          this.Requisicion.competenciasGerencial.forEach(x => {
            if (cg >= 755 && newPage === false) {
              doc.addPage();
              cg = 20;
              newPage = true;
            }
            const split = doc.splitTextToSize(d + '.- ' + x.competencia.toUpperCase(), 130);
            if (d === 1) {
              doc.text(400, cg += 10, split);
              doc.text(x.nivel, 545, cg);
            } else {
              doc.text(400, cg, split);
              doc.text(x.nivel, 545, cg);
            }
            d++;
            cg += split.length * 10;
          });

          if(ca > cc &&  ca > cg) {
            row = ca += 10;
          } else if ( cc > ca && cc > cg) {
            row = ca += 10;
          } else if ( cg > ca && cg > cc) {
            row = cg += 10;
          }

          let ArteAncho = 750 - row;
          if (row >= 500 && newPage === false) {
            doc.addPage();
            row = 20;
            ArteAncho = 300;
          }

          const Arte = 'ARTE';
          // this.arteDamfo = html2canvas($(arte)[0], { useCORS: true }).then(function (canvas) {
          //   const data = canvas.toDataURL('image/jpg', 1.0);
          //   console.log(data)
          //   return data;
          // });
          const xOffsetArte = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(Arte) * doc.internal.getFontSize() / 2);
          doc.setFontSize(10);
          doc.rect(20, row, 570, 15);
          doc.text(Arte, xOffsetArte, row += 10);
          row += 5;
          // doc.addImage(
          //   this.arteDamfo['__zone_symbol__value'], 'JPG',
          //   40,
          //   row += 10,
          //   530,
          //   ArteAncho
          // );
          const node = document.getElementById('my-node');
          doc.addImage(
            node['currentSrc'], 'PNG',
            40,
            row += 10,
            530,
            ArteAncho
          );
          doc.save(nombrePerfil + '.pdf');
          this.imprimir = false;
        }, 3000);
      } else {
        this.popToast('error', 'Descargar PDF', 'Algo salió mal, no se pudo recuperar la información para la descarga del PDF');
        this.imprimir = false;
      }
    });
  }

  //  ------------------------------------------------------------------------------------
  // Toasts (Mensajes del sistema)
  //  ------------------------------------------------------------------------------------
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
