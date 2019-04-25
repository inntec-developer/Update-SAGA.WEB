import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
// Modelos
import { filtros } from '../../../models/catalogos/catalogos';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit, OnChanges {

  @Input() IdCat: number;
  @Input() Estados: any[];
  @Input() Municipios: any[];
  municipios: any[];

  private Filtros: filtros = new filtros();

  @Output() Parametros = new EventEmitter<filtros>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
   if (!changes['IdCat']) {
  }
}

  ChEstado(Estado: string) {
    if (this.IdCat === 4) {
      this.municipios = this.Municipios.filter( e => e.estado === Estado);
    }
    this.Filtros.IdEstado = this.Estados.find( i => i.estado === Estado).id;
  }

  ChMunicipio(IdMun: number) {
    this.Filtros.IdMunicipio = IdMun;
  }

  Aplica() {
    this.Filtros.IdCat = this.IdCat;
    this.Parametros.emit(this.Filtros);
  }

}
