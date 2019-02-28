import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Component, OnInit } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-asignar-psicometricos',
  templateUrl: './asignar-psicometricos.component.html',
  styleUrls: ['./asignar-psicometricos.component.scss']
})
export class AsignarPsicometricosComponent implements OnInit {


  requisiciones = [];
  seleccionados = [];
  listClaves = [];
  clave = "";
  spinner = false;
  clavesRequi = [];
  verClaves = false;
  registros: number;
  filterData = [];

  constructor(private _serviceExamen: ExamenesService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.GetRequisiciones();

  }

  CloseModal() {
    this.verClaves = false;
  }
  GetRequisiciones() {
    this._serviceExamen.GetRequisicionesPsico().subscribe(data => {
      this.requisiciones = data;
      this.filterData = data;
      this.registros = this.requisiciones.length;
    })
  }

  GetClaves(row) {

    this._serviceExamen.GetClaves(row.requisicionId).subscribe(data => {
      this.clavesRequi = data;
      this.onSelect(row);
    })
  }

  AgregarClave(clave) {
    if (clave.length == 16) {
      if (this.listClaves.length > 0) {
        var idx = this.listClaves.indexOf(clave);

        if (idx == -1) {
          this.listClaves.push(clave)
        }
      }
      else {
        this.listClaves.push(clave)

      }

      this.clave = "";
    }

  }

  Agregar() {
    if (this.seleccionados.length > 0) {
      this.spinner = true;
      var aux = [];
      this.listClaves.forEach(item => {
        aux.push({ RequisicionId: this.seleccionados[0].requisicionId, UsuarioId: sessionStorage.getItem('id'), Clave: item })
      })

      this._serviceExamen.InsertClaves(aux).subscribe(data => {
        if (data == 200) {
          this.popToast('success', 'Generar Claves', 'Las claves se agregaron con éxito');
          this.seleccionados = [];
          this.listClaves = [];
          this.GetRequisiciones();
          this.spinner = false;

        }
        else {
          this.popToast('error', 'Generar Claves', 'Ocurrio un error al intentar agregar claves');
          this.spinner = false;
        }
      })
    }
  }
  // GetPostulados()
  // {
  //   this._serviceExamen.GetRequisicionesEstatus(7).subscribe(data => {
  //     this.requisiciones = data;
  //   })
  // }

  PopClave(row) {
    this.listClaves = this.listClaves.filter(function (item) {
      if (item !== row) {
        return item;
      }
    });
  }
  onSelect(row) {
    row.selected ? row.selected = false : row.selected = true;

    this.requisiciones.filter(function (item) {
      if (item.requisicionId !== row.requisicionId) {
        item.selected = false;
      }
    })

    if (row.selected) {
      if (this.seleccionados.length > 0) {
        this.seleccionados.pop();
        this.seleccionados.push(row)
      }
      else {
        this.seleccionados.push(row);
      }
    }
    else {
      this.seleccionados.pop();
    }
  }

  public Search(data: any) {
    let tempArray: Array<any> = [];
    let colFiltar: Array<any> = [{ title: "folio" }, { title: "vBtra" }];

    this.filterData.forEach(function (item) {
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

    this.requisiciones = tempArray;
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
