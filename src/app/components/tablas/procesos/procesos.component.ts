import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {
  @Input() Proceso: any[];
  constructor() {
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Proceso && !changes.Proceso.isFirstChange()) {
      this.Proceso = this.Ordenar();
      console.log(this.Proceso);
    }

  }

  Ordenar() {
    debugger;
    if (this.Proceso != null) {
      for (var i = 1; i < this.Proceso.length; i++) {
        for (var j = 0; j < (this.Proceso.length - i); j++) {
          if (this.Proceso[j]['orden'] > this.Proceso[j + 1]['orden']) {
            var k = this.Proceso[j + 1];
            this.Proceso[j + 1] = this.Proceso[j];
            this.Proceso[j] = k;
          }
        }
      }
      return this.Proceso;
    }

  }
}
