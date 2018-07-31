import { Component, OnInit } from '@angular/core';
import { Requis } from '../../../service/DisenioVacante/CatalogoRequi.service';
import { ActivatedRoute,Router} from '@angular/router/';
import {Http} from '@angular/http';
//Element  Angular Material
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss'],
  providers:[Requis]
})
export class VacantesComponent implements OnInit {
public datos : any[]

  constructor(
    private service: Requis
    ,private http: Http
    ,private route: ActivatedRoute
    ,private router: Router
  ) { }

  //Varaibales Globales
  public dataSource: MatTableDataSource<any[]>;

  ngOnInit() {
    this.service.getRequis()
    .subscribe(
      e=>{
        this.datos = e;
        this.dataSource = new MatTableDataSource(e);
      })
  }
  // Display para mostrar los objetos en el Grid
  displayedColumns = [
    'vBtra',
    'experiencia',
    'nombre',
    'actividad',
    'claseReclutamiento',
    'accion',
  ];

  // Filtro dentro del Grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  Onclick(id:string){
    this.router.navigate(['/reclutamiento/disenador'], { queryParams: { Requi: id } });
  //  this.router.navigate(['/reclutamiento/configuracionVacante',id],{skipLocationChange:true});
    //this.router.navigate(['/systems'], { queryParams: { x: x } });
   //window.location.href = '/reclutamiento/disenador';
  }
  IrHome(){
    this.router.navigate(['/home']);
  }
}

export interface Element {
  id: string;
  vBtra: string;
  experiencia: string;
  nombre: string;
  claseReclutamiento:string;
  actividad:string;
}
