import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-prestaciones-cliente',
  templateUrl: './prestaciones-cliente.component.html',
  styleUrls: ['./prestaciones-cliente.component.scss']
})
export class PrestacionesClienteComponent implements OnInit {
  @Input() Prestaciones: any[];
  constructor() { }

  ngOnInit() {
  }

}
