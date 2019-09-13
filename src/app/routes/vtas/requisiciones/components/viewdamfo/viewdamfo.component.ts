// import * as jsPDF from 'jspdf';

import * as jspdf from 'jspdf';

import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService, RequisicionesService } from '../../../../../service/index';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../core/settings/settings.service';
import html2canvas from 'html2canvas';

declare var $: any;

@Component({
  selector: 'app-viewdamfo',
  templateUrl: './viewdamfo.component.html',
  styleUrls: ['./viewdamfo.component.scss'],
  providers: [RequisicionesService, CatalogosService]
})
export class ViewdamfoComponent implements OnInit {

  @ViewChild('PrintDamfo') content: ElementRef;

  base64Img = null;
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };

  public Perfil290: boolean;

  // Variables
  public damfoId: string;
  public damfo290: any;

  public data: any;
  public ClienteInfo: any;
  public periodoPagoId: any;
  public cliente: any;

  public imprimir: boolean;

  public isEditable: boolean;

  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  arte: string;

  documentosDamsa: any[];
  prestacionesLey: any[];
  direcciones: any[];
  rutasCamion: any[];

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
    private serviceRequisiciones: RequisicionesService,
    private dialog: MatDialog,
    private _Route: ActivatedRoute,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    public settings: SettingsService,
    private toasterService: ToasterService,
    private serviceCatalogos: CatalogosService

  ) {
    this.getParams();
  }
  ngOnInit() {
    this.spinner.show();
    this.serviceCatalogos.getDocumentosDamsa()
      .subscribe(data => {
        this.documentosDamsa = data;
        console.log(this.documentosDamsa);
      });
    this.serviceCatalogos.getPrestacionesLey()
      .subscribe(data => {
        this.prestacionesLey = data;
      });
    if (this.damfoId != null) {
      this.serviceRequisiciones.getDamfoById(this.damfoId)
        .subscribe(data => {
          if (data.TipoContratoId == null) {
            data.TipoContratoId = 0;
          }
          this.ClienteInfo = data['cliente'];
          this.periodoPagoId = data.periodoPagoId;
          this.damfo290 = data;
          this.direcciones = [];
          this.arte = this.damfo290['arte'];
          this.serviceRequisiciones.getDamfoRutasCamion(this.damfo290.clienteId).subscribe(rutas => {
            this.rutasCamion = rutas;
          });

          this.damfo290['cliente']['direcciones'].forEach(x => {
            const address = {
              direccion: x.calle + ', ' +
                x.numeroExterior + ', ' +
                x.colonia + ', ' +
                x.municipio + ', ' +
                x.estado + ', ' +
                x.pais
            };
            this.direcciones.push(address);
          });
          if (data['usuarioAlta'] === this.settings['user']['usuario']) {
            this.isEditable = true;
          } else {
            this.isEditable = false;
          }
          this.spinner.hide();
        });
    }
  }

  getParams() {
    this._Route.params.subscribe(params => {
      if (params['IdDamfo'] != null) {
        this.damfoId = params['IdDamfo'];
        this.Perfil290 = params['Perfil290'] || false;
      } else {
        this.popToast(
          'error',
          'Nueva Requisicion',
          'Error al intentar notificar por medio de correo electrónico la creación de la requisición.');
        this._Router.navigate(['/ventas/crearRequisicion']);
      }
    });
  }

  openDialog() {
    this.data = {
      cliente: this.ClienteInfo['nombrecomercial'],
      claseReclutamiento: this.damfo290['claseReclutamiento'],
      tipoReclutamiento: this.damfo290['tipoReclutamiento'],
      sueldoMinimo: this.damfo290['sueldoMinimo'],
      sueldoMaximo: this.damfo290['sueldoMaximo'],
      nombrePerfil: this.damfo290['nombrePerfil'],
      id: this.damfoId
    };
    const dialogRef = this.dialog.open(DialogdamfoComponent, {
      width: '50%',
      height: 'auto',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  return() {
    if (!this.Perfil290) {
      this._Router.navigate(['/ventas/crearRequisicion']);
    } else {
      this._Router.navigate(['/reclutamiento/290']);
    }
  }

  editFormato() {
    this._Router.navigate(['/ventas/formato290', this.damfoId], { skipLocationChange: true });
  }


  print() {
    this.imprimir = true;
    setTimeout(() => {
      const nombrePerfil = this.damfo290['nombrePerfil'];
      const HTML_Width = $('.clsPrintDamfo').width();
      const HTML_Height = $('.clsPrintDamfo').height();
      const transform = $('.gm-style>div>div>div>div').css('transform');
      const comp = transform.split(','); // split up the transform matrix
      const mapleft = parseFloat(comp[4]); // get left value
      const maptop = parseFloat(comp[5]);  // get top value
      $('.gm-style>div>div>div>div').css({ // get the map container. not sure if stable
        'transform': 'none',
        'left': mapleft + (mapleft * .5),
        'top': maptop + (maptop * .5),
      });
      const transformM = $('.gm-style>div>div>div>div>div>div>div').css('transform');
      const compM = transformM.split(','); // split up the transform matrix
      const mapleftM = parseFloat(compM[4]); // get left value
      const maptopM = parseFloat(compM[5]);  // get top value
      $('.gm-style>div>div>div>div>div>div>div').css({ // get the map container. not sure if stable
        'transform': 'none',
        'left': mapleftM + (mapleftM * .5),
        'top': maptopM + (maptopM * .5),
      });
      html2canvas($('.clsPrintDamfo')[0], { windowWidth: 1500, useCORS: true }).then(function (canvas) {
        canvas.getContext('2d');
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jspdf('p', 'pt', 'letter');

        const top_left_margin = 15;
        const PDF_Width = pdf.internal.pageSize.getWidth();
        const PDF_Height = pdf.internal.pageSize.getHeight();
        const canvas_image_width = HTML_Width;
        const canvas_image_height = HTML_Height;

        const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 2;

        pdf.addImage(
          imgData, 'JPEG',
          top_left_margin,
          top_left_margin,
          570,
          HTML_Height - 1300
        );

        for (let i = 1; i <= totalPDFPages; i++) {
          pdf.addPage([PDF_Width, PDF_Height]);
          pdf.addImage(imgData,
            'JPG', top_left_margin,
            -(PDF_Height * i) + (top_left_margin * 4),
            570,
            HTML_Height - 1300
          );
        }
        pdf.save(nombrePerfil + '.pdf');
      });
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
    }, 2000);
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
