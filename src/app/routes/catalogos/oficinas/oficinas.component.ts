import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';
import { ActivatedRoute,Router} from '@angular/router';
import {Http} from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiConection } from '../../../service/api-conection.service';
import {MatTableDataSource} from '@angular/material';
import { window } from 'rxjs-compat/operator/window';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.scss']
})
export class OficinasComponent implements OnInit {
 
  closeResult: string;
  public datos : any[];
  public Estado : any[];
  public Municipio : any[];
  public Colonia : any[];
  public dataSource: MatTableDataSource<any[]>;

  constructor(
    private Servicio: CatalogosService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.LlamarOfi();
    document.oncontextmenu=null
  }

  LlamarOfi(){
    this.Servicio.getSucursales('').subscribe(item =>{
     
      this.datos = item;
        console.log(item);
      })
  }

  Filtroo(){
    let fil = document.getElementById('palabra')['value'];
    this.Servicio.getSucursales(fil).subscribe(item =>{
      this.datos = item;
        console.log(item);
      })
  }

  Guardar(){
    let nom = document.getElementById('nombre')['value'];
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

    if(id == ''){
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
    let nom = document.getElementById('nombre')['value'];
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
debugger
   // alert(nom + est + mun + col + cp + calle + num + tel + email +lat + lon + tipo + act)
    this.Servicio.EditarOficina(nom , est , mun , col , cp , calle , num , tel , email ,lat , lon , tipo,act,id ).subscribe(item =>{
        alert(item)
        this.LlamarOfi();
      })
  }

  Eliminar(id){
   
    this.Servicio.EliminarOficina(id).subscribe(item =>{
      alert(item);
      this.ngOnInit()
      this.LlamarOfi();
    })
  }

  AbrirModal(){
    document.getElementById('Identi')['value'] = '';
    this.Servicio.getOficinaEstado('0').subscribe(item =>{
      this.Estado = item;
        console.log(item);
      })
  }

  EditarModal(id){
   
    document.getElementById('Identi')['value'] = id;
  //  document.getElementById('nombre')['value'] = document.getElementById('nombre_' + id)['value'];
  //  document.getElementById('calle')['value'] = document.getElementById('calle_' + id)['value'];
  //  document.getElementById('numero')['value'];document.getElementById('numero_' + id)['value'];
  //  document.getElementById('telefono')['value'] = document.getElementById('telefono_' + id)['value'];
  //  document.getElementById('email')['value'] = document.getElementById('Correo_' + id)['value'];
  //  document.getElementById('latitud')['value'] = document.getElementById('latitud_' + id)['value'];
  //  document.getElementById('longitud')['value'] = document.getElementById('longitud_' + id)['value'];
  //  document.getElementById('cp')['value'] = document.getElementById('codigopostal_' + id)['value'];
  
    this.Servicio.getOficinaEstado('0').subscribe(item =>{
      this.Estado = item;
        console.log(item);
      })
  }



  Muni(){
    let res = document.getElementById('EstadoOfi')['value'];
    this.Servicio.getOficinaMunicipio('0',res).subscribe(item =>{
      this.Municipio = item;
      if(res == '0'){
        this.Municipio = null;
      }
        console.log(item);
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
        console.log(item);
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

