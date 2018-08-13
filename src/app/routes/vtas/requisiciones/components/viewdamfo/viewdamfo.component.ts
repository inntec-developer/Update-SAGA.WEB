import { ActivatedRoute, Router, } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DialogdamfoComponent } from '../dialogdamfo/dialogdamfo.component'
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../../service/index';

@Component({
  selector: 'app-viewdamfo',
  templateUrl: './viewdamfo.component.html',
  styleUrls: ['./viewdamfo.component.scss'],
  providers: [RequisicionesService]
})
export class ViewdamfoComponent implements OnInit {
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
  nombreComercial: any;
  razonSocial: any;
  rfc: any;
  giroEmpresa: any;
  actividadEmpresa: any;




  constructor(
    private serviceRequisiciones: RequisicionesService,
    private dialog: MatDialog,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner:  NgxSpinnerService,
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
              console.log(data);      
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
              this.sueldoMinimo = data.sueldoMaximo;
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
      sueldoMaximo: this.sueldoMinimo,
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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>DAM-FO-290</title>
          
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
