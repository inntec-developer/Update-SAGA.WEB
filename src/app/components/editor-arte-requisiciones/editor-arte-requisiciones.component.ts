import { SistTicketsService } from './../../service/SistTickets/sist-tickets.service';
import { DlgRequiArteComponent } from './dlg-requi-arte/dlg-requi-arte.component';
import { AdminServiceService } from './../../service/AdminServicios/admin-service.service';
import { DlgBGArteComponent } from './../editor-arte-requisiciones/dlg-bgarte/dlg-bgarte.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Font } from 'ngx-font-picker';
import { SettingsService } from '../../core/settings/settings.service';


const swal = require('sweetalert');

/* ES5 */
const htmlToImage = require('html-to-image');

@Component({
  selector: 'app-editor-arte-requisiciones',
  templateUrl: './editor-arte-requisiciones.component.html',
  styleUrls: ['./editor-arte-requisiciones.component.scss'],
  providers: [AdminServiceService]
})
export class EditorArteRequisicionesComponent implements OnInit {

  @Input() requisicionId;

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

  usuarioId = this.settings.user['id'];

  constructor(private dialog: MatDialog,
    private _service: AdminServiceService,
    private settings: SettingsService,
    private _serviceTickets: SistTicketsService) { }

  ngOnInit() {
   this.openDialogRequiArte();
  }

  openDialogBG() {
    const dialogCnc = this.dialog.open(DlgBGArteComponent, {
      width: '90%',
      height: '90%',
    });
    dialogCnc.afterClosed().subscribe(result => {
      console.log(result)
      if (result !== '') {
        this._service.GetBG('ArteRequi/BG/' + result.nom).subscribe(r => {
          let type = result.type.replace('.', '');
          this.bg = 'data:image/' + type + ';base64,' + r;
        });
      } else {
        swal('¡GUARDAR ARTE!', 'No se realizo ningún cambio', 'warning');
      }
    });
  }
  openDialogRequiArte() {

    this._serviceTickets.GetVacantesByRequi(this.requisicionId).subscribe(data => {
       this.vBtra = data[0]['vBtra'];
       this.experiencia = data[0]['experiencia'].substring(0, 150);
    });
    // let dialogCnc = this.dialog.open(DlgRequiArteComponent, {
    //   width: '90%',
    //   height: '90%',
    // });
    // dialogCnc.afterClosed().subscribe(result => {
    //     if (result !== '') {
    //           this.requisicionId = result.id;
    //           this.vBtra = result.vBtra;
    //           this.experiencia = result.experiencia.substring(0, 150);
    //     }
    // });
  }

  Borrar() {
    this.vBtra = '';
    this.descripcion = '';
    this.experiencia = '';
    this.contacto = '';
  }

  Guardar() {
    if(this.requisicionId !== undefined) {
    const node = document.getElementById('my-node');
    htmlToImage.toPng(node)
  .then(dataUrl => {
    const arte = { arte: dataUrl, requisicionId: this.requisicionId, usuarioId: this.usuarioId }
     this._service.GuardarArte(arte).subscribe(data => {
        if (data === 200) {
          const nom = this.requisicionId + '.png';
          window.saveAs(dataUrl, nom);
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
