import { DlgRequiArteComponent } from './dlg-requi-arte/dlg-requi-arte.component';
import { AdminServiceService } from './../../service/AdminServicios/admin-service.service';
import { DlgBGArteComponent } from './../editor-arte-requisiciones/dlg-bgarte/dlg-bgarte.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Font } from 'ngx-font-picker';
import { SettingsService } from '../../core/settings/settings.service';
import { ApiConection } from '../../service/api-conection.service';
import { switchAll } from 'rxjs/operators';

const swal = require('sweetalert');

/* ES5 */
var htmlToImage = require('html-to-image');

@Component({
  selector: 'app-editor-arte-requisiciones',
  templateUrl: './editor-arte-requisiciones.component.html',
  styleUrls: ['./editor-arte-requisiciones.component.scss'],
  providers: [AdminServiceService]
})
export class EditorArteRequisicionesComponent implements OnInit {

  bg = './../assets/img/ArteVacantes/DamsaVacantes_PP1.jpg';

  fontVacante: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });

  fontDesc: Font = new Font({
    family: 'Roboto',
    size: '12px',
    style: 'regular',
    styles: ['regular']
  });

   fontNecesitas: Font = new Font({
    family: 'Roboto',
    size: '12px',
    style: 'regular',
    styles: ['regular']
  });
   fontDudas: Font = new Font({
    family: 'Roboto',
    size: '12px',
    style: 'regular',
    styles: ['regular']
  });

  ff = 'Lato';
  ColorPickerVac = 'blue';
  ColorPickerDesc = '#909FA7';
  ColorPickerNecs = 'blue';
  ColorPickerDescNesc = 'dark';
  ColorPickerDudas = 'blue';

  vBtra: string = 'Vacante prueba de Melina'
  descripcion: string = 'Importante empresa solicita persona para puesto de ' + this.vBtra + ' en la Zona Metropolitana de Guadalajara';
  experiencia: string = 'Experiencia inventada por Melina en mocos mocos mocos mocos';
  contacto: string = 'Llama al 3333 3333 ext.666 o manda correo indicando el título de la vacante al correo mbonita@damsa.com.mx con atención a Melina Bonita';
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
      this.experiencia = result.experiencia.substring(0, 150);
    })
  }

  Borrar()
  {
    this.vBtra = '';
    this.descripcion = '';
    this.experiencia = '';
    this.contacto = '';
  }

  Guardar()
  {
    if(this.requisicionId != undefined)
    {
    var node = document.getElementById('my-node');
    htmlToImage.toPng(node)
  .then(dataUrl => {
    let arte = { arte: dataUrl, requisicionId: this.requisicionId, usuarioId: this.usuarioId}
     this._service.GuardarArte(arte).subscribe(data => {
        if(data == 200)
        {
          var nom = this.requisicionId + '.png';
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
  } else {
    swal('¡GUARDAR ARTE!', 'No se ha seleccionado vacante', 'warning');
  }
}
}
