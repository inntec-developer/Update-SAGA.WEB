import { AfterContentChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { DialogEditHorarioComponent } from './dialog-edit-horario/dialog-edit-horario.component';
import { RequisicionesService } from '../../../../../service';

@Component({
  selector: 'app-dt-horarios',
  templateUrl: './dt-horarios.component.html',
  styleUrls: ['./dt-horarios.component.scss'],
  providers: [RequisicionesService]
})
export class DtHorariosComponent implements OnInit, AfterContentChecked {
  @Input() Horarios: any[];
  public dataSource : MatTableDataSource<any[]>;
  getHorarios: boolean = false;
  ruta: string;
  constructor(
    private dialog: MatDialog,
    private service: RequisicionesService 
  ) {
   }

  ngOnInit(){}

  ngAfterContentChecked(){
    if(this.Horarios != null){
      this.cargarHorarios(this.Horarios);
    }
  }

  cargarHorarios(data){
    if(!this.getHorarios){
      this.dataSource = new MatTableDataSource(data);
      this.getHorarios =  true;
    }
  }

  openDialogEdit(element){
    let dialogEditH = this.dialog.open(DialogEditHorarioComponent, {
      width: '25%',
      height: 'auto',
      data: element
    });
    dialogEditH.afterClosed().subscribe(result => {
      this.service.getRequiHorarios(element.requisicionId).subscribe(data =>{
        this.getHorarios = false;
        this.cargarHorarios(data);
      });
    });
  }

  //*******************************-- GRID-- *********************************************//
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
    'nombre',
    'deDia',
    'aDia',
    'deHora',
    'aHora',
    'vacantes',
    'especificaciones',
    'accion'
  ]
}

export interface Element{
  nombre: string;
  deDia: string;
  aDia: string;
  deHora: string;
  aHHora: string;
  vacantes: number;
  especificaciones: string;
}
