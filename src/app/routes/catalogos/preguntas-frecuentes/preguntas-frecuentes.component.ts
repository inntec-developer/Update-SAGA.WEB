import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ApiConection } from '../../../service/api-conection.service';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import {Http} from '@angular/http';
import {MatTableDataSource} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { window } from 'rxjs-compat/operator/window';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.scss']
})
export class PreguntasFrecuentesComponent implements OnInit {
  public Pregunta : any[];
  public dataSource: MatTableDataSource<any[]>;

  constructor(
    private Servicio: CatalogosService,
    private spinner: NgxSpinnerService,
    private router : Router
  ) { }

  ngOnInit() {
    this.Servicio.getPreguntasFrecuentes().subscribe(item =>{
      this.Pregunta = item;
      this.dataSource = new MatTableDataSource(item);
    })
    document.oncontextmenu=null
  }
  displayedColumns = [
    'pregunta',
    'respuesta',
    'activo',
    'accion',
  ];

  // Filtro dentro del Grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  Agregar(){
    let pre = document.getElementById('addPregunta');
    let res = document.getElementById('addRepuesta');

    var pregunta = pre['value'];
    var respuesta = res['value'];
    if(pregunta == ''){alert('por favor escriba una pregunta'); return;}
    if(respuesta == ''){alert('por favor escriba una respuesta'); return;}
    this.Servicio.addPreguntasFrecuentes(pregunta,respuesta).subscribe(item =>{
      alert(item);
      this.ngOnInit()
    })
    //this.router.navigateByUrl('/catalogos/preguntas');
  }

  Guardar(id,obj){

    let activo = document.getElementById('checkbox-'+id+'-input')['checked'];
    let res = document.getElementById("tex_" + id)['value'];
    let pre = document.getElementById("Ptex_" + id)['value'];
    this.Servicio.GuardarPreguntasFrecuentes(id,pre,res,activo).subscribe(item =>{
      alert(item);
    })
   // location.reload();
  }

  Eliminar(id){
    this.Servicio.EliminarPreguntasFrecuentes(id).subscribe(item =>{
      alert(item);
      this.ngOnInit()
    })
  }

  Editar(id){

   let div = document.getElementById("res_" + id);
   let text = document.getElementById("tex_" + id);
   div.classList.add('ocultar');
   text.classList.remove('ocultar');
   let vali = text.classList.contains('ocultar');
  }

  Ocultar(id){

    let div = document.getElementById("res_" + id);
   let text = document.getElementById("tex_" + id);
   let info = text['value'];
   div['innerText'] = info;
   text.classList.add('ocultar');
   div.classList.remove('ocultar');
  }

  PEditar(id){

    let div = document.getElementById("Pres_" + id);
    let text = document.getElementById("Ptex_" + id);
    div.classList.add('ocultar');
    text.classList.remove('ocultar');
    let vali = text.classList.contains('ocultar');
   }

   POcultar(id){

    let div = document.getElementById("Pres_" + id);
   let text = document.getElementById("Ptex_" + id);
   let info = text['value'];
   div['innerText'] = info;
   text.classList.add('ocultar');
   div.classList.remove('ocultar');
  }

}
export interface Element {
  pregunta: string;
  respuesta: string;
  activo: boolean;
}
