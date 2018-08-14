import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { RequisicionesService } from '../../../../../service/requisiciones/requisiciones.service';

@Component({
  selector: 'app-dt-direcion-requi',
  templateUrl: './dt-direcion-requi.component.html',
  styleUrls: ['./dt-direcion-requi.component.scss'],
  providers: [RequisicionesService]
})
export class DtDirecionRequiComponent implements OnInit {
  @Input() DireccionId: string;
  getAddress : boolean;
  public dataSource: MatTableDataSource<any[]>
  constructor(private service: RequisicionesService) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if(this.DireccionId != null){
      this.getDireccion(this.DireccionId);
    }
  }

  getDireccion(id){
    if(!this.getAddress){
      this.service.getRequiDireccion(id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.getAddress = true;
        console.log(data);
      })
      this.getAddress = true;
    }
  }

  //*******************************-- GRID-- *********************************************//
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
    'tipoDireccion',
    'pais',
    'estado',
    'municipio',
    'colonia',
    'calle',
    'numeroExterior',
    'numeroInterior',
    'codigoPostal',
    'activo',
    'esPrincipal'
  ];

}
export interface Element {
  tipoDireccion: string;
  pais: string;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  activo: boolean;
  esPrincipal: boolean;
}
