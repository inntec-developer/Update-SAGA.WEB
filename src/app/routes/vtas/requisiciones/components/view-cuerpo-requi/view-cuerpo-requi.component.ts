import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CatalogosService, RequisicionesService } from '../../../../../service/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatTableDataSource, PageEvent } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../../../../core/settings/settings.service';

@Component({
  selector: 'app-view-cuerpo-requi',
  templateUrl: './view-cuerpo-requi.component.html',
  styleUrls: ['./view-cuerpo-requi.component.scss'],
  providers: [RequisicionesService, CatalogosService]
})
export class ViewCuerpoRequiComponent implements OnInit, OnChanges {
  @Input('Requisicion') Requisicion: string;
  @Input('ShowRequi') ShowRequi: boolean;
  @Input('CreateRequi') CreateRequi: boolean;

  public requisicion: any;
  public checked = false;
  public EstatusRequi: any;
  arte: string;

  constructor(
    private serviceRequisiciones: RequisicionesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.arte = 'DamsaVacantes_PP5';
    debugger;
    this.GetDataRequi();
  }

  // ngAfterViewInit(): void {
  //   if (this.Requisicion != null) {
  //     this.GetDataRequi();
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Requisicion && !changes.Requisicion.isFirstChange()) {
      this.GetDataRequi();
    }
  }

  GetDataRequi() {
    debugger;
    this.spinner.show();
    this.serviceRequisiciones.getNewRequi(this.Requisicion)
      .subscribe(data => {
        this.requisicion = data;
        debugger;
        this.arte = data['arte'];
        this.EstatusRequi = data.estatusId;
        this.spinner.hide();
      });
  }

}
