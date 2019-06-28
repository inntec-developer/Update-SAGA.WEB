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
  @Input('ShowRequi') ShowRequi: boolean;
  @Input('CreateRequi') CreateRequi: boolean;
  public requisicion: any;
  public checked: boolean = false;
  public EstatusRequi: any;

  constructor(
    private serviceRequisiciones: RequisicionesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    if (this.Requisicion != null) {
      this.GetDataRequi();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Requisicion && !changes.Requisicion.isFirstChange()) {
      this.GetDataRequi();
    }
  }

  GetDataRequi() {
    this.spinner.show();
    this.serviceRequisiciones.getNewRequi(this.Requisicion)
      .subscribe(data => {
        this.requisicion = data;
        this.EstatusRequi = data.estatusId;
        this.spinner.hide();
      });
  }
}
