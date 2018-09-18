import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentos-cliente',
  templateUrl: './documentos-cliente.component.html',
  styleUrls: ['./documentos-cliente.component.scss']
})
export class DocumentosClienteComponent implements OnInit {
  @Input() Documentos: any[];
  constructor() { }

  ngOnInit() {
  }

}
