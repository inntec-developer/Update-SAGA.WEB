import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { CatalogosService, RequisicionesService } from '../../../../../service/index';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatTableDataSource, PageEvent} from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-cuerpo-requi',
  templateUrl: './view-cuerpo-requi.component.html',
  styleUrls: ['./view-cuerpo-requi.component.scss'],
  providers: [RequisicionesService, CatalogosService]
})
export class ViewCuerpoRequiComponent implements OnInit, AfterContentChecked {
  @Input() Requisicion: string;
  public requiId: string;
  public requisicion:Array<any[]>;
  public checked : boolean = false;
  sueldoMinimo: any;
  sueldoSemanalMin: number;
  sueldoDiarioMin: number;
  sueldoMaximo: number;
  sueldoDiarioMax: number;
  sueldoSemanalMax: number;

  constructor(
    private serviceRequisiciones: RequisicionesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    
  }

  ngAfterContentChecked(){
    if(this.Requisicion != null && this.checked == false ){
      this.checked=true;
      this.GetDataRequi();
    }
  }

  GetDataRequi(){
    this.spinner.show();
    this.requiId = this.Requisicion;
    this.serviceRequisiciones.getNewRequi(this.requiId)
      .subscribe(data => {
        console.log('Data:  ', data)
        this.requisicion = data;
        this.spinner.hide();
      });
    }
}