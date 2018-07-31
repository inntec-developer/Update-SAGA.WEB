import { UploadImgsComponent } from './../upload-imgs/upload-imgs.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiConection } from '../../../service';


@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.scss'],
  providers:[ AdminServiceService ]
})
export class AddGrupoComponent implements OnInit {

  @ViewChild('uploadImg') someInput: UploadImgsComponent;
  @ViewChild('staticModal') modal;
  @ViewChild('ModalMsg') modalMsg;

  formGrupos: FormGroup;
  Grupos: Array<any> = [];
  editing = {};
  name: string;
  rowAux: any;
  UsuariosList: Array<any> = [];
  alert = '';

  constructor( public fb: FormBuilder, private service: AdminServiceService )
  {
    this.formGrupos = this.fb.group({
      Nombre: ['', [Validators.required]],
      Descripcion: "",
      Activo: 1
      });
  }

  CrearURL(idG: any)
  {
    this.name = idG;
  }

  updateValue($event, cell, rowIndex)
  {
    if(cell === 'activo')
    {
      this.Grupos[rowIndex][cell] = $event.checked;
    }
    else
    {
      if($event.target.value !== '')
      {
        this.Grupos[rowIndex][cell] = $event.target.value;
      }
      this.editing[rowIndex + '-' + cell] = false;
    }
    this.Grupos = [...this.Grupos];
  }

  closeModal()
  {
    this.someInput.removeItem();
    this.someInput.selectedFile = null;

    this.modal.hide();
  }

  getGrupos()
  {
    this.service.getGrupos()
    .subscribe(
      e=>{
        this.Grupos = e;

        this.Grupos.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFoto + item.foto
        })

        console.log(this.Grupos)
      });
  }

  GetUsuarios(GrupoId : any)
  {
    this.service.GetUsuarioByGrupo(GrupoId)
    .subscribe(
      e=>{
        this.UsuariosList = e;

        this.UsuariosList.forEach(item => {
          item.fotoAux = ApiConection.ServiceUrlFoto + item.foto
        })
      });
  }

  saveData()
  {
    let grupo = {
      Nombre: this.formGrupos.controls['Nombre'].value,
      Descripcion: this.formGrupos.controls['Descripcion'].value, 
      Activo: this.formGrupos.controls['Activo'].value,
      Foto: "utilerias/img/user/WorkTeam.jpg"
    }

    this.service.addGrupos(grupo)
    .subscribe( data => {
      this.alert = data;

      this.getGrupos();
    });
  }

  updateFoto()
  {
    this.name = this.name + '.' + this.someInput.selectedFile.type.split('/')[1];

    this.service.UploadImg(this.someInput.selectedFile, this.name)
      .subscribe( data => {

        this.closeModal();
          
        this.alert = data;

          this.Grupos[this.rowAux]['foto'] = 'utilerias/img/user/' +  this.someInput.name;
          this.Grupos[this.rowAux]['fotoAux'] = ApiConection.ServiceUrlFoto + 'utilerias/img/user/' +  this.someInput.name;
          this.Grupos = [...this.Grupos];

          console.log(this.Grupos)
         
    }); 
  }

  updateGrupo($event,rowIndex)
  {
    let gu = this.Grupos[rowIndex]
    this.service.UpdateGrupo(gu)
      .subscribe( data => {
        this.alert = data;
        this.getGrupos();
    });
  }

  DeleteGrupo( $even, rowIndex: any ) 
  {
    let g = this.Grupos[rowIndex]
    this.service.DeleteGrupo(g)
      .subscribe( data => {
        this.alert = data;

        this.Grupos.splice(rowIndex, 1);
        this.Grupos = [...this.Grupos];
    });
   
  }

  ngOnInit() {
    this.getGrupos();
  }


}
