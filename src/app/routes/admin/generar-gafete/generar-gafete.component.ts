import { Toast, ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminServiceService } from './../../../service/AdminServicios/admin-service.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
const JsBarcode = require('jsbarcode');
import { DateAdapter } from '@angular/material/core';
import 'jspdf-autotable';
const htmlToImage = require('html-to-image');
import * as jspdf from 'jspdf';
import { SettingsService } from '../../../core/settings/settings.service';
import { DatePipe } from '@angular/common';
import { ApiConection } from '../../../service';
const swal = require('sweetalert2');
@Component({
  selector: 'app-generar-gafete',
  templateUrl: './generar-gafete.component.html',
  styleUrls: ['./generar-gafete.component.scss']
})
export class GenerarGafeteComponent implements OnInit {
  candidatos: any = [];
  checkedRow = {};
  spinner = false;
  curp = '';

  // tabs
  accent = 'accent';

  // scroll
  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'shown';

  // progress
  progress = false;
  totProgress = 0;
  color = 'warn';
  mode = 'buffer';
  bufferValue = 0;

  // CAROUSEL PROPS
  public myInterval = 0;
  public noWrapSlides = false;

  /*Mensajes del sistema */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  seleccion: any = [];
  gafetes: any = [];
  rows: any = [];
  dtosGafetes: any = [];
  candidato: any;
  clave: '';
  auxclave = '';
  tabIndex = 0;
  constructor(private service: AdminServiceService,
    private adapter: DateAdapter<any>,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private pipe: DatePipe) {
    this.adapter.setLocale('es');
  }

  ngOnInit() {
    this.GetDtosGafetes();
  }

  takeFoto() {

  }
  errorImg(r) {
    r['foto'] = '/assets/img/user/default-user.png';
  }
  GetDtosGafetes() {
    this.spinner = true;
    this.service.GetDatosGafetes().subscribe(data => {
      data.forEach(element => {
        if ( element.foto !== null ) {
          element.foto = ApiConection.ServiceUrlImgExamenes + element.foto;
        }
      });
      this.candidatos = data;
      this.Search('');
      this.spinner = false;
    });
  }
  GetDtosGafetesClave(clave) {
    this.spinner = true;
    this.service.GetDatosGafetesClave(clave).subscribe(data => {
      if (data === 417) {
        swal.fire(
          'ERROR',
          'Ocurrio un error en la busqueda de clave por favor intentelo de nuevo, si el error persiste reportelo con el administrador',
          'error'
        );
      } else if ((data || []).length === 0) {
        this.auxclave = this.clave;
        this.clave = '';
      } else {
      this.candidato = data[0];
      this.Select(this.candidato, true);
      }
      this.spinner = false;

    });
  }
  update() {
    this.spinner = true;
    const aux = JSON.parse(JSON.stringify(this.seleccion.filter(x => x.print)));
    aux.forEach(element => {
      this.dtosGafetes.push(
        {
          'CandidatoId': element.candidatoId,
          'Clave': 'DAL0000',
          'Codigo': element.curp,
          'fch_Ingreso': element.fch_Ingreso,
          'UsuarioId': this.settings.user['id'],
          'Activo': true
        }
      );
    });
    this.gafetes = [];
    this.seleccion = [];
    this.checkedRow = {};
    if (this.dtosGafetes.length > 0) {
      this.service.AgregarGafetes(this.dtosGafetes).subscribe(res => {
        this.progress = false;
        this.GetDtosGafetes();
        if (res === 200) {
          this.popToast('success', 'GENERAR GAFETES', 'La informacion se guardó con éxito');
        } else {
          this.popToast('error', 'GENERAR GAFETES', 'Ocurrió un error favor de reportarlo con el administrador');
          // poner log y enviar correo
        }
      });
    } else {
      this.spinner = false;
    }
  }
  Select(row, value) {
    if (value) {
      this.seleccion.forEach(element => {
        element.active = false;
      });
      row.active = true;
      this.seleccion.push(row);

      const div = 'divbarcode_' + (this.seleccion.length - 1);
      setTimeout(() => {
        document.getElementById(div).innerHTML = '<img id="barcode_' + (this.seleccion.length - 1) + '" width="210px;"/>';
        JsBarcode('#barcode_' + (this.seleccion.length - 1), row.curp, {
          background: '#ffffff',
          height: 50
        });
        // setTimeout(() => {
        //   htmlToImage.toPng(document.getElementById('gafete_' + (this.seleccion.length - 1))).then(dataUrl => {
        //     this.gafetes.push({ 'id': row.id, 'image': dataUrl });
        //   });
        // }, 100);
      }, 100);
    } else {
      const idx = this.seleccion.findIndex(x => x.id === row.id);
      if (idx > -1) {
        this.seleccion.splice(idx, 1);
        if (this.seleccion.length > 0) {
          this.seleccion[0].active = true;
        }
      }
      // this.gafetes.splice(this.gafetes.findIndex(x => x.id === row.id), 1);
    }
  }
  selectSlide(index) {
    if (this.seleccion.length > 0) {
      this.seleccion.forEach(element => {
        element.active = false;
      });
      this.seleccion[index].active = true;
    }
  }
  SelectTab($event) {
    this.seleccion = [];
    this.checkedRow = {};
    if ($event === 1) {
      this.candidato = null;
      this.auxclave = this.clave;
      this.clave = '';
      this.tabIndex = $event;
    }
  }

  public Search(search: string) {
    if (search === '') {
      this.rows = JSON.parse(JSON.stringify(this.candidatos));
      return;
    }

    const tempArray: Array<any> = [];
    const colFiltar: Array<any> = [{ title: 'nom' }, { title: 'apellidoPaterno' }, { title: 'apellidoMaterno' }];

    this.candidatos.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(search.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    this.rows = tempArray;
  }

  async printGafete() {
    this.spinner = true;
    this.progress = true;
    const doc = new jspdf('p', 'pt', 'letter');

    doc.setFont('Tahoma');
    const width = (doc.internal.pageSize.width / 3) - 5;
    const height = 300;
    let paginas = 0;
    let yOffset = 0;
    this.seleccion.forEach(element => {
      element.active = false;
    });
    for (let c = 0; c <= this.seleccion.length - 1; c++) {
      this.totProgress += (c + 1) * 10;
      console.log(this.totProgress)
      try {
        this.seleccion[c].active = true;
        if (c > 0) {
          this.seleccion[c - 1].active = false;
        }
        yOffset = paginas === 0 ? 40 : 380;
        await htmlToImage.toPng(document.getElementById('front')).then(dataUrl => {
          doc.addImage(
            dataUrl, 'PNG',
            40,
            yOffset,
            width,
            height
          );
        });
        const nomSize = this.seleccion[c].nom.length > 15 && this.seleccion[c].nom.length <= 20 ? 8
          : this.seleccion[c].nom.length > 15 ? 6 : 10;

        doc.setFontSize(nomSize);
        doc.text(120, yOffset + 240, this.seleccion[c].nom);
        const apellidoSize = this.seleccion[c].apellidoPaterno.length + this.seleccion[c].apellidoMaterno.length > 15 &&
          this.seleccion[c].apellidoPaterno.length + this.seleccion[c].apellidoMaterno.length <= 20 ? 8
          : this.seleccion[c].apellidoPaterno.length + this.seleccion[c].apellidoMaterno.length > 28 ? 6 : 10;
        doc.setFontSize(apellidoSize);
        doc.text(120, yOffset + 250, this.seleccion[c].apellidoPaterno + ' ' + this.seleccion[c].apellidoMaterno);

        const vBtraSize = this.seleccion[c].puesto.length > 15 && this.seleccion[c].puesto.length <= 20 ? 8
          : this.seleccion[c].puesto.length > 20 ? 6 : 10;
        doc.setFontSize(vBtraSize);
        doc.text(120, yOffset + 260, this.seleccion[c].puesto);

        await htmlToImage.toPng(document.getElementById('back')).then(dataUrl => {
          doc.addImage(
            dataUrl, 'PNG',
            width + 80,
            yOffset,
            width,
            height
          );
        });

        doc.setFontSize(10);
        doc.text(width + 140, yOffset + 65, 'DAL0000');
        const fi = this.pipe.transform(new Date(this.seleccion[c].fch_Ingreso), 'dd-MMM-yyyy');
        doc.text(width + 210, yOffset + 65, fi);
        doc.text(width + 150, yOffset + 85, this.seleccion[c].nss);
        doc.text(width + 150, yOffset + 110, '(' + this.seleccion[c].lada + ')' + ' ' + this.seleccion[c].telefono);
        doc.text(width + 130, yOffset + 140, this.seleccion[c].curp);

        await htmlToImage.toPng(document.getElementById('barcode_' + c)).then(dataUrl => {
          doc.addImage(
            dataUrl, 'PNG',
            width + 110,
            yOffset + height - 55,
            140,
            30
          );
        });

        paginas += 1;
        if (paginas === 2 && c < this.seleccion.length - 1) {
          paginas = 0;
          doc.addPage();
        }
        this.seleccion[c].print = true;
      } catch { }
    }
    doc.save('gafete.pdf');
    if (this.tabIndex === 0) {
      this.update();
    } else {
      this.spinner = false;
      this.progress = false;
      this.clave = '';
      this.seleccion = [];
      this.candidato = null;
      this.Search('');
    }

    // for (let c = 0; c <= this.gafetes.length - 1; c++) {
    //   yOffset = paginas === 0 ? 40 : 380;
    //   try {
    //     doc.addImage(
    //       this.gafetes[c].image, 'PNG',
    //       40,
    //       yOffset,
    //       width * 2,
    //       height
    //     );
    //     this.seleccion[c].print = true;
    //   } catch {
    //     debugger;
    //     this.seleccion[c].active = true;

    //       await htmlToImage.toPng(document.getElementById('gafete_' + c)).then(dataUrl => {
    //         doc.addImage(
    //           dataUrl, 'PNG',
    //           40,
    //           yOffset,
    //           width * 2,
    //           height
    //         );
    //         this.seleccion[0].print = true;
    //       });

    //   }
    //   paginas += 1;
    //   if (paginas === 2 && c < this.gafetes.length - 1) {
    //     paginas = 0;
    //     doc.addPage();
    //   }

    // }

    // doc.save('gafete.pdf');
    // this.update();
  }


  adjustFont(long) {
    const myStyles = {
      'font-size.px': long > 19 && long <= 28 ? 8 : long > 28 ? 6 : 12,
    };
    return myStyles;
  }
  adjustFontvBtra(long) {
    const myStyles = {
      'font-size.px': long > 25 && long <= 28 ? 8 : long > 28 ? 6 : 10,
    };
    return myStyles;
  }
  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);
  }

}
