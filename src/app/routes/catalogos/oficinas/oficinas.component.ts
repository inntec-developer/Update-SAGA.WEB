import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ApiConection } from '../../../service/api-conection.service';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import {Http} from '@angular/http';
import {MatTableDataSource} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { window } from 'rxjs-compat/operator/window';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.scss']
})
export class OficinasComponent implements OnInit {

  //scroll
  public disabled = false;
  public compact = false;
  public invertX = false;
  public invertY = false;
  public shown = 'hover';

  closeResult: string;
  public datos : any[];
  public Estado : any[];
  public Municipio : any[];
  public Colonia : any[];
  public tipo : any[];
  public dataSource: MatTableDataSource<any[]>;

  public nombre:string;
  public cp:string;
  public calle:string;
  public num :string;
  public tel :string;
  public email :string;
  public lat :string;
  public lon :string;
 
  public act :boolean;

  constructor(
    private Servicio: CatalogosService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.LlamarOfi();
    document.oncontextmenu=null
    this.llamartipo();

  }

  llamartipo(){
    this.tipo = [{id:0,nombre:'Seleccione tipo de reclutamiento'},
    {id:3,nombre:'Reclutamiento'},
    {id:1,nombre:'Corporativo'},
    {id:2,nombre:'Ventas'},
    {id:4,nombre:'Filial'},
    {id:5,nombre:'Representante'}]
  }

  LlamarOfi(){
    this.Servicio.getSucursales('').subscribe(item =>{

      this.datos = item;

      })
  }

  Filtroo(){
    let fil = document.getElementById('palabra')['value'];
    this.Servicio.getSucursales(fil).subscribe(item =>{
      this.datos = item;

      })
  }

  Guardar(){
    let nom = document.getElementById('nombreOfi')['value'];
    let est = document.getElementById('EstadoOfi')['value'];
    let mun = document.getElementById('MunicipioOfi')['value'];
    let col = document.getElementById('colonia')['value'];
    let cp = document.getElementById('cp')['value'];
    let calle = document.getElementById('calle')['value'];
    let num = document.getElementById('numero')['value'];
    let tel = document.getElementById('telefono')['value'];
    let email = document.getElementById('email')['value'];
    let lat = document.getElementById('latitud')['value'];
    let lon = document.getElementById('longitud')['value'];
    let tipo = document.getElementById('tipoOfi')['value'];
    let act = document.getElementById('checkModal-input')['checked'];
    let id = document.getElementById('Identi')['value'];

    if(tipo == "0"){
      alert("Seleccione un tipo de reclutamiento")
      return
    }

    if(id == '0'){
      this.Servicio.GuardarOficina(nom , est , mun , col , cp , calle , num , tel , email ,lat , lon , tipo ).subscribe(item =>{
        alert(item)
        this.LlamarOfi();
      })
    }else{
      this.Servicio.EditarOficina(nom , est , mun , col , cp , calle , num , tel , email ,lat , lon , tipo,act,id ).subscribe(item =>{
        alert(item)
        this.LlamarOfi();
      })
    }

   // alert(nom + est + mun + col + cp + calle + num + tel + email +lat + lon + tipo + act)

  }

  Actualizar(){
    this.nombre = document.getElementById('nombre_')['value'];
  //  nombre = "hola";
    let est = document.getElementById('EstadoOfi')['value'];
    let mun = document.getElementById('MunicipioOfi')['value'];
    let col = document.getElementById('colonia')['value'];
    let cp = document.getElementById('cp')['value'];
    let calle = document.getElementById('calle')['value'];
    let num = document.getElementById('numero')['value'];
    let tel = document.getElementById('telefono')['value'];
    let email = document.getElementById('email')['value'];
    let lat = document.getElementById('latitud')['value'];
    let lon = document.getElementById('longitud')['value'];
    let tipo = document.getElementById('tipoOfi')['value'];
    let act = document.getElementById('checkModal-input')['checked'];
    let id = document.getElementById('Identi')['value'];

   // alert(nom + est + mun + col + cp + calle + num + tel + email +lat + lon + tipo + act)
    // this.Servicio.EditarOficina(nom , est , mun , col , cp , calle , num , tel , email ,lat , lon , tipo,act,id ).subscribe(item =>{
    //     alert(item)
    //     this.LlamarOfi();
    //   })
  }

  Eliminar(id){

    this.Servicio.EliminarOficina(id).subscribe(item =>{
      alert(item);
      this.ngOnInit()
      this.LlamarOfi();
    })
  }

  AbrirModal(){
    document.getElementById('Identi')['value'] = '0';
    document.getElementById('tipoOfi')['value'] = '3';
    

    this.nombre = "";
    this.cp = "";
    this.calle = "";
    this.num = "";
    this.tel = "";
    this.email = "";
    this.lat = "";
    this.lon = "";

   
    this.nombre = '';
    this.Servicio.getOficinaEstado('0').subscribe(item =>{
      this.Estado = item;

      })
      this.Municipio = [{id:0,municipio:'Seleccione un municipio'}]
      this.Colonia = [{id:0,colonia:'Seleccione una colonia'}]
      
  }

  EditarModal(id){

    document.getElementById('Identi')['value'] = id;
    this.nombre = document.getElementById('nombre_' + id)['value'];
    this.cp = document.getElementById('codigopostal_' + id)['value'];
    this.calle = document.getElementById('calle_' + id)['value'];
    this.num = document.getElementById('numero_' + id)['value'];
    this.tel = document.getElementById('telefono_' + id)['value'];
    this.email = document.getElementById('Correo_' + id)['value'];
    this.lat = document.getElementById('longitud_' + id)['value'];
    this.lon = document.getElementById('latitud_' + id)['value'];
    let es = document.getElementById('Estadoid_' + id)['value'];
    let mun = document.getElementById('Municipio_'+ id)['value'];
    let col = document.getElementById('Colonia_'+ id)['value'];
    var ofiId = document.getElementById('TipoOficina_'+ id)['value'];
   
    document.getElementById('tipoOfi')['value'] = ofiId;

    this.Servicio.getOficinaEstado(es).subscribe(item =>{
      this.Estado = item;

      })

    this.Servicio.getOficinaMunicipio(mun,es).subscribe(item =>{
      this.Municipio = item;
      })

      this.Servicio.getOficinaColonia(col,mun).subscribe(item =>{
        this.Colonia = item;
        })

  }



  Muni(){
    let res = document.getElementById('EstadoOfi')['value'];
    this.Servicio.getOficinaMunicipio('0',res).subscribe(item =>{
      this.Municipio = item;
      if(res == '0'){
        this.Municipio = null;
      }

      })
      this.Colonia = null;
  }

  Col(){
    let res = document.getElementById('MunicipioOfi')['value'];
    this.Servicio.getOficinaColonia('0',res).subscribe(item =>{
      this.Colonia = item;
      if(res == '0'){
        this.Colonia = null;
      }

      })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  displayedColumns = [
    'nombre',
    'tipoOficina',
    'Direccion',
    'latitud',
    'longitud',
   'telefono',
    'accion'
  ];

  // Filtro dentro del Grid
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   // this.datos = this.datos();
  }

}

export interface Element {
  id: string;
  nombre: string;
  latitud: string;
  longitud: string;
  tipoOficina: string;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  numeroExt: string;
  telefono: string;
  correo: string;
}

