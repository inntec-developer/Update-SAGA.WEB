// import * as jsPDF from 'jspdf';

import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource, PageEvent} from '@angular/material';

import { CatalogosService } from '../../../../../service';
import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service/index';
import { SettingsService } from '../../../../../core/settings/settings.service';

@Component({
  selector: 'app-viewdamfo',
  templateUrl: './viewdamfo.component.html',
  styleUrls: ['./viewdamfo.component.scss'],
  providers: [RequisicionesService]
})
export class ViewdamfoComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  // Formularios

  //Variables
  public damfoId: string;
  public damfo290: Array<any[]> = [];

  data: any;
  periodoPagoId: any;
  cliente: any;
  claseReclutamiento: any;
  tipoReclutamiento: any;
  nombrePerfil: any;
  sueldoMinimo: any;
  sueldoMaximo: any;
  nombreComercial: any;
  razonSocial: any;
  rfc: any;
  giroEmpresa: any;
  actividadEmpresa: any;

  imprimir: boolean;





  constructor(
    private serviceRequisiciones: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner:  NgxSpinnerService,
    public settings: SettingsService,
  ) {

    }
  ngOnInit() {
      this.GetDateDamfo();
  }

  GetDateDamfo(){
    this.spinner.show();
    this._Route.params.subscribe(params => {
      if(params['IdDamfo'] != null){
        this.damfoId = params['IdDamfo'];
        this.serviceRequisiciones.getDamfoById(this.damfoId)
            .subscribe(data => {
              if(data.TipoContratoId == null)
              {
                data.TipoContratoId = 0;
              }
              this.periodoPagoId = data.periodoPagoId
              this.damfo290 = data;
              this.nombreComercial = data.cliente.nombrecomercial;
              this.razonSocial = data.cliente.razonSocial;
              this.rfc = data.cliente.rfc;
              this.giroEmpresa = data.cliente.giroEmpresas.giroEmpresa;
              this.actividadEmpresa = data.cliente.actividadEmpresas.actividadEmpresa;
              this.nombrePerfil = data.nombrePerfil;
              this.sueldoMinimo = data.sueldoMinimo;
              this.sueldoMaximo = data.sueldoMaximo;
              this.claseReclutamiento = data.claseReclutamiento.clasesReclutamiento;
              this.tipoReclutamiento = data.tipoReclutamiento.tipoReclutamiento;
              this.spinner.hide();
            });

      }else{
          console.log('Error al cargar información');
      }

    });
  }

  openDialog(){
    this.data  = {
      cliente: this.nombreComercial,
      claseReclutamiento: this.claseReclutamiento,
      tipoReclutamiento: this.tipoReclutamiento,
      sueldoMinimo: this.sueldoMinimo,
      sueldoMaximo: this.sueldoMaximo,
      nombrePerfil: this.nombrePerfil,
      id: this.damfoId
    }
    let dialogRef = this.dialog.open(DialogdamfoComponent,{
      width: '50%',
      height: 'auto',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  print(){
    this.imprimir = true;
    if(!this.settings.layout.isCollapsed){
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    }
    setTimeout(() => {
      document.getElementById('content').style.marginLeft = "60px";
      document.getElementById('content').style.marginTop = "25px";
      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = "0";
      document.getElementById('content').style.marginLeft = "0";
    }, 500);

  }

  // print(){
  //   var mywindow = window.open('', 'PRINT', 'height=400,width=600');

  //   mywindow.document.write('<html><head><title>' + document.title  + '</title>');
  //   mywindow.document.write('</head><body >');
  //   mywindow.document.write('<h1>' + document.title  + '</h1>');
  //   mywindow.document.write(document.getElementById('content').innerHTML);
  //   mywindow.document.write('</body></html>');

  //   mywindow.document.close(); // necessary for IE >= 10
  //   mywindow.focus(); // necessary for IE >= 10*/

  //   mywindow.print();
  //   mywindow.close();

  //   return true;
  // }

  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById('content').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>DAM-FO-290</title>

  //       </head>
  //      <body onload="window.print();window.close()">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();
  // }

  // public downloadPDF(){
  //   let doc = new jsPDF('p', 'pt', 'letter');
  //   let margins = {
  //     top: 80,
  //     bottom: 60,
  //     left: 40,
  //     width: 522
  //   };
  //   let specialElementHandlers = {
  //     '#editor': function(elemet: any, renderer: any){
  //       return true;
  //     }
  //   }
  //   doc.fromHTML(document.getElementById('content').innerHTML, 15, 15,{
  //     'width': 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('test.pdf');

  // }
}
