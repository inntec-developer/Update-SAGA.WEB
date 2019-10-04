import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';


@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss'],
  providers: [AdminServiceService]
})

export class AddadminComponent implements OnInit {

  formAdmin: FormGroup;
  ListEntidades: Array<any> = [];
  ListAuxEntidades: Array<any> = [];

  ListaPG: Array<any> = [];
  listGrupos: Array<any> = [];
  ListaBorrar: Array<any> = [];
  filteredData: Array<any> = [];
  IdGrupo: any = null;
  draggable = false;
  flag = false;
  msj = 'Arrastrar usuario aqui';
  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'hover';
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

  constructor(private service: AdminServiceService, public fb: FormBuilder, private toasterService: ToasterService) {}

  ngOnInit() {
    this.formAdmin = this.fb.group({
      slcGrupo: ['0', [Validators.required]],
      filterInput: ''
    });

    this.GetEntidades();
    this.GetGrupos();
    this.formAdmin.controls['filterInput'].reset();
  }

  public Search(data: any) {
    const tempArray: Array<any> = [];
    const colFiltar: Array<any> = [{title: 'clave'}, { title: 'nombre' }, { title: 'apellidoPaterno' }, {title: 'emails'}];

    this.filteredData.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title] != null) {
          if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
            flag = true;
          }
        }
      });

      if (flag) {
        tempArray.push(item);
      }
    });

    this.ListEntidades = tempArray;
  }

  resetBasket() {
    this.ListaPG = [];
    this.GetEntidades();

  }

  addToGroups($event, idG) {

    //el drag me agrega solo el item por eso lo borro por que se repite
    var rep = this.ListaPG.filter(x => x.entidadId === $event.entidadId);

    if(rep.length > 1)
    {
      var idx = this.ListaPG.findIndex(x => x.entidadId == $event.entidadId);

      this.ListaPG.splice(idx, 1)
      this.ListEntidades.push($event);
    }
    else if(rep.length == 1 && rep[0]['entidadId'] == idG)
    {
        var idx = this.ListaPG.findIndex(x => x.entidadId == idG);

        if( idx != -1)
        {
          this.ListaPG.splice(idx, 1)
          this.ListEntidades.push($event);
        }
    }


  }

  PopUsers(id)
  {
    var idx = this.ListaPG.findIndex(x => x.entidadId == id); //entidad que se quitará del panel
    if (idx != -1) {
      this.ListaPG.splice(idx, 1) //quito la entidad

      var ind = this.ListAuxEntidades.findIndex(x => x.entidadId == id); //entidad que se agregara al panel principal
      if(ind != -1 )
      {
        if(this.ListEntidades.length > 0 )
        {
          var aux = this.ListEntidades.findIndex(x => x.entidadId === id)
          if(aux === -1)
          {
            this.ListEntidades.push(this.ListAuxEntidades[ind]);  //para que no repita usuario
          }
        }
        else
        {
          this.ListEntidades.push(this.ListAuxEntidades[ind]);
        }
      }
    }

  }

  PushUsers(user)
  {
    user.forEach(element => {
      var idx = this.ListEntidades.findIndex(x => x.entidadId === element.entidadId);
      if(idx > -1)
      {
        var aux = this.ListEntidades[idx]; //es por si esta pero no se puede ver por el filtro
        this.ListEntidades.splice(idx, 1);
        this.ListEntidades.push(element)
      }
      else
      {
        var id = this.ListAuxEntidades.findIndex(x => x.entidadId === element.entidadId);
        this.ListEntidades.push(this.ListAuxEntidades[id]);
      }

    });

  }
  DeleteUsers(grupo, user, index) {

    let dts = { GrupoId: grupo, EntidadId: user };

    this.service.DeleteUserGroup(dts)
      .subscribe(
        e => {
          if(e === 201)
          {
              var idx = this.ListEntidades.findIndex(x => x.entidadId === user);

              var grupos = this.ListEntidades[idx]['grupos'];

              var id = grupos.findIndex(x => x.id == grupo);
              if(id != -1)
              {
                grupos.splice(id, 1);
                this.ListEntidades[idx]['grupos'] = grupos;
              }

              this.GetUserByGroup(grupo);
              grupos = [];
          }
          // var idx = this.ListEntidades.findIndex(x => x.entidadId === user);
          // if(idx != -1)
          // {
          //   this.ListEntidades[idx]['grupos'] = grupos;
          // }

        })
  }

  GetUserByGroup(Id) {

    if(Id !== '0' && Id !== 0 && Id === this.IdGrupo)
    {
      this.service.GetUsuarioByGrupo(Id)
        .subscribe(
          e => {
            this.ListaPG = e;
            this.ListaPG.forEach(item => {
              item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
            })

          // var idx = this.ListEntidades.findIndex(x => x.entidadId == Id);
          // if( idx != -1)
          // {
          //   this.ListEntidades.splice(idx, 1);
          // }
          //para llenar el panel donde se hace drop solo se utiliza npara cunado le den select to grupo
          //por si arrastras un usuario y despues selecionas un grupo donde esta incluido el usuario i.e. para que no se repita el usuario
          //ya no es necesario por que no puedes hacer el drag a menos que selecciones un grupo

          // this.ListaPG.forEach(element => {
          //   var idx = this.ListEntidades.findIndex(x => x.entidadId === element.entidadId);

          //   if (idx != -1) {
          //     this.ListEntidades.splice(idx, 1)
          //   }
          // });
        })
      }
      else
      {
        this.ListaPG = [];
      }

  }

  addUsuarioGrupo(idgrupo) {

    if(idgrupo !== '0' && idgrupo != null && idgrupo != 0)
    {
    let lug = [];

    var uniq = this.ListaPG.filter((elem, pos, arr) => {
      return elem.grupos.findIndex(x => x.id == idgrupo) < 0

    }); //me regresa los que no estan repetidos

    if (uniq.length > 0) {
      for (let ug of uniq) {
        lug.push({ EntidadId: ug.entidadId, GrupoId: idgrupo });
      }

      this.service.addUserGroup(lug)
        .subscribe(data => {
          if(data == 201)
          {
            var grupo = this.listGrupos.find(x => x.id == idgrupo);

            this.PushUsers(uniq);

            uniq.forEach(element => {
              var idx = this.ListAuxEntidades.findIndex(x => x.entidadId == element.entidadId);
              if(idx > -1)
              {
                this.ListAuxEntidades[idx]['grupos'].push({id:grupo.id, grupo: grupo.nombre});
              }
            });
            this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
            this.ListaPG = [];
            this.IdGrupo = '0';
            this.formAdmin = this.fb.group({
              slcGrupo: ['0', [Validators.required]],
              filterInput: ''
            });

            this.GetEntidades();
          }
          else
          {
            this.popToast('error', 'Actualizar Datos', 'Ocurrio un error al intentar actualizar datos');
          }

        });

    }
    else {
      this.popToast('error', 'Actualizar Datos', 'Debe al menos agregar un usuario nuevo');
    }
  }
  else
  {
    this.formAdmin.markAsDirty;
  }
  }

  GetEntidades() {
    this.service.GetEntidades()
      .subscribe(
        e => {
          this.ListEntidades = e;
          this.ListAuxEntidades = e;

          // this.ListEntidades.forEach(item => {
          //   item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
          // })
          this.ListAuxEntidades = this.ListEntidades;

          this.filteredData = this.ListEntidades;
        });
  }

  GetGrupos() {
    this.listGrupos = [];
    this.service.getGrupos().subscribe(e => {
      this.listGrupos = e;
      const aux = this.listGrupos.filter(x => {
        return x.activo;
      });
      this.listGrupos = aux;
    });
  }

  errorImg(entidadId, pg) {
    const index = this.ListEntidades.findIndex(u => u.entidadId === entidadId);
    // this.ListEntidades[index]['foto'] = '/assets/img/user/default.jpg';
    pg.foto = '/assets/img/user/default.jpg';
  }


 popToast(type, title, body) {
   const toast: Toast = {
     type: type,
     title: title,
     timeout: 4000,
     body: body
   }
   this.toasterService.pop(toast);

 }

}
