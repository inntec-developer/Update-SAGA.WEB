import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-agregar-resultados-psico',
  templateUrl: './agregar-resultados-psico.component.html',
  styleUrls: ['./agregar-resultados-psico.component.scss']
})
export class AgregarResultadosPsicoComponent implements OnInit {

  public disabled = false;
  public invertX = false;
  public compact = false;
  public invertY = false;
  public shown = 'hover';

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  constructor(
    private _serviceExamen: ExamenesService,
    private toasterService: ToasterService,
    private settings: SettingsService,
    private _Router: Router
    ) { }

  candidatos = [];
  rows = [];
  catalogo = ['APTO', 'NO APTO'];
  filteredData = [];
  resVal = true;

  ngOnInit() {
    this.GetClavesCandidatos();
  }

  //#region paginador

  public changePage(page: any, data: Array<any> = this.candidatos): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  //#endregion
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {

    const filteredData = this.candidatos;
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;

    this.length = filteredData.length;

  }

  GetClavesCandidatos() {
    this._serviceExamen.GetClavesCandidatos().subscribe(data => {
      this.candidatos = data;
      this.filteredData = data;
      this.onChangeTable(this.config);

    });
  }

  AgregarResultado(row, c) {

    const resultado = {RequiClaveId: row.requiClaveId, Resultado: row.resultado, UsuarioId: this.settings.user['id']};

    this._serviceExamen.AgregarResultadoPsico(resultado).subscribe(data => {
      if (data === 200) {
        this.popToast('success', 'Agregar Resultados', 'Los cambios se realizaron con éxito');
        row.resVal = false;
      } else {
        this.popToast('error', 'Agregar Resultados', 'Ocurrio un error al intentar agregar resultado');

      }
    });
  }

  GenerarClaves(){
    this._Router.navigate(['/examenes/asignarClaves/'], { skipLocationChange: true });
  }
  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: 'clave' }, { title: 'nombre' }];

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

    this.rows = tempArray;
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
