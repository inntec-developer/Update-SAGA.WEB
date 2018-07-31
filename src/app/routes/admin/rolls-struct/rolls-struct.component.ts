
import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from './../../../service/api-conection.service';

@Component({
  selector: 'app-rolls-struct',
  templateUrl: './rolls-struct.component.html',
  styleUrls: ['./rolls-struct.component.scss'],
  providers:[ AdminServiceService ]
})
export class RollsStructComponent implements OnInit {

  @Input() public StructList: Array<any> = null; // Url api process upload
  @Input() public hiddenSelect = false;
  @Output('onItemChanged') public onItemChanged = new EventEmitter();

  columns = [

    { title: 'ROL' },
    { title: 'NOMBRE ESTRUCTURA' },
    { title: "CREAR" },
    { title: "LEER" },
    { title: "MODIFICAR" },
    { title: "BORRAR" },
    { title: "ESPECIAL" }
  ]
  filteredData: Array<any> = [];
  editing = {};
  listRoles: Array<any> = [];
  listEntidades: Array<any> = [];
  listAux: Array<any> = [];
  nodesAux = [];
  nodes: Array<any> = [];

  alert = '';
  constructor(private service: AdminServiceService) { }
  
  GuardarCambios(row: any)
  {
    this.service.UpdatePrivilegios(row)
      .subscribe(data => {
        console.log(data)
        this.alert = data;
      });
  }

  BorrarEstructura(row: any)
  {
    console.log(row)
  }
  public Search(data: any) {

    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "rol" }, { title: "nombre" }];

    this.StructList.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().match(data.target.value)) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
      }
    });

    this.filteredData = tempArray;
    // this.filteredData = this.StructList.filter(function(item){
    //             return item['nombre'].match(data.target.value);
    //         });

  }

  DeleteUserRoles(user, rol)
  {
      var idx = this.listAux.findIndex(x => x.id == user);

      if(idx != -1)
      {
        this.listAux.splice(idx, 1)
      }

      let dts = { RolId: rol, EntidadId: user};
      console.log(dts)
      this.service.DeleteUserRol(dts)
      .subscribe(
        e=>{
          this.alert = e;
        })

  }

  setData() {
    this.onItemChanged.emit(this.StructList);
  }

  setStruct(data: any) {
    this.filteredData = data;

  }

  CrearEstructura(node, rolId) {
    node.rolId = rolId;
    this.nodesAux.push(node);

    if (node.children.length > 0) {
      node.children.forEach(element => {
        this.CrearEstructura(element, rolId)
      });
    }

  }

  filtrarTree(tree, modulo)
  {
    var aux = this.StructList.filter( element =>{
      return element.rolId == modulo
    })


    this.nodes = tree.filter( item => {
      var e =  aux.findIndex( x => x.estructuraId == item.estructuraId)
      if( e < 0)
      {
        return item;
      }
    })

    this.nodes.forEach(element => {
      this.CrearEstructura(element, modulo)
    });

    
    this.nodes = this.nodesAux;
    this.nodesAux = [];
    console.log(this.nodes)
  }
  
  GetTreeRoles(modulo) {
    var aux = [];
    this.service.GetTreeRoles()
      .subscribe(
        e => {
          aux = e;
        
         this.filtrarTree(aux, modulo)
        })
  }

  GetEstructura() {
    this.service.GetEstructuraRoles()
      .subscribe(
        e => {
          this.StructList = e;
          this.filteredData = e;
          this.setData();
          console.log(this.StructList)
        })
  }

  selected(value)
  {
    this.listAux = [];
    let aux = [];
    console.log(value)
    let tempArray: Array<any> = [];

    this.filteredData = this.StructList.filter(function(item){
      return item.rolId == value

    });
    this.listEntidades.forEach(element => {
      aux = element.roles.filter(function(item)
        {
          return item.id == value;

        })
      if(aux.length > 0)
      {
        this.listAux.push(element)
      }
      
    });
  }

  DeleteRoles(id)
  {
    console.log(id)
    this.service.DeleteRoles(id)
      .subscribe( data => {
        this.ngOnInit();
        alert("los datos se borraron")
    });

 }

 GetRoles()
  {
    this.service.getRoles()
    .subscribe(
      e=>{
        this.listRoles = e;
        
      })
  }
  GetEntidades()
  {
    this.service.GetEntidadesUG()
    .subscribe(
      e=>{
        this.listEntidades = e;

        this.listEntidades.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
        })

      })
  }

  ngOnInit() {
    this.GetEstructura();
    this.GetRoles();
    this.GetEntidades();
  }

}


/////////////distinct 
// this.listRoles = this.StructList.reduce((p, c) => 
// p.findIndex(e => e.rolId === c.rolId)<0 ? [...p,c]: p,[]);