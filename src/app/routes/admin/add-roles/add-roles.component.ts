import { element } from 'protractor';

import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';
@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss'],
  providers: [AdminServiceService]
})

export class AddRolesComponent implements OnInit {

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
            if(data == 201)
            {
              this.alert = 'Los datos se agregaron con éxito'
              this.success = true;
              this.haserror = false;
              this.verMsg = true;
              this.grid.privilegios = [];
              
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
        this.service.UpdatePrivilegios(privilegios)
          .subscribe(data => {
            if(data == 201)
            {
              this.alert = 'Los datos se actualizaron con éxito'
              this.success = true;
              this.haserror = false;
              this.verMsg = true;
              this.grid.privilegios = [];
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
        this.nodes[idx]['collapsed'] = false;
        this.nodes[idx]['rolId'] = rol;
      //  this.CrearArbol(element)
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
           console.log(this.nodes)
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
    this.verMsg = false;
    
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
              {
                element.collapsed = false;
              }
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




/////////////distinct 
// this.listRoles = this.StructList.reduce((p, c) => 
// p.findIndex(e => e.rolId === c.rolId)<0 ? [...p,c]: p,[]);

//   formRoles: FormGroup;
//   nodes: Array<any> = [];
//   privilegios = [];
//   nodeAux = [];
//   listAux = [];
//   alert: string = '';
//   rol = -1;

//   customTemplateStringOptions = {
//     displayField: 'nombre',
//     isExpandedField: 'expanded',
//     idField: 'uuid',
//     getChildren: this.getChildren.bind(this),
//     allowDrag: false,
//     nodeHeight: 50
//   };

//   constructor(private service: AdminServiceService
//     , public fb: FormBuilder) {
//     this.iniciarForm();
    
//   }

//   getChildren(node: any) {
//     return new Promise((resolve, reject) => {
//       // setTimeout(() => resolve(this.nodes.map((c) => {
//       //     return Object.assign({}, c, {
//       //         checked: false
//       //     });
//       // })), 1000);
//     });
//   }

//   childrenCount(node: TreeNode) {
//     return node && node.children ? `${node.children.length}` : '';
//   }

//   filterNodes(text, tree) {
//     tree.treeModel.filterNodes(text, true);
//   }

//   iniciarForm() {
//     this.formRoles = this.fb.group({
//       Rol: ['', [Validators.required]]
//     });

//   }

//   descendantsChecked($event, node, title) {
//     node[title.toLowerCase()] = $event.checked;

//     if (this.privilegios.length > 0) {
//       let idx = this.privilegios.findIndex(x => {
//         return x.estructuraId == node.estructuraId
//       })
//       if (idx === -1) {
//         this.privilegios.push(node);
//       }
//       else {
//         this.privilegios[idx][title] = $event.checked;
//       }
//     }
//     else {
//       this.privilegios.push(node);
//     }

//     node.children = this.nodes.filter(function (c) {
//       return c.idPadre === node.estructuraId
//     });

//     if (node.children.length > 0) {
//       node.children.forEach(element => {
//         this.descendantsChecked($event, element, title)
//       });
//     }
//   }

// //de arbol la convierto en lista solo pra visualizar como grid
//   CrearEstructura(node) {
//     this.listAux.push(node);

//     if (node.children.length > 0) {
//       node.children.forEach(element => {
//         this.CrearEstructura(element)
//       });
//     }

//   }

//   saveData() {
//     if (this.privilegios.length > 0) {
//       let nom = this.formRoles.value.Rol;

//       let obj = this.privilegios.map(function (item) {
//         item.Nombre = nom;
//         return item;
//       });

//       this.service.AddRoles(obj)
//         .subscribe(data => {
//           this.alert = data;
//           this.ngOnInit();
//         });
//     }
//     else {
//       alert('No se ha seleccionado Estructuras')
//     }
//   }

  // updateRol($event,rowIndex)
  // {
  //   let rol = this.nodes[rowIndex]
  //   this.service.UpdateRoles(rol)
  //     .subscribe( data => {
  //     this.msj = data;
  //     this.iniciarForm();
  //     this.GetTreeRoles();
  //   });

  // }
  // DeleteRoles( $even, rowIndex: any )
  // {
  //   let g = this.nodes[rowIndex]
  //   this.service.DeleteRoles(g)
  //     .subscribe( data => {
  //     this.msj = data;
  //     this.iniciarForm();
  //     // this.getRoles();
  //       this.nodes.splice(rowIndex, 1);
  //   this.nodes = [...this.nodes];
  //   });
  //  alert("los datos se borraron")
  //  }

  // GetTreeRoles() {
  //   var aux = [];
  //   this.service.GetTreeRoles()
  //     .subscribe(
  //       e => {
  //          this.nodes = e;
  //       })
  // }

  // GetTreeRoles() {
  //   var aux = [];
  //   this.service.GetTreeRoles()
  //     .subscribe(
  //       e => {
  //         aux = e;
  //         this.nodeAux = e;
  //         aux.forEach(element => {
  //           this.CrearEstructura(element)
  //         });

  //         this.nodes = this.listAux;
  //         this.listAux = [];

  //       })
  // }
  // GetEstructura() {
  //   //id == estructuraId
  //   this.service.GetEstructuraRoles()
  //     .subscribe(
  //       e => {
  //         this.nodes = e;

  //       })
  // }

  // ngOnInit() {
  //   this.GetTreeRoles();
  //   this.iniciarForm();
  // }

}



  // CrearEstructura(node)
  // {
  //   if(this.privilegios.length > 0)
  //   {
  //     this.privilegios.push({
  //       estructuraId: node.estructuraId,
  //       Create: node.create,
  //       Read: node.read,
  //       Update: node.update,
  //       Delete: node.delete,
  //       Especial: node.especial});
  //   }
  //   else if(node.checked)
  //   {
  //     this.privilegios = [{
  //       estructuraId: node.estructuraId,
  //       Create: node.create,
  //       Read: node.read,
  //       Update: node.update,
  //       Delete: node.delete,
  //       Especial: node.especial}];
  //    }
  //    if(node.children.length > 0)
  //    {
  //      node.children.forEach(element => {
  //        this.CrearEstructura(element)
  //      });
  //    }
  // }
