import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReportesService } from '../../../service/Reporte/reportes.service';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
