
import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { DlgResultadosMedicosComponent } from '../../../components/dlg-resultados-medicos/dlg-resultados-medicos.component';

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
  search = "";
total = 0;
  catalogo: string[] = ['APTO','NO APTO'];
  public disabled = false;
  public compact = false;
  public shown = 'shown';

  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  

  public columns: Array<any> = [
    { title: 'Nombre', className: 'text-success text-center', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    // { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    // { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    // { title: 'Creación', className: 'text-info text-center', name: 'fch_Aprobacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    // { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    // { title: 'rfc', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    // { title: 'Nombre', className: 'text-primary', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    // { title: 'Usuario', className: 'text-primary', name: 'usuario', filtering: { filterString: '', placeholder: 'Usuario' } },
    // { title: 'Fecha', className: 'text-primary', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'Fecha Creacion' } },
  ];

  constructor(private _service: ExamenesService, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetCandidatosExamen();
  }
//#region paginador
 public config: any = {
    paging: true,
    //sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-hover mb-0 ']
  };

  public changePage(page: any, data: Array<any> = this.dataSource): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    this.rows = data.slice(start, end);
    return data.slice(start, end);
  }
  //#endregion

  GetCandidatosExamen()
  {
    this._service.GetExamenesMedicos().subscribe(data => {
      var total = 0;
      this.dataSource = data;
      this.dataSource.forEach(x => {
        total = 0;
        x.candidatos.forEach(element => {
          total += element.candidatos.length;
        });
       x.total = total
      })

      this.rows = this.changePage({ page: this.page, itemsPerPage: this.itemsPerPage })

    });
  }

  public Search(data: any) {

    this.search = data.target.value;
    let tempArray: Array<any> = [];

    let colFiltar: Array<any> = [{ title: "cliente" }];

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

  AddCandidato($event, r, cliente)
  {
    if($event.srcElement.checked)
    {
      this.candidatos.push({
        candidatoId: r.candidatoId,
        facturado: true,
        resultado: r.resultado == 'APTO' ? 1 : 0,
        clienteId: cliente.clienteId
      });
    }
    else
    {
      this.candidatos = this.candidatos.filter(x => {
        if(x.candidatoId != r.candidatoId)
        {
          return x;
        }
      })
    }

  }

  Facturar(row)
  {
    swal({
      title: "¿ESTÁS SEGURO?",
      text: "¡Se enviarán (" + this.candidatos.length.toString() + ") resultados a facturar al cliente " + row.cliente + " - " + row.razon,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec2121",
      confirmButtonText: "¡Si, Aceptar!",
      cancelButtonColor: "#ec2121",
      cancelButtonText: "¡No, cancelar!",
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

        let dialog = this.dialog.open(DlgResultadosMedicosComponent, {
          width: '60%',
          height: '50%',
          data: { cliente: this.dataSource[0].cliente + " " + this.dataSource[0].razon, examenes: this.dataSource[0].examenes, candidatos: this.candidatos.length }
        });
        dialog.afterClosed().subscribe(result => {
          if (result == "Ok") {
            this.spinner.show();
            this._service.InsertResultMedico(this.candidatos).subscribe(result => {
              if (result == 200) {
                this.candidatos = [];
                this.GetCandidatosExamen();
                this.spinner.hide();
              }
              else {
                this.spinner.hide();
                swal("FACTURA", "Ocurrió un error al intentar registrar resultados", "error");
              }
            });
          }
          else
          {
            swal("FACTURA", "No se realizó ningun cambio", "warning");
          }
        });
      }
      else {
        this.spinner.hide();
        swal("Cancelado", "No se realizó ningún cambio", "error");
      }
    });
  }


refreshTable()
{
  this.GetCandidatosExamen();
}
  // OpenDialogRevisar(row, examenes)
  // {
  // 
  // }

}
