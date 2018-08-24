import { ApiConection } from '../../../service/api-conection.service';
import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


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
  msj = 'Arrastrar usuario aqui'
  verMsj = false;

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

  constructor(private service: AdminServiceService, public fb: FormBuilder) {}

  ngOnInit() {
    this.formAdmin = this.fb.group({
      slcGrupo: ['', [Validators.required]],
      filterInput: ''
    });

    this.GetEntidades();
    this.GetGrupos();
    this.formAdmin.controls['filterInput'].reset();
  }

  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [ { title: "nombre" }, { title: "apellidoPaterno" }];

    this.filteredData.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
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
    var idx = this.ListaPG.findIndex(x => x.entidadId == id);

    if (idx != -1) {
      this.ListaPG.splice(idx, 1) 
      if( this.ListaPG.length == 0)
      {
        this.ListaPG = [];
        this.ListEntidades = this.filteredData;
      }
    }

  }

  DeleteUsers(grupo, user, index) {
    var idx = this.ListAuxEntidades.findIndex(x => x.entidadId === user);

    var grupos = this.ListAuxEntidades[idx]['grupos'];
    var id = grupos.findIndex(x => x.id == grupo);
    if(id != -1)
    {
      grupos.splice(id, 1);
      this.ListAuxEntidades[idx]['grupos'] = grupos;
      this.ListEntidades = this.ListAuxEntidades;
    }
          
    let dts = { GrupoId: grupo, EntidadId: user };

    this.service.DeleteUserGroup(dts)
      .subscribe(
        e => {
          var idx = this.ListEntidades.findIndex(x => x.entidadId === user);
          if(idx != -1)
          {
            this.ListEntidades[idx]['grupos'] = grupos;
          }
          grupos = [];
         // this.GetEntidades();
        })
  }

  GetUserByGroup(Id) {
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

  addUsuarioGrupo() {
    let lug = [];
    
    var uniq = this.ListaPG.filter((elem, pos, arr) => {
      return elem.grupos.findIndex(x => x.id == this.IdGrupo) < 0

    }); //me regresa los que no estan repetidos


    if (uniq.length > 0) {
      for (let ug of uniq) {
        lug.push({ EntidadId: ug.entidadId, GrupoId: this.IdGrupo });
      }

      this.service.addUserGroup(lug)
        .subscribe(data => {
          if(data == 201)
          {
            this.alerts[0]['msg'] = 'Los datos se actualizaron con éxito';
            this.alert = this.alerts[0];
            this.verMsj = true;
            this.ListaPG = [];
            this.ngOnInit();
          }
          else
          {
            this.alerts[1]['msg'] = 'Ocurrio un error al intentar actualizar datos';
            this.alert = this.alerts[1];
            this.verMsj = true;
          }
         
        });

    }
    else {
      alert("Debe agregar al menos un usuario");
    }

  }

  GetEntidades() {
    this.service.GetEntidades()
      .subscribe(
        e => {
          this.ListEntidades = e;
          this.ListAuxEntidades = e;

          this.ListEntidades.forEach(item => {
            item.fotoAux = ApiConection.ServiceUrlFoto + item.foto;
          })
          this.ListAuxEntidades = this.ListEntidades;

          this.filteredData = this.ListEntidades;
          console.log(this.ListEntidades)
        })
  }

  GetGrupos() {
    this.listGrupos = [];
    this.service.getGrupos()
      .subscribe(
        e => {
          this.listGrupos = e;
        })
  }

}
