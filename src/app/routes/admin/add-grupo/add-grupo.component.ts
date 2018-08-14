import { UploadImgsComponent } from '../upload-imgs/upload-imgs.component';
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
  UsuariosList = [];
  alert = '';
  verMsj = false;
  success = false;
  haserror = false;
  filteredData = [];
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

  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "nombre" }];

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

    this.Grupos = tempArray;
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
        this.filteredData = this.Grupos;
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
      console.log(data)
      if(data == 201)
      {
        this.alert = 'Los datos se agregaron con éxito';
        this.verMsj = true;
        this.success = true;
        this.haserror = false;
        this.ngOnInit();
      }
      else
      {
        this.alert = 'Ocurrio un error al intentar agregar datos';
        this.verMsj = true;
        this.success = false;
        this.haserror = true;
      }
    });
  }

  updateFoto()
  {
    this.name = this.name + '.' + this.someInput.selectedFile.type.split('/')[1];

    if(this.someInput.StatusCode == 201 || this.someInput.StatusCode == 500)
    {
      this.closeModal();
        this.Grupos[this.rowAux]['foto'] = 'utilerias/img/user/' +  this.someInput.name;
        this.Grupos[this.rowAux]['fotoAux'] = this.someInput.image.src;
        this.Grupos = [...this.Grupos]; 
    }
  }

  updateGrupo($event,rowIndex)
  {
    let gu = this.Grupos[rowIndex]
    this.service.UpdateGrupo(gu)
      .subscribe( data => {
        if(data == 201)
        {
          this.alert = 'Los datos se actualizaron con éxito';
          this.verMsj = true;
          this.success = true;
          this.haserror = false;
          this.getGrupos();
        }
        else
        {
          this.alert = 'Ocurrio un error al intentar actualizar datos';
          this.verMsj = true;
          this.success = false;
          this.haserror = true;
        }
    });
  }

  DeleteGrupo( $even, rowIndex: any ) 
  {
    let g = this.Grupos[rowIndex]
    this.service.DeleteGrupo(g)
      .subscribe( data => {
        if(data == 201)
        {
          this.alert = 'Los datos se actualizaron con éxito';
          this.verMsj = true;
          this.success = true;
          this.haserror = false;

          this.Grupos.splice(rowIndex, 1);
          this.Grupos = [...this.Grupos];
        }
        else
        {
          this.alert = 'Ocurrio un error al intentar actualizar datos';
          this.verMsj = true;
          this.success = false;
          this.haserror = true;

        }
    });
   
  }

  ngOnInit() {
    this.getGrupos();
    this.formGrupos.controls['Nombre'].reset();
    this.formGrupos.controls['Descripcion'].reset();
  }


}
