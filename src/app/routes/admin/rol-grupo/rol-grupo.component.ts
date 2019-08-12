import { RollsStructComponent } from '../rolls-struct/rolls-struct.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiConection } from '../../../service/api-conection.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-rol-grupo',
  templateUrl: './rol-grupo.component.html',
  styleUrls: ['./rol-grupo.component.scss'],
  providers:[ AdminServiceService ]
})
export class RolGrupoComponent implements OnInit {

  @ViewChild('Struct') someInput: RollsStructComponent;

  formRol: FormGroup;
  Grupos: Array<any> = [];
  Roles: Array<any> = [];
  ListaRG: any = [];
  ListaAux = [];
  filteredData: Array<any> = [];
  filteredGroups: Array<any> = [];
  permisoRol: Array<any> = [];
  msj: string = "";
  flag = false;
  rolId = 0;
 
  constructor(private service: AdminServiceService, public fb: FormBuilder, private toasterService: ToasterService) 
  {
    this.formRol = this.fb.group({
      slcRol: ["-1", [Validators.required]]
    })

  }

  onSelect(item: any) 
  {
    if(this.formRol.controls['slcRol'].value !== '-1' && this.formRol.controls['slcRol'].value !== null)
    {
      var entidad = this.ListaRG.findIndex(x => x.entidadId == item.entidadId);

      if(entidad == -1) //para que no repita usuarios
      {
          item.selected ? item.selected = false : item.selected = true; //para poner el backgroun cuando seleccione
   
          item.selected ? this.ListaRG.push(item) : this.ListaRG.splice(this.ListaRG.findIndex(x => x.entidadId == item.entidadId), 1); //agrega y quita el row seleccionado
          item.selected ? this.ListaAux.push(item) : this.ListaAux.splice(this.ListaAux.findIndex(x => x.entidadId == item.entidadId), 1);
      }
      else if( this.ListaRG[entidad]['rolId'] != this.rolId )
      {
        item.selected ? item.selected = false : item.selected = true; //para poner el backgroun cuando seleccione
   
        item.selected ? this.ListaRG.push(item) : this.ListaRG.splice(this.ListaRG.findIndex(x => x.entidadId == item.entidadId), 1); //agrega y quita el row seleccionado
        item.selected ? this.ListaAux.push(item) : this.ListaAux.splice(this.ListaAux.findIndex(x => x.entidadId == item.entidadId), 1);
      }
    }
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
    if(RolId !== "-1")
    {
    if(this.ListaAux.length > 0)
    {
      let lrg = [];

      for(let rg of this.ListaAux)
      {
        let element = {
          EntidadId: rg.entidadId,
          RolId: RolId,         
        }
        lrg.push(element);
      }

      this.service.AddGroupRol(lrg)
      .subscribe( data => {
        this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
        this.ListaRG = [];
        this.ListaAux = [];
        this.ngOnInit();
      });
      
      
    }
    else
    {
      this.popToast('error', 'Actualizar Datos', 'Debe al menos agregar un usuario nuevo');
    }
  }
  else
  {
    this.formRol.markAsDirty;
  }
  }

  selected($event)
  {
    this.service.GetEntidadesUG($event.target.value)
        .subscribe( data => {
          this.ListaRG = [];
          this.ListaRG = data;

          this.ListaRG.forEach(item => {
            item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
            item.rolId = $event.target.value;
          })
        })
    // this.verMsj = false;
    // this.ListaRG = [];
    // this.flag = true;
    // var id = $event.target.value;
    // this.permisoRol = this.Roles.filter(item => item.id == id);
    // this.filteredData = this.StructList.filter(item => item.rolId == id)
    
    //  this.someInput.setStruct(this.filteredData)
    
  }

  public Search(data: any) {

    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [ { title: "apellidoPaterno" }, { title: "nombre" }, {title: "emails"}];

    this.filteredGroups.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if(item[c.title] != null)
        {
          if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
            flag = true;
          }
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
      this.service.GetEntidades()
      .subscribe(
        e=>{
          this.Grupos = e;
          console.log(this.Grupos)
          this.Grupos.forEach(item => {
            item.fotoAux = ApiConection.ServiceUrlFotoUser + item.clave + '.jpg';
          })

          this.filteredGroups = this.Grupos;
        })
    }
  
    DeleteUserRoles(user, rol)
    {
        var idx = this.Grupos.findIndex(x => x.entidadId == user);

        if(idx != -1)
        {
          var roles = this.Grupos[idx]['roles'];
          var id = roles.findIndex(x => x.id == rol);
          if(id != -1)
          {
            roles.splice(id, 1);
            this.Grupos[idx]['roles'] = roles;
          }
          
        
  
        let dts = { RolId: rol, EntidadId: user};
        
        this.service.DeleteUserRol(dts)
        .subscribe(
          e=>{
            this.Grupos[idx]['roles'] = roles;

            roles = [];
            this.ListaAux = [];
          })
        }
  
    }

  ngOnInit() {
    this.GetEntidades();
    this.getRoles();    
    this.formRol.controls['slcRol'].reset();
    this.formRol.controls['filterInput'].reset();
  }

    /**
  * configuracion para mensajes de acciones.
  */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7,
   tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
   preventDuplicates: true,
 });

 popToast(type, title, body) {
   var toast: Toast = {
     type: type,
     title: title,
     timeout: 4000,
     body: body
   }
   this.toasterService.pop(toast);

 }
}
