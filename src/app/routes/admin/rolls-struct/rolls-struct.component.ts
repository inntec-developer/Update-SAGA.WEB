
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
  @ViewChild('grid') grid;
 
  filteredData: Array<any> = [];
  editing = {};
  listRoles: Array<any> = [];
  listEntidades: Array<any> = [];
  listAux: Array<any> = [];
  nodes: Array<any> = [];
  nodesAux = [];
  nuevoRol = false;
  nomRol = '';
  alert = '';
  success = false;
  haserror = false;
  verMsg = false;
  collapsed = false;
  constructor(private service: AdminServiceService) { }
  
  GuardarCambios()
  {
    var privilegios = this.grid.privilegios;
    if (this.grid.privilegios.length > 0) {
      if(this.nomRol != '' && this.nuevoRol == true)
      {
        var nom = this.nomRol;
        let obj = this.grid.privilegios.map(function (item) {
          item.Nombre = nom;
          return item;
        });
  
        this.service.AddRoles(obj)
          .subscribe(data => {
            this.ngOnInit();
            if(data == 201)
            {
              this.alert = 'Los datos se agregaron con éxito'
              this.success = true;
              this.haserror = false;
              this.verMsg = true;
            }
            else
            {
              this.alert = 'Ocurrio un error al intentar agregar'
              this.haserror = true;
              this.success = false;
              this.verMsg = true;
            }
          });
      }
      else
      {
        console.log(privilegios)
        this.service.UpdatePrivilegios(privilegios)
          .subscribe(data => {
            console.log(data)

            if(data == 201)
            {
              this.alert = 'Los datos se actualizaron con éxito'
              this.success = true;
              this.haserror = false;
              this.verMsg = true;
            }
            else
            {
              this.alert = 'Ocurrio un error al intentar actualizar'
              this.haserror = true;
              this.success = false;
              this.verMsg = true;
            }
          });

      }
    }
    else {
      this.alert = 'No se ha seleccionado Estructuras'
      this.haserror = true;
      this.success = false;
      this.verMsg = true;
    }
  
    
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

 
  // setData() {
  //   this.onItemChanged.emit(this.StructList);
  // }

  // setStruct(data: any) {
  //   this.filteredData = data;

  // }

  CrearEstructura(node, rolId) {
    node.rolId = rolId;
    this.nodesAux.push(node);

    if (node.children.length > 0) {
      node.children.forEach(element => {
        this.CrearEstructura(element, rolId)
      });
    }

  }

  CrearArbol(node) {
   node.children = this.StructList.filter( x => x.idPadre === node.estructuraId)

    if (node.children.length > 0) {
      node.children.forEach(element => {
        this.CrearArbol(element)
      });
    }

  }
  filtrarTree(rol)
  {
    this.grid.ngOnInit();

     var aux = this.StructList.filter( element =>{
      return element.rolId == rol && element.tipoEstructuraId === 2
    })

    aux.forEach(element => {
        this.CrearArbol(element)
    })

    this.grid.nodes = aux;
    this.nodes = aux;

  }
  
  GetTreeRoles() {
 
    this.service.GetTreeRoles()
      .subscribe(
        e => {
          this.grid.ngOnInit();
           this.nodes = e;
           this.StructList = e;
        })
  }

  GetTreeByRol(rol) {
    this.verMsg = false;
    
    this.service.GetEstructuraRoles(rol)
        .subscribe(
          e => {
            this.StructList = e;
            this.filteredData = e;
            this.collapsed = false;
            console.log(this.StructList)
            this.filtrarTree(rol)
          });

        

    // var aux = [];
    // this.service.GetTreeRoles()
    //   .subscribe(
    //     e => {
    //       aux = e;
        
    //      this.filtrarTree(aux, modulo)
    //     })
  }

  // GetEstructura() {
  //   this.service.GetEstructuraRoles()
  //     .subscribe(
  //       e => {
  //         this.StructList = e;
  //         this.filteredData = e;
  //         this.setData();
  //         console.log(this.StructList)
  //       })
  // }

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
        if(data == 201)
            {
              this.alert = 'Se borró el Rol con éxito'
              this.success = true;
              this.haserror = false;
              this.verMsg = true;
            }
            else
            {
              this.alert = 'Ocurrio un error al intentar borrar rol'
              this.haserror = true;
              this.success = false;
              this.verMsg = true;
            }
        this.ngOnInit();
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
  GetEntidades(id)
  {
    this.service.GetEntidadesUG(id)
    .subscribe(
      e=>{
        this.listEntidades = e;

        this.listEntidades.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
        })

      })
  }

  ngOnInit() {
    this.GetTreeRoles();
    this.GetRoles();
    this.nomRol = '';
    this.nuevoRol = false;
  }

}


/////////////distinct 
// this.listRoles = this.StructList.reduce((p, c) => 
// p.findIndex(e => e.rolId === c.rolId)<0 ? [...p,c]: p,[]);