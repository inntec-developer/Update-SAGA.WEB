import { EditorArteRequisicionesComponent } from './../editor-arte-requisiciones.component';
import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from '../../../service/api-conection.service';
import { MatDialogRef } from '@angular/material';

import { saveAs } from 'file-saver';

const swal = require('sweetalert');

@Component({
  selector: 'app-dlg-bgarte',
  templateUrl: './dlg-bgarte.component.html',
  styleUrls: ['./dlg-bgarte.component.scss'],
  providers:[ AdminServiceService ]
})
export class DlgBGArteComponent implements OnInit {
  // config scroll
  disabled = false;
  compact = false;
  invertX = true;
  invertY = true;
  shown = 'hover';

  cont_image = 0;
  files = [];

  constructor(private service: AdminServiceService, private dialog : MatDialogRef<DlgBGArteComponent>,) { }

  ngOnInit() {
    this.GetBackGround();
  }

  GetBackGround() {
    this.service.GetBGArte().subscribe( data => {
      this.getTypes(data)
    });
  }

  getTypes(data) {

    data.forEach(element => {
      if (element.ext.toLowerCase() === '.jpeg' || element.ext.toLowerCase() === '.jpg' || element.ext.toLowerCase() === '.png')
      {
        this.files.push({
          type: element.ext,
          nom: element.nom,
          size: element.size,
          fc: element.fc,
          icon: ApiConection.ServiceUrlFileManager + 'img/ArteRequi/BG/' + element.nom
        });
        this.cont_image ++;
      }
    });

  }

  SeleccionarBG(file) {
    this.dialog.close(file);
  }
  downloadFile(datos) {
    console.log(datos)
    const ruta = '/utilerias/img/ArteRequi/BG/';

    this.service.DownloadFiles(ruta + datos.nom).subscribe( res => {
      saveAs(res, datos.nom);
    });

  }

  deleteFile(datos) {
    swal({
      title: '¿ESTÁS SEGURO?',
      text: '¡Se borrara el archivo ' + datos.nom + '!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec2121',
      confirmButtonText: '¡Si, borrar!',
      cancelButtonColor: '#ec2121',
      cancelButtonText: '¡No, cancelar!',
      closeOnConfirm: true,
      closeOnCancel: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        const ruta = '~/utilerias/img/ArteRequi/BG/';
        this.service.DeleteFiles(ruta + datos.nom).subscribe( res => {
          if (res === 200) {
            swal('Borrar Archivo', 'El archivo se borró con éxito', 'success')
            this.ngOnInit();
          } else  {
            swal('Borrar Archivo', 'Ocurrio un error al intentar borrar archivo', 'error');
          }
        });
      } else {
        swal('Cancelado', 'No se realizó ningún cambio', 'error');
      }
    });
  }

  fileChangeListener($event) {
    const file: File = $event.target.files[0];

    this.service.UploadBG(file).subscribe(result => {
      if (result === 201) {
        this.ngOnInit();
        swal('Guardar Archivo', 'El archivo ' + file.name + ' se subió con éxito', 'success');
      } else {
        swal('Guardar Archivo', 'Ocurrió un error al intentar subir archivo ' + file.name, 'error');
      }
    });
  }
}
