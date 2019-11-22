import { filter } from 'rxjs-compat/operator/filter';
import { CostosService } from './../../../../../service/Costos/costos.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formato-costos',
  templateUrl: './formato-costos.component.html',
  styleUrls: ['./formato-costos.component.scss']
})
export class FormatoCostosComponent implements OnInit, OnChanges {
  @Input('IdFormato') IdFormato: any;
  public form: FormGroup;
  dataSource: any = [];
  costos: any = [];
  aplica = false;
  validar = false;
  constructor(private _serviceCostos: CostosService) {
    this.form = new FormGroup({
      checkAplica: new FormControl(false),
      costoMedico: new FormControl('', Validators.required)
   });
  }

  ngOnInit() {
    // this.IdFormato = this.IdFormato || null;
    this.GetCostos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this._serviceCostos.GetCostosByDamfo(this.IdFormato).subscribe(result => {
        this.dataSource = result;
        if ( this.dataSource.length === 0) {
          this.aplica = true;
        } else {
          this.aplica = false;
          this.form.patchValue({
            checkAplica: this.aplica,
            costoMedico: this.dataSource[0].tipos.value
          });
        this.validar = true;
        }
    });
  }
}
  GetCostos() {
    this._serviceCostos.GetCostos().subscribe(result => {
      this.dataSource = result;
    });
  }

  GetCostosByDamfo() {
    this._serviceCostos.GetCostosByDamfo(this.IdFormato).subscribe(result => {

      this.dataSource = result;


     const mocos = this.dataSource.filter( element => element.value > 0 );
      if(mocos.length > 0) {
        this.aplica = true;
      }
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
    this.validar = true;
    console.log(row)
    console.log(this.costos)

  }

}
