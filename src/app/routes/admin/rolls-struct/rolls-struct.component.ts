import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';
import { element } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';

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
  rol = -1;
  verMsj = false;
  collapsed = false;

  alerts: any[] = [
    {
      type: 'success',
      msg: '',
      timeout: 4000
    },
    {
      type: 'danger',
      msg: '',
      timeout: 4000
    }
  ];
alert = this.alerts;
onClosed(): void {
  this.verMsj = false;
}

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
            if(data == 201)
            {
              this.alerts[0]['msg'] = 'Los datos se agregaron con éxito';
              this.alert = this.alerts[0];
              this.verMsj = true;
              this.grid.privilegios = [];
              this.nomRol = "";

              this.GetRoles();
            }
            else
            {
              this.alerts[1]['msg'] = 'Ocurrio un error al intentar agregar'
              this.alert = this.alerts[1];
              this.verMsj = true;
            }
          });
      }
      else
      {
        this.service.UpdatePrivilegios(privilegios)
          .subscribe(data => {
            if(data == 201)
            {
              this.alerts[0]['msg'] = 'Los datos se actualizaron con éxito'
              this.alert = this.alerts[0];
              this.verMsj = true;
              this.grid.privilegios = [];
            }
            else
            {
              this.alerts[1]['msg'] = 'Ocurrio un error al intentar actualizar'
              this.alert = this.alerts[1];
              this.verMsj = true;
            }
          });

      }
    }
    else {
      this.alerts[1]['msg'] =  'No se ha seleccionado Estructuras';
      this.alert = this.alerts[1];
      this.verMsj = true;
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
    if(node.tipoEstructuraId > 2)
      node.collapsed = false;
    else
      node.collapsed = true;

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

  ChangeCollapsed(node) {
    node.collapsed = !node.collapsed;

     if (node.children.length > 0) {
       node.children.forEach(element => {
         this.ChangeCollapsed(element)
       });
     }

   }

  GetNodes( node )
  {
    if(node.children)
    {
      node.children.forEach(element => {
        this.ChangeCollapsed(element);
      });
    }
 
  }


  filtrarTree(rol)
  {
    this.StructList.forEach(element => {

      var idx = this.nodes.findIndex(x => x.estructuraId == element.estructuraId )
      if(idx != -1)
      {
        this.nodes[idx]['create'] = element.create;
        this.nodes[idx]['read'] = element.read;
        this.nodes[idx]['update'] = element.update;
        this.nodes[idx]['delete'] = element.delete;
        this.nodes[idx]['especial'] = element.especial;
        this.nodes[idx]['rolId'] = rol;
        this.GetNodes(this.nodes[idx]);
      }


    });

    this.grid.rol = rol;
    this.grid.nodes = this.nodes;
  }

  GetTreeRoles() {

    this.service.GetTreeRoles()
      .subscribe(
        e => {

          this.grid.ngOnInit();

           this.nodes = e;
           this.StructList = e;

           this.nodesAux = [];

           this.nodes.forEach(element => {
            this.CrearEstructura(element, 0)
           });

           this.nodes = this.nodesAux;
           this.grid.nodes = this.nodes;
        })
  }

  GetTreeByRol(rol) {
    this.verMsj = false;

    this.service.GetEstructuraRoles(rol)
        .subscribe(
          e => {
            this.grid.ngOnInit();

            //limpio las variables pero no pierdo la estructura
            this.nodes.forEach(element => {
              element.create = false;
              element.read = false;
              element.update = false;
              element.delete = false;
              element.especial = false;

            if(element.tipoEstructuraId > 2)
              element.collapsed = false;
            else
              element.collapsed = true;
            });

            this.StructList = e;
            this.filteredData = e;
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
  //       })
  // }

  selected(value)
  {
    this.listAux = [];
    let aux = [];

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
    this.service.DeleteRoles(id)
      .subscribe( data => {
        if(data == 201)
            {
              this.alerts[0]['msg'] = 'Se borró el Rol con éxito';
              this.alert = this.alerts[0];
              this.verMsj = true;
            }
            else
            {
              this.alerts[1]['msg'] = 'Ocurrio un error al intentar borrar rol';
              this.alert = this.alerts[1];
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
