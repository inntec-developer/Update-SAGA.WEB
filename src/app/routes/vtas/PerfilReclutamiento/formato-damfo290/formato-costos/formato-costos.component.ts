import { CostosService } from './../../../../../service/Costos/costos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formato-costos',
  templateUrl: './formato-costos.component.html',
  styleUrls: ['./formato-costos.component.scss']
})
export class FormatoCostosComponent implements OnInit {
  dataSource: any = [];

  constructor(private _serviceCostos: CostosService) { }

  ngOnInit() {
    this.GetCostos();
  }

  GetCostos() {
    this._serviceCostos.GetCostos().subscribe(result => {
      this.dataSource = result;
    });
  }

}
