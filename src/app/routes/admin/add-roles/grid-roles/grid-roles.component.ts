
import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { AdminServiceService } from '../../../../service/AdminServicios/admin-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'grid-roles',
  templateUrl: './grid-roles.component.html',
  styleUrls: ['./grid-roles.component.scss'],
  providers: [ AdminServiceService ]

})
export class GridRolesComponent implements OnInit {

@Input() public nodes: Array<any> = null; // Url api process upload
collapsed = true;
privilegios = [];
alert = '';
listAux = [];
  constructor(private service: AdminServiceService ,public fb: FormBuilder) {
   
   }

   descendantsChecked($event, node, title) {

    node[title.toLowerCase()] = $event.checked;

    if (this.privilegios.length > 0) {
      let idx = this.privilegios.findIndex(x => {
        return x.estructuraId == node.estructuraId
      })
      if (idx === -1) {
        this.privilegios.push(node);
      }
      else {
        this.privilegios[idx][title] = $event.checked;
      }
    }
    else {
      this.privilegios.push(node);
    }

    node.children = this.nodes.filter(function (c) {
      return c.idPadre === node.estructuraId
    });

    if (node.children.length > 0) {
      node.children.forEach(element => {
        this.descendantsChecked($event, element, title)
      });
    }
  }

  //de arbol la convierto en lista solo pra visualizar como grid
  CrearEstructura(node) {
    this.listAux.push(node);

    if (node.children.length > 0) {
        node.children.forEach(element => {
          this.CrearEstructura(element)
      });
    }
  }

  GetNodes($event, node)
  {
    this.CrearEstructura(node);
    
    this.nodes = this.listAux;
    console.log(this.listAux)
    this.listAux = [];
  }

  saveData() {
    console.log(this.nodes)
    if (this.privilegios.length > 0) {
    
        console.log(this.privilegios)

      this.service.AddSeccion(this.privilegios)
        .subscribe(data => {
          this.alert = data;
        });
    }
    else {
      alert('No se ha seleccionado Estructuras')
    }
  }
  ngOnInit() {

  }
  

}
