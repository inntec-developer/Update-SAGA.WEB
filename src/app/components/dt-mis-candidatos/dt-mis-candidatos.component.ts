import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dt-mis-candidatos',
  templateUrl: './dt-mis-candidatos.component.html',
  styleUrls: ['./dt-mis-candidatos.component.scss']
})
export class DtMisCandidatosComponent implements OnInit {
  @Input('ReclutadorId') Candidatos: any;
  @Output('CandidatoId') CandidatoId: EventEmitter<any> =  new EventEmitter<any>();
  public dataSource : Array<any> = [];
  // Varaibles del paginador
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  showFilterRow: boolean;
  registros: number;
  errorMessage: any;
  element: any = {};

  ReclutadorId: string;

  constructor() { }

  ngOnInit() {
    // this.ReclutadorId = localStorage.getItem('id');
    // this.onChangeTable(this.config);
  }

  public rows: Array<any> = []
  public columns: Array<any> = [
    { title: 'Folio', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Vacante', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Nombre Candidato', className: 'text-info', name: 'nombre', filtering: { filterString: '', placeholder: 'Nombre' } },
    { title: 'Área Experiencia', className: 'text-info', name: 'areaExp', filtering: { filterString: '', placeholder: 'Experiencia' } },
    { title: 'Área Interes', className: 'text-info', name: 'areaInt', filtering: { filterString: '', placeholder: 'Interes' } },
    { title: 'Localidad', className: 'text-info', name: 'localidad', filtering: { filterString: '', placeholder: 'Localidad' } },
    { title: 'Sueldo Aceptable', className: 'text-info text-center', name: 'sueldoMinimo', filtering: { filterString: '', placeholder: 'Sueldo aceptable' } },
    { title: 'Fecha Nacimiento', className: 'text-info text-center', name: 'edad', filtering: { filterString: '', placeholder: 'Fecha Nacimiento' } },
    { title: 'CURP', className: 'text-success', name: 'curp', filtering: { filterString: '', placeholder: 'CURP' } },
    { title: 'RFC', className: 'text-success', name: 'rfc', filtering: { filterString: '', placeholder: 'RFC' } },
  ]

  

}
