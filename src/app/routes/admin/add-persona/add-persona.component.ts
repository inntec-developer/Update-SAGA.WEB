import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material';
import { UploadImgsComponent } from '../upload-imgs/upload-imgs.component';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.scss'],
  providers:[ AdminServiceService ]

})
export class AddPersonaComponent implements OnInit {

  Users: Array<any> = [];
  ListDepas: Array<any> = [];
  ListTipos: Array<any> = [];
  Lideres = [];
  editing = {};
  bandera = false;
  rowAux: any;
  name: string;
  filteredData: Array<any> = [];
  dataRowIndex: any = 0;
  dataRow: any;

  @ViewChild('uploadImg') someInput: UploadImgsComponent;
  @ViewChild('staticModal') modal;

  
  constructor(private service: AdminServiceService ,public fb: FormBuilder, public dialog: MatDialog, private toasterService: ToasterService){}
  
  CrearURL(idP: any)
  {
    this.name = idP;
  }


  updateFoto()
  {
    //this.name = this.name + '.' + this.someInput.selectedFile.type.split('/')[1];

    if(this.someInput.StatusCode == 201 || this.someInput.StatusCode == 500)
    {
      this.closeModal();
 
      this.Users[this.rowAux]['foto'] = 'utilerias/img/user/' + this.someInput.name;
      this.Users[this.rowAux]['fotoAux'] = this.someInput.image.src;
      this.Users = [...this.Users];
    
    }
    
  }

  SendEmail(user)
  {
    let u = {
      EntidadId: user.entidadId,
      Clave: user.clave,
      Usuario: user.usuario,
      Nombre: user.nombre,
      ApellidoPaterno: user.apellidoPaterno,
      ApellidoMaterno: user.apellidoMaterno,
      DepartamentoId: user.departamentoId, 
      TipoUsuarioId: user.tipoUsuarioId,
      Foto: user.foto,
      email: user.email
    }

    this.service.SendEmailRegister(u).subscribe( res => {
      if(res == 201)
        {
          this.popToast('success', 'Envío de correo', 'El correo se envió con éxito');

          // this.alerts[0]['msg'] = 'El correo se envió con éxito';
          // this.alert = this.alerts[0];
          // this.verMsj = true;
          // this.success = true;
          // this.haserror = false;
        }
        else
        {
          this.popToast('error', 'Envío de correo', 'Ocurrio un error al intentar enviar correo');
          // this.alerts[1]['msg'] = 'Ocurrio un error al intentar enviar correo';
          // this.alert = this.alerts[1];
          // this.verMsj = true;
          // this.success = false;
          // this.haserror = true;
        }
    });

  }

  onSelect(row, rowIndex)
  {
    // if(this.dataRowIndex != rowIndex)
    // {
    //   if(this.dataRow)
    //   {
    //     this.dataRow.selected = false;
    //   }
      
    //   this.dataRowIndex = rowIndex;
    //   this.dataRow = row;
    //   row.selected = true;
    // }
    // else
    // {
    //   this.dataRow = row;
    //   this.dataRowIndex = rowIndex;
    //   row.selected = true; //para poner el backgroun cuando seleccione
    // }
  }
  closeModal()
  {
    this.someInput.removeItem();
    this.someInput.selectedFile = null;

    this.modal.hide();
  }

  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "nombre" },{ title: "apellidoPaterno" }, { title: "clave" }, { title: "email"}];

    this.filteredData.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if(c.title == 'email')
        {
          var mail = item['email'];
          if(mail.length > 0)
          {
            if(mail[0]['email'].toString().toLowerCase().match(data.target.value.toLowerCase())) {
              flag = true;
            }
          }
        }
        else if(item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item)
      }
    });

    this.Users = tempArray;
    // this.filteredData = this.StructList.filter(function(item){
    //             return item['nombre'].match(data.target.value);
    //         });

  }
  
  updateValue(event, cell, rowIndex) 
  {
    var aux;

    if (cell === "tipoUsuarioId") 
    {
      aux = this.ListTipos.find(nt => nt.id == event.target.value);
      this.Users[rowIndex]['tipoUsuario'] = aux.tipo;
      this.Users[rowIndex]['tipoUsuarioId'] = event.target.value;
      this.editing[rowIndex + '-' + 'tipoUsuario'] = false;
    }
    else if (cell === "departamentoId") 
    {
      aux = this.ListDepas.find(nd => nd.id == event.target.value);
      this.Users[rowIndex]['departamento'] = aux.nombre;
      this.Users[rowIndex]['departamentoId'] = event.target.value;
      this.editing[rowIndex + '-' + 'departamento'] = false;
    }
    else if (cell === "lider") 
    {
      aux = this.Lideres.find(nd => nd.liderId == event.target.value);
      this.Users[rowIndex]['nombreLider'] = aux.nombreLider;
      this.Users[rowIndex]['liderId'] = event.target.value;
      this.editing[rowIndex + '-' + 'lider'] = false;
    }
    else if(event.target.value !== '')
    {
      this.Users[rowIndex][cell] = event.target.value;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.Users = [...this.Users];
  }

  updateUser(user, rowIndex) 
  {
    let u = {
      EntidadId: user.entidadId,
      Clave: user.clave,
      Usuario: user.usuario,
      Nombre: user.nombre,
      ApellidoPaterno: user.apellidoPaterno,
      ApellidoMaterno: user.apellidoMaterno,
      DepartamentoId: user.departamentoId, 
      TipoUsuarioId: user.tipoUsuarioId,
      Foto: user.foto,
      liderId: user.liderId

    }
    sessionStorage.setItem('usuario', user.usuario);
    this.service.UpdateUsuario(u)
      .subscribe(data => {
        if(data == 201)
        {
          this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
          // this.alerts[0]['msg'] = 'Los datos se actualizaron con éxito';
          // this.alert = this.alerts[0];
          // this.verMsj = true;
          // this.success = true;
          // this.haserror = false;
        }
        else
        {
          this.popToast('error', 'Actualizar Datos', 'Ocurrio un error al intentar actualizar datos');
          // this.alerts[1]['msg'] = 'Ocurrio un error al intentar actualizar datos';
          // this.alert = this.alerts[1];
          // this.verMsj = true;
          // this.success = false;
          // this.haserror = true;
        }
        
      });
  }

  Actualizar($ev, id: any)
  {
    this.service.UDActivoUsers(id, $ev.target.checked )
        .subscribe( data => {
          if(data == 201)
          {
            this.popToast('success', 'Actualizar Datos', 'Los datos se actualizaron con éxito');
            // this.alerts[0]['msg'] = 'Los datos se actualizaron con éxito';
            // this.alert = this.alerts[0];
            // this.verMsj = true;
            // this.success = true;
            // this.haserror = false;
          }
          else
          {
            this.popToast('error', 'Actualizar Datos', 'Ocurrió un error al intentar actualizar datos');
            // this.alerts[1]['msg'] = 'Ocurrio un error al intentar actualizar datos';
            // this.alert = this.alerts[1];
            // this.verMsj = true;
            // this.success = false;
            // this.haserror = true;
          }
          
        });
  }

  getUsuarios()
  {
    this.service.getPersonas()
    .subscribe(
      e=>{
        this.Users = e;

        this.Users.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFoto + item.foto
          item.selected = false;
        })
        this.filteredData = this.Users;
      })
  }
  
  getDepartamentos()
  {
    this.service.getDepas()
      .subscribe(
        e => {
          this.ListDepas = e;
        })
  }

  getTipos() 
  {
    this.service.getTipos()
      .subscribe(
        e => {
          this.ListTipos = e;
        })
  }

  GetLideres()
  {
    this.service.GetLideres().subscribe( data => {
      this.Lideres = data;
    })
  }
  ngOnInit() 
  {
    this.getUsuarios();
    this.getDepartamentos();
    this.getTipos();
    this.GetLideres();
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


