import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {
  @Input() Proceso: any[];
  constructor() { }

  ngOnInit() {
  }

}
