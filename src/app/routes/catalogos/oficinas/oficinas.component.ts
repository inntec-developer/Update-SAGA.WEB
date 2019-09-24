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
  public rows: Array<any> = [];
  requisiciones = [];

  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 25;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public masivo: number = 0;
  public operativo: number = 0;
  public especializado: number = 0;
  public total: number = 0;
  public columns: Array<any>;

  registros: any;
  showFilterRow: boolean;

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
    this.LimpiaFiltro(0);
    this.LimpiaFiltro(1);
    this.Servicio.getSucursales('').subscribe(item =>{

      this.datos = item;
      this.requisiciones = item;
      this.onChangeTable(this.config);
      this.spinner.hide();
      

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
debugger;
    document.getElementById('Identi')['value'] = id;
    this.nombre = document.getElementById('nombre_' + id)['value'];
    this.cp = document.getElementById('codigopostal_' + id)['value'];
    this.calle = document.getElementById('calle_' + id)['value'];
    this.num = document.getElementById('numero_' + id)['value'];
    this.tel = document.getElementById('telefono_' + id)['value'];
    this.email = document.getElementById('correo_' + id)['value'];
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


  LimpiaFiltro(valor){
    if(valor = 0){
      this.columns = [];
    }else{
      this.columns = [
        { title: 'Nombre', className: 'text-info text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'nombre' } },
        { title: 'municipio', className: 'text-success text-center', name: 'municipio', filtering: { filterString: '', placeholder: 'municipio' } },
        { title: 'Estado', className: 'text-success text-center', name: 'estado', filtering: { filterString: '', placeholder: 'estado' } },
        { title: 'calle y Numero', className: 'text-success text-center', name: 'calle', filtering: { filterString: '', placeholder: 'calle' } },
        { title: 'colonia', className: 'text-success text-center', name: 'colonia', filtering: { filterString: '', placeholder: 'colonia' } },
        { title: 'telefono', className: 'text-success text-center', name: 'telefono', filtering: { filterString: '', placeholder: 'telefono' } },
        { title: 'Correo', className: 'text-success text-center', name: 'correo', filtering: { filterString: '', placeholder: 'correo' } },
        { title: 'latitud', className: 'text-success text-center', name: 'latitud', filtering: { filterString: '', placeholder: 'latitud' } },
        { title: 'longitud', className: 'text-success text-center', name: 'longitud', filtering: { filterString: '', placeholder: 'longitud' } },
        { title: 'tipoOficina', className: 'text-success text-center', name: 'tipoOficina', filtering: { filterString: '', placeholder: 'tipo Oficina' } },
        { title: 'Activo', className: 'text-success text-center'},
        { title: 'Accion', className: 'text-success text-center'}, 
      ];
    }
  }


public config: any = {
  paging: true,
  //sorting: { columns: this.columns },
  filtering: { filterString: '' },
  className: ['table-hover  mb-0']
};

public changePage(page: any, data: Array<any> = this.requisiciones): Array<any> {
  let start = (page.page - 1) * page.itemsPerPage;
  let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
  return data.slice(start, end);
}

public changeSort(data: any, config: any): any {
  if (!config.sorting) {
    return data;
  }

  let columns = this.config.sorting.columns || [];
  let columnName: string = void 0;
  let sort: string = void 0;

  for (let i = 0; i < columns.length; i++) {
    if (columns[i].sort !== '' && columns[i].sort !== false) {
      columnName = columns[i].name;
      sort = columns[i].sort;
    }
  }

  if (!columnName) {
    return data;
  }

  // simple sorting
  return data.sort((previous: any, current: any) => {
    if (previous[columnName] > current[columnName]) {
      return sort === 'desc' ? -1 : 1;
    } else if (previous[columnName] < current[columnName]) {
      return sort === 'asc' ? -1 : 1;
    }
    return 0;
  });
}

public changeFilter(data: any, config: any): any {
  let filteredData: Array<any> = data;
  this.columns.forEach((column: any) => {
    if (column.filtering) {
      this.showFilterRow = true;
      filteredData = filteredData.filter((item: any) => {
        if (item[column.name] != null )
        {
          if(!Array.isArray(item[column.name]))
          {
            return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());

          }
          else
          {
              let aux = item[column.name];
              let mocos = false;
              if(item[column.name].length > 0)
              {
                item[column.name].forEach(element => {
                  if(element.toString().toLowerCase().match(column.filtering.filterString.toLowerCase()))
                  {
                    mocos = true;
                    return;
                  }
                });

                if(mocos)
                {
                  return item[column.name];
                }
              }
            else
            {
                return item[column.name];
            }
          }
        }
        else
        {
          return 'sin asignar'
        }
      });
    }

  });

  if (!config.filtering) {
    return filteredData;
  }

  if (config.filtering.columnName) {
    return filteredData.filter((item: any) =>
      item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
  }

  let tempArray: Array<any> = [];
  filteredData.forEach((item: any) => {
    let flag = false;
    this.columns.forEach((column: any) => {
      if (item[column.name] == null) {
        flag = true;
      } else {
        if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
          flag = true;
        }
      }
    });
    if (flag) {
      tempArray.push(item);
    }
  });
  filteredData = tempArray;

  return filteredData;
}

public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
  if (config.filtering) {
    (<any>Object).assign(this.config.filtering, config.filtering);
  }

  if (config.sorting) {
    (<any>Object).assign(this.config.sorting, config.sorting);
  }

  this.registros = this.requisiciones.length;
  this.rows = this.requisiciones;
  let filteredData = this.changeFilter(this.requisiciones, this.config);
  let sortedData = this.changeSort(filteredData, this.config);
  this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  this.length = sortedData.length;

  this.spinner.hide();
}


public refreshTable() {
  this.LlamarOfi();
}

public clearfilters() {
  this.columns.forEach(element => {
    element.filtering.filterString = '';
    (<HTMLInputElement>document.getElementById(element.name)).value = '';
  });
  this.onChangeTable(this.config);

}

  
}

