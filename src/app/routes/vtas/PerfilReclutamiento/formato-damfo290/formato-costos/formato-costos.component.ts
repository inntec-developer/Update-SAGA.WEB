import { CostosService } from './../../../../../service/Costos/costos.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formato-costos',
  templateUrl: './formato-costos.component.html',
  styleUrls: ['./formato-costos.component.scss']
})
export class FormatoCostosComponent implements OnInit {
  @Input() IdFormato: any;
  dataSource: any = [];
  costos: any = [];
  aplica = false;
  constructor(private _serviceCostos: CostosService) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.GetCostos();
  }

  GetCostos() {
    this._serviceCostos.GetCostos().subscribe(result => {
      this.dataSource = result;
    });
  }

  GuardarCosto(row, costo) {
    this.costos.push({
        TipoCostosId: row.tipoId,
        Costo: parseFloat(costo),
        DAMFO290Id: this.IdFormato
      }
    );
    row.disabled = true;
    console.log(row)
    console.log(this.costos)

  }

}
