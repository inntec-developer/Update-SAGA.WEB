
import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DlgResultadosMedicosComponent } from '../../../components/dlg-resultados-medicos/dlg-resultados-medicos.component';
import { ComentarioVacanteComponent } from '../../../components/comentario-vacante/comentario-vacante.component';

const swal = require('sweetalert');
@Component({
  selector: 'app-agregar-result-medicos',
  templateUrl: './agregar-result-medicos.component.html',
  styleUrls: ['./agregar-result-medicos.component.scss']
})
export class AgregarResultMedicosComponent implements OnInit {

  dataSource = [];
  filteredData: any = [];
  candidatos = [];
  rows = [];
  search = '';
total = 0;
  catalogo: string[] = ['APTO','NO APTO'];
  public disabled = false;
  public compact = false;
  public shown = 'shown';

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public columns: Array<any> = [
    { title: 'Nombre', className: 'text-success text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
  ];
  totalCandidatos = 0;
  public config: any = {
    paging: true,
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };
  rowAux = [];
  requisicionId: any;
  folio: any;
  vBtra: any;
  constructor(
    private _service: ExamenesService,
    private dialog: MatDialog,
    private dlgComent: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetCandidatosExamen();
  }
//#region paginador


  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    this.rows = data.slice(start, end);
    this.length = data.length;
    return data.slice(start, end);
  }
  //#endregion

  GetCandidatosExamen() {
    this._service.GetExamenesMedicos().subscribe(data => {
      let total = 0;
      this.dataSource = data;
      this.totalCandidatos = 0;
      this.dataSource.forEach(x => {
        total = 0;
        x.candidatos.forEach(element => {
          total += element.candidatos.length;
        });
       x.total = total;
      });

      this.totalCandidatos = this.dataSource.reduce(function (valorAnterior, valorActual, indice, vector) {
        return valorAnterior + valorActual.total;
      }, 0);

      this.rows = this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage });

    });
  }

  public Search(data: any) {

    this.search = data.target.value;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'cliente' }];

    this.dataSource.forEach(function (item) {
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

  AddCandidato($event, r, requi) {
    if ($event.srcElement.checked) {
      this.candidatos.push({
        candidatoId: r.candidatoId,
        facturado: true,
        resultado: r.resultado === 'APTO' ? 1 : 0,
        requisicionId: requi.requisicionId
      });
    } else {
      this.candidatos = this.candidatos.filter(x => {
        if (x.candidatoId !== r.candidatoId) {
          return x;
        }
      });
    }

  }

  Facturar(row) {
    swal({
      title: '¿ESTÁS SEGURO?',
      text: '¡Se enviarán (' + this.candidatos.length.toString() + ') resultados a facturar al cliente ' + row.cliente + ' - ' + row.razon,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec2121',
      confirmButtonText: '¡Si, Aceptar!',
      cancelButtonColor: '#ec2121',
      cancelButtonText: '¡No, cancelar!',
      closeOnConfirm: true,
      closeOnCancel: true
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {
        // this.spinner.show();
        // var aux = [];

        // row.candidatos[0].forEach(c => {
        //   if (c.resultado) {
        //     aux.push({
        //       CandidatoId: c.candidatoId,
        //       Facturado: true,
        //       Resultado: c.resultado == 'APTO' ? 1 : 0,
        //       ClienteId: row.clienteId
        //     });
        //   }
        // });
        // this.spinner.hide();

        const dialog = this.dialog.open(DlgResultadosMedicosComponent, {
          width: '60%',
          height: '50%',
          data: { cliente: this.dataSource[0].cliente + ' ' +
           this.dataSource[0].razon, examenes: this.dataSource[0].examenes, candidatos: this.candidatos.length }
        });
        dialog.afterClosed().subscribe(result => {
          if (result === 'Ok') {
            this.spinner.show();
            this._service.InsertResultMedico(this.candidatos).subscribe(result2 => {
              if (result2 === 200) {
                this.candidatos = [];
                this.GetCandidatosExamen();
                this.spinner.hide();
              } else {
                this.spinner.hide();
                swal('FACTURA', 'Ocurrió un error al intentar registrar resultados', 'error');
              }
            });
          } else {
            swal('FACTURA', 'No se realizó ningun cambio', 'warning');
          }
        });
      }
      else {
        this.spinner.hide();
        swal('Cancelado', 'No se realizó ningún cambio', 'error');
      }
    });
  }
  public onCellClick(data: any, row: any): any {
    row.selected ? row.selected = false : row.selected = true;
    this.requisicionId = data.requisicionId;
    this.folio = data.folio;
    this.vBtra = data.vBtra;

    if (this.rowAux.length === 0) {
      this.rowAux = row;
    } else if (row.selected && this.rowAux !== []) {
      const aux = row;
      row = this.rowAux;
      row.selected = false;
      aux.selected = true;
      this.rowAux = aux;
    }
  }

  openDialogComentarios() {
    const motivoId = 7;

    const dlgComent = this.dlgComent.open(ComentarioVacanteComponent, {
      width: '85%',
      height: 'auto',
      data: {id: this.requisicionId,
        vBtra: this.vBtra,
        folio: this.folio,
        motivoId: motivoId}
    });
    dlgComent.afterClosed().subscribe(result => {
      // if (result === 200) {
      //   this.popToast('success', 'Comentarios', 'La requisición se canceló exitosamente, podrás consultarla en el histórico');
      // }
    });
  }
refreshTable() {
  this.GetCandidatosExamen();
}

}
