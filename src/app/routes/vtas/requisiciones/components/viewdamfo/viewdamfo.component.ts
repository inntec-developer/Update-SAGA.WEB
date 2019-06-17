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
  public damfo290: any;

  public data: any;
  public ClienteInfo: any;
  public periodoPagoId: any;
  public cliente: any;

  public imprimir: boolean;





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
              debugger;
              if(data.TipoContratoId == null)
              {
                data.TipoContratoId = 0;
              }
              this.ClienteInfo = data['cliente'];
              this.periodoPagoId = data.periodoPagoId;
              this.damfo290 = data;
              this.spinner.hide();
            });

      }else{
          console.log('Error al cargar información');
      }

    });
  }

  openDialog(){
    this.data  = {
      cliente: this.ClienteInfo['nombreComercial'],
      claseReclutamiento: this.damfo290['claseReclutamiento'],
      tipoReclutamiento: this.damfo290['tipoReclutamiento'],
      sueldoMinimo: this.damfo290['sueldoMinimo'],
      sueldoMaximo: this.damfo290['sueldoMaximo'],
      nombrePerfil: this.damfo290['nombrePerfil'],
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
      document.getElementById('content').style.marginLeft = "70px";
      document.getElementById('content').style.marginTop = "15px";
      document.getElementById('content').style.marginRight = "0px";
      document.getElementById('content').style.marginBottom = "15px";

      window.print();
    }, 500);
    setTimeout(() => {
      this.imprimir = false;
      document.getElementById('content').style.marginTop = "0";
      document.getElementById('content').style.marginLeft = "0";
    }, 500);

  }
}
