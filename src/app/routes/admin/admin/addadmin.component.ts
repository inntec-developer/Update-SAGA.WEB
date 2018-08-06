import { ApiConection } from './../../../service/api-conection.service';
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
    let colFiltar: Array<any> = [ { title: "apellidoPaterno" }, { title: "nombre" }];

    this.filteredData.forEach(function (item) {
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

    this.ListEntidades = tempArray;
  }

  resetBasket() {
    this.ListaPG = [];
    this.GetEntidades();
      
  }

  addToGroups($event) {
    console.log($event)

    //el drag me agrega solo el item por eso lo borro por que se repite
    var rep = this.ListaPG.filter(x => x.entidadId == $event.entidadId);

    if(rep.length > 1)
    {
      var idx = this.ListaPG.findIndex(x => x.entidadId == $event.entidadId);
      console.log(idx)
      this.ListaPG.splice(idx, 1)
      this.ListEntidades.push($event);
    }
    
    // if (idx != -1 ) {
    //   this.ListaPG.splice(idx, 1)
    // }

    // this.ListEntidades.push($event);


  }

  PopUsers(id)
  {
    var idx = this.ListaPG.findIndex(x => x.entidadId == id);

    if (idx != -1) {
      this.ListaPG.splice(idx, 1)
    }

  }

  DeleteUsers(grupo, user, index) {
    var idx = this.ListaPG.findIndex(x => x.entidadId === user);

    if (idx != -1) {
      this.ListaPG.splice(idx, 1)
    }

    let dts = { GrupoId: grupo, EntidadId: user };

    this.service.DeleteUserGroup(dts)
      .subscribe(
        e => {
          this.GetEntidades();
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
          this.ListaPG = [];
          this.ngOnInit();
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

          this.filteredData = this.ListEntidades;
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
