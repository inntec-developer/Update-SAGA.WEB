import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { AfterContentChecked, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CatalogosService, RequisicionesService } from '../../../../../service/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatTableDataSource, PageEvent } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-cuerpo-requi',
  templateUrl: './view-cuerpo-requi.component.html',
  styleUrls: ['./view-cuerpo-requi.component.scss'],
  providers: [RequisicionesService, CatalogosService]
})
export class ViewCuerpoRequiComponent implements OnInit {
  @Input('Requisicion') Requisicion: string;
  public requisicion: Array<any[]>;
  public checked: boolean = false;
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.Requisicion != null) {
      this.GetDataRequi();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.Requisicion && !changes.Requisicion.isFirstChange()) {
      this.GetDataRequi();
    }
  }

  GetDataRequi() {
    this.spinner.show();
    this.serviceRequisiciones.getNewRequi(this.Requisicion)
      .subscribe(data => {
        this.requisicion = data;
        this.spinner.hide();
      });
  }
}