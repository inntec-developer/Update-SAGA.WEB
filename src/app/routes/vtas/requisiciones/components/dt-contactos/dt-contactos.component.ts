import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, PageEvent, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dt-contactos',
  templateUrl: './dt-contactos.component.html',
  styleUrls: ['./dt-contactos.component.scss']
})
export class DtContactosComponent implements OnInit {
  @Input() Contactos: any[];
  public dataSource : MatTableDataSource<any[]>;
  getPhone : boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    if(this.Contactos != null){
      this.cargarContactos(this.Contactos);
    }
  }

  cargarContactos(data){
    if(!this.getPhone){
      this.dataSource =  new MatTableDataSource(data);
      this.getPhone = true;
    }
  }
  //*******************************-- GRID-- *********************************************//
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
    'nombre',
    'puesto',
    'tipoTelefono',
    'extension',
    'telefono',
    'email'
  ]
}

  export interface Element{
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  puesto: string;
  activo: boolean;
  claveLada: string;
  calvePais: string;
  esPrincipal: string;
  extension: string;
  telefono: string;
  tipoTelefono: string;
  email: string;
  }
