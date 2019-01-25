import { ExamenesService } from './../../../service/Examenes/examenes.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DlgRevisarExamenesComponent } from '../../../components/dlg-revisar-examenes/dlg-revisar-examenes.component';

@Component({
  selector: 'app-revisar-examenes',
  templateUrl: './revisar-examenes.component.html',
  styleUrls: ['./revisar-examenes.component.scss']
})
export class RevisarExamenesComponent implements OnInit {

  resultados = [];
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
      console.log(this.resultados)
    })
  }
  OpenDialogRevisar(row)
  {
    this.service.GetResultadosCandidato(row.candidatoId, row.requisicionId).subscribe(data => {
      console.log(data)
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
      })

    })

  }
}
