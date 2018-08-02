import { RollsStructComponent } from './../rolls-struct/rolls-struct.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiConection } from './../../../service/api-conection.service';

@Component({
  selector: 'app-rol-grupo',
  templateUrl: './rol-grupo.component.html',
  styleUrls: ['./rol-grupo.component.scss'],
  providers:[ AdminServiceService ]
})
export class RolGrupoComponent implements OnInit, AfterViewInit {

  @ViewChild('Struct') someInput: RollsStructComponent;

  formRol: FormGroup;
  Grupos: Array<any> = [];
  Roles: Array<any> = [];
  ListaRG: any = [];
  StructList: Array<any> = [];
  filteredData: Array<any> = [];
  filteredGroups: Array<any> = [];
  permisoRol: Array<any> = [];
  msj: string = "";
  alert = "";
  flag = false;
  verMsj = false;
  constructor(private service: AdminServiceService, public fb: FormBuilder) 
  {
    this.formRol = this.fb.group({
      slcRol: ['', [Validators.required]]
    })

  }

  setData()
  {
    this.StructList = this.someInput.StructList;
    this.someInput.setStruct(this.filteredData)
  }
  
  onSelect(item: any) 
  {
    item.selected ? item.selected = false : item.selected = true; //para poner el backgroun cuando seleccione
   
    item.selected ? this.ListaRG.push(item) : this.ListaRG.splice(this.ListaRG.findIndex(x => x.entidadId == item.entidadId), 1); //agrega y quita el row seleccionado
  }

  addToRol($event)
  {
    console.log($event)
  }

  resetBasket() 
  {
    this.ListaRG = [];
    this.getGrupos();
  }

  popGrupo(p:any, i: any) 
  {
    this.Grupos.splice(i, 1)
  }

  saveData(RolId: any)
  {
    if(this.ListaRG.length > 0)
    {
      let lrg = [];

      for(let rg of this.ListaRG)
      {
        let element = {
          EntidadId: rg.entidadId,
          RolId: RolId,         
        }
        lrg.push(element);
      }

      this.service.AddGroupRol(lrg)
      .subscribe( data => {
        this.msj = data;
        this.verMsj = true;
        this.ngOnInit();
      });
      
      this.ListaRG = [];
    }
    else
    {
      this.alert = "Debe agregar al menos un grupo";
    }
  }

  selected($event, rol: any)
  {
    this.verMsj = false;

    this.flag = true;
    var id = $event.target.value;
    this.permisoRol = this.Roles.filter(item => item.id == id);
    this.filteredData = this.StructList.filter(item => item.rolId == id)
    
     this.someInput.setStruct(this.filteredData)
    
  }

  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [ { title: "apellidoPaterno" }, { title: "nombre" }];

    this.filteredGroups.forEach(function (item) {
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

    this.Grupos = tempArray;
  }


  getGrupos()
  {
    this.Grupos = [];
    this.service.getGruposRoles()
    .subscribe(
      e=>{
        this.Grupos = e;

        this.Grupos.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
        })
      })
  }

  getRoles()
  {
    this.service.getRoles()
    .subscribe(
      e=>{
        this.Roles = e;
      })
  }

  GetEntidades()
    {
      this.Grupos = [];
      this.service.GetEntidadesUG()
      .subscribe(
        e=>{
          this.Grupos = e;
          
          this.Grupos.forEach(item => {
            item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
          })

          this.filteredGroups = this.Grupos;

        })
    }
  
    DeleteUserRoles(user, rol)
    {
        var idx = this.Grupos.findIndex(x => x.id == user);
        
  
        if(idx != -1)
        {
          var mocos = this.Grupos[idx]['roles'];
          var id = mocos.findIndex(x => x.id == rol);
          if(id != -1)
          {
            mocos.splice(id, 1);
            this.Grupos[idx]['roles'] = mocos;
          }
          
        }
  
        let dts = { RolId: rol, EntidadId: user};
        
        this.service.DeleteUserRol(dts)
        .subscribe(
          e=>{
            this.GetEntidades();
            console.log(e)
          })
  
    }

  ngOnInit() {
    this.GetEntidades();
    this.getRoles();
    this.setData();
    this.someInput.setStruct(this.filteredData)
    
  }

  ngAfterViewInit()
  {
    if(this.someInput)
    {
      this.setData();
    }
  }

}
