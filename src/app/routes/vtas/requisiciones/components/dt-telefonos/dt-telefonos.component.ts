import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-dt-telefonos',
  templateUrl: './dt-telefonos.component.html',
  styleUrls: ['./dt-telefonos.component.scss']
})
export class DtTelefonosComponent implements OnInit, AfterContentChecked {
  @Input() Telefonos: any[];
  public dataSource : MatTableDataSource<any[]>;
  getPhone : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    if(this.Telefonos != null){
      this.cargarTelefonos(this.Telefonos);
    }
  }

  cargarTelefonos(data){
    if(!this.getPhone){
      this.dataSource =  new MatTableDataSource(data);
      this.getPhone = true;
    }
  }
  //*******************************-- GRID-- *********************************************//
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
  'tipoTelefono',
  'telefono',
  'extension',
  'activo',
  'esPrincipal',
  ]
}

export interface Element{
  activo: boolean;
  claveLada: string;
  calvePais: string;
  esPrincipal: string;
  extension: string;
  telefono: string;
  tipoTelefono: string;
}
