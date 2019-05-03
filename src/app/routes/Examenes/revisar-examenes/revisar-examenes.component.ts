import { Component, OnInit } from '@angular/core';

import { DlgRevisarExamenesComponent } from '../../../components/dlg-revisar-examenes/dlg-revisar-examenes.component';
import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-revisar-examenes',
  templateUrl: './revisar-examenes.component.html',
  styleUrls: ['./revisar-examenes.component.scss']
})
export class RevisarExamenesComponent implements OnInit {

  resultados = [];
  filteredData: any = [];
  search = "";

  public disabled = false;
  public compact = false;
  public shown = 'shown';

  public columns: Array<any> = [
    { title: 'Folio', className: 'text-success text-center', name: 'folio', filtering: { filterString: '', placeholder: 'Folio' } },
    { title: 'Cliente', className: 'text-info text-center', name: 'cliente', filtering: { filterString: '', placeholder: 'Cliente' } },
    { title: 'Perfil', className: 'text-info text-center', name: 'vBtra', filtering: { filterString: '', placeholder: 'Perfil' } },
    // { title: 'Creación', className: 'text-info text-center', name: 'fch_Aprobacion', filtering: { filterString: '', placeholder: 'aaaa-mm-dd' } },
    // { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    // { title: 'rfc', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
    // { title: 'Nombre', className: 'text-primary', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    // { title: 'Usuario', className: 'text-primary', name: 'usuario', filtering: { filterString: '', placeholder: 'Usuario' } },
    // { title: 'Fecha', className: 'text-primary', name: 'fch_Creacion', filtering: { filterString: '', placeholder: 'Fecha Creacion' } },
  ];
  constructor(private service: ExamenesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.GetCandidatos();
  }

  GetCandidatos()
  {
    this.service.GetCandidatosExamenes().subscribe(data =>{
      this.resultados = data;
      this.filteredData = data;
    });
  }
  OpenDialogRevisar(row)
  {
    this.service.GetResultadosCandidato(row.candidatoId, row.requisicionId).subscribe(data => {
      let aux = data;
      aux[0].candidatoId = row.candidatoId;
      aux[0].requisicionId = row.requisicionId;

      let dialog = this.dialog.open(DlgRevisarExamenesComponent, {
        width: '60%',
        height: 'auto',
        disableClose: true,
        data: aux
      });
      dialog.afterClosed().subscribe(result => {
      });
    })
  }
  public Search(data: any) {
    this.search = data.target.value;
    let tempArray: Array<any> = [];

    let colFiltar: Array<any> = [{ title: "folio" }, { title: "vBtra" }, { title: "cliente" }];

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

    this.resultados = tempArray;

  }
}
