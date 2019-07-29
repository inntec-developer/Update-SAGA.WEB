import { DlgRequiArteComponent } from './dlg-requi-arte/dlg-requi-arte.component';
import { AdminServiceService } from './../../service/AdminServicios/admin-service.service';
import { DlgBGArteComponent } from './../editor-arte-requisiciones/dlg-bgarte/dlg-bgarte.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Font } from 'ngx-font-picker';
import { SettingsService } from '../../core/settings/settings.service';
import { ApiConection } from '../../service/api-conection.service';

/* ES5 */
var htmlToImage = require('html-to-image');

@Component({
  selector: 'app-editor-arte-requisiciones',
  templateUrl: './editor-arte-requisiciones.component.html',
  styleUrls: ['./editor-arte-requisiciones.component.scss'],
  providers: [AdminServiceService]
})
export class EditorArteRequisicionesComponent implements OnInit {

  bg = './../assets/img/ArteVacantes/DamsaVacantes_PP1.jpg'

  public fontVacante: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });
  
  public font: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });
  
  public font2: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });
  

  ff: string = 'Lato';
  ColorPicker = 'blue'
  ColorPicker1 = 'blue'
  ColorPicker2 = 'blue'
  vBtra: string = "Vacante prueba de Melina"
  descripcion: string = "Importante empresa solicita persona para puesto de " + this.vBtra + " en la Zona Metropolitana de Guadalajara";
  experiencia: string = "Experiencia inventada por Melina en mocos mocos mocos mocos";
  contacto: string = "Llama al 3333 3333 ext.666 o manda correo indicando el título de la vacante al correo mbonita@damsa.com.mx con atención a Melina Bonita";
  requisicionId: any;
  usuarioId = this.settings.user['id'];
  constructor(private dialog: MatDialog, private _service: AdminServiceService, private settings: SettingsService) { }

  ngOnInit() {
  }

  openDialogBG() {
    let dialogCnc = this.dialog.open(DlgBGArteComponent, {
      width: '90%',
      height: '90%',
    });
    dialogCnc.afterClosed().subscribe(result => {
      this._service.GetBG('ArteRequi/BG/' + result.nom).subscribe(r => {
        let type = result.type.replace('.', '');
        debugger;
        this.bg = 'data:image/'+ type + ';base64,' + r;
      });
    })
  }
  openDialogRequiArte() {
    let dialogCnc = this.dialog.open(DlgRequiArteComponent, {
      width: '90%',
      height: '90%',
    });
    dialogCnc.afterClosed().subscribe(result => {
      this.requisicionId = result.id;
      this.vBtra = result.vBtra;
      this.experiencia = result.experiencia;
    })
  }

  Borrar()
  {
    this.vBtra = "";
    this.descripcion = "";
    this.experiencia = "";
    this.contacto = "";
  }

  Guardar()
  {
    var node = document.getElementById('my-node');
    htmlToImage.toPng(node)
  .then(dataUrl => {
    let arte = { arte: dataUrl, requisicionId: this.requisicionId, usuarioId: this.usuarioId}
     this._service.GuardarArte(arte).subscribe(data => {
        if(data == 200)
        {
          var nom = this.requisicionId + '.png'
          window.saveAs(dataUrl, nom)
          // this._service.downloadImage(nom).subscribe(res =>{
          //   saveAs(res, nom)
          // })
//           var ruta = '/utilerias/img/ArteRequi/Arte/' + this.requisicionId + '.png';
// var nom = this.requisicionId + '.png'
//           this._service.DownloadFiles(ruta).subscribe( res =>{
//             saveAs(res, nom)
//           })
        }
      });
 
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });

 
  
  }
}
