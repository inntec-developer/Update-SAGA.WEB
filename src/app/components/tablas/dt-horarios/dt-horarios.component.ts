import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DialogEditHorarioComponent } from './dialog-edit-horario/dialog-edit-horario.component';
import { MatDialog } from '@angular/material';
import { RequisicionesService } from '../../../service/requisiciones/requisiciones.service';

declare var $: any;

@Component({
  selector: 'app-dt-horarios',
  templateUrl: './dt-horarios.component.html',
  styleUrls: ['./dt-horarios.component.scss'],
  providers: [RequisicionesService]
})
export class DtHorariosComponent implements OnInit {
  @Input() Horarios: any[];
  @Input('Requi') Requi: boolean;
  @Input('EstatusRequi') EstatusRequi: any;
  @Output('NumeroVacantes') NumeroVacantes: EventEmitter<any[]> = new EventEmitter();
  public rows: Array<any> = [];
  getHorarios: boolean = false;
  ruta: string;
  horario: any = null;
  rowAux = [];
  EditHorarios: boolean;
  ;
  constructor(
    private dialog: MatDialog,
    private service: RequisicionesService,
    private activeRoute: ActivatedRoute
  ) {
    // this.ruta = this.activeRoute.snapshot.routeConfig ? 
    // this.activeRoute.routeConfig.data.componente : 
    // sessionStorage.getItem('ruta')
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cargarHorarios(this.Horarios);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.Horarios && !changes.Horarios.isFirstChange()) {
      this.cargarHorarios(this.Horarios);
      if (this.EstatusRequi == 4)
        this.EditHorarios = true
      else
        this.EditHorarios = false
    }
  }

  cargarHorarios(data) {
    this.rows = data;
    var SumaVacantes = this.rows
      .map(r => r.numeroVacantes)
      .reduce((sum, current) => sum + current)
    this.NumeroVacantes.emit(SumaVacantes);
  }

  openDialogEdit() {
    if (this.horario) {
      let dialogEditH = this.dialog.open(DialogEditHorarioComponent, {
        width: '25%',
        height: 'auto',
        data: this.horario
      });
      dialogEditH.afterClosed().subscribe(result => {
        if (result) {
          debugger;
          this.rows = result;
          var SumaVacantes = this.rows
            .map(r => r.numeroVacantes)
            .reduce((sum, current) => sum + current)
          this.NumeroVacantes.emit(SumaVacantes);
        }
      });
    }
  }

  public columns: Array<any> = [
    { title: 'Nombre', className: 'text-info text-center' },
    { title: 'De Día', className: 'text-info text-center' },
    { title: 'A Día', className: 'text-info text-center' },
    { title: 'De Hora', className: 'text-info text-center' },
    { title: 'A Hora', className: 'text-info text-center' },
    { title: 'Vacantes', className: 'text-info text-center' },
    { title: 'Espec.', className: 'text-info text-center' },
    { title: 'Estado', className: 'text-info text-center' }
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  public onCellClick(data: any): any {
    if (this.ruta != 'Formato 290') {
      let index = this.rows.indexOf(data.row);
      this.horario = data;
      data.selected ? data.selected = false : data.selected = true;
      if (!data.selected) {
        this.horario = null;
      }

      if (this.rowAux.length == 0) {
        this.rowAux = data;
      }
      else if (data.selected && this.rowAux != []) {
        var aux = data;
        data = this.rowAux;
        data.selected = false;
        aux.selected = true;
        this.rowAux = aux;
      }
    }
  }
}


