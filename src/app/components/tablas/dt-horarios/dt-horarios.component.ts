import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { ActivatedRoute } from '@angular/router';
import { DialogEditHorarioComponent } from './dialog-edit-horario/dialog-edit-horario.component';
import { MatDialog } from '@angular/material/dialog';
import { RequisicionesService } from '../../../service/requisiciones/requisiciones.service';

declare var $: any;

@Component({
  selector: 'app-dt-horarios',
  templateUrl: './dt-horarios.component.html',
  styleUrls: ['./dt-horarios.component.scss'],
  providers: [RequisicionesService]
})
export class DtHorariosComponent implements OnInit, OnChanges {
  @Input() Horarios: any[];
  @Input('Requi') Requi: boolean;
  @Input('EstatusRequi') EstatusRequi: any;
  @Input('TipoReclutamiento') TipoReclutamiento: any;
  @Output('NumeroVacantes') NumeroVacantes: EventEmitter<any[]> = new EventEmitter();
  rows = [];
  getHorarios = false;
  ruta: string;
  rowAux = [];
  EditHorarios: boolean;
  verTabla = true;

  /*
  * Creacion de mensajes
  * */
 toaster: any;
 toasterConfig: any;
 toasterconfig: ToasterConfig = new ToasterConfig({
   positionClass: 'toast-bottom-right',
   limit: 7, tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true,
 });
  public columns: Array<any> = [
    { title: 'Nombre', className: 'text-center' },
    { title: 'De Día', className: 'text-center' },
    { title: 'A Día', className: 'text-center' },
    { title: 'De Hora', className: 'text-center' },
    { title: 'A Hora', className: 'text-center' },
    { title: 'Vacantes', className: 'text-center' },
    { title: 'Espec.', className: 'text-center' },
    { title: 'Estado', className: 'text-center' }
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };
  constructor(
    private dialog: MatDialog,
    private service: RequisicionesService,
    private activeRoute: ActivatedRoute,
    private toasterService: ToasterService,
  ) {
    // this.ruta = this.activeRoute.snapshot.routeConfig ?
    // this.activeRoute.routeConfig.data.componente :
  }

  ngOnInit() {
    if (this.Horarios) {
      this.cargarHorarios(this.Horarios);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Horarios && !changes.Horarios.isFirstChange()) {
      this.cargarHorarios(this.Horarios);
      if (this.EstatusRequi === 4 || this.EstatusRequi === 43) {
        this.EditHorarios = true;
      } else {
        this.EditHorarios = false;
      }
      if (this.EstatusRequi === 44 || this.EstatusRequi === 45 || this.EstatusRequi === 46) {
        this.EditHorarios = false;
      } else if (this.EstatusRequi === 4 && this.TipoReclutamiento === 1) {
        this.EditHorarios = false;
      }
    }
  }

  cargarHorarios(data) {
    this.rows = data;
    const SumaVacantes = this.rows
      .map(r => r.numeroVacantes)
      .reduce((sum, current) => sum + current);
    this.NumeroVacantes.emit(SumaVacantes);
  }

  openDialogEdit() {
    
      const dialogEditH = this.dialog.open(DialogEditHorarioComponent, {
        width: '25%',
        height: 'auto',
        data: this.rowAux
      });
      dialogEditH.afterClosed().subscribe(result => {
        if (result) {
          this.rows = result;
          const SumaVacantes = this.rows
            .map(r => r.numeroVacantes)
            .reduce((sum, current) => sum + current);
          this.NumeroVacantes.emit(SumaVacantes);
        }
      });
  }



  public onCellClick(data: any): any {
    if (this.ruta !== 'Formato 290') {
      data.selected ? data.selected = false : data.selected = true;
      if (this.rowAux.length === 0) {
        this.rowAux = data;
      } else if (data.selected && this.rowAux !== []) {
        const aux = data;
        data = this.rowAux;
        data.selected = false;
        aux.selected = true;
        this.rowAux = aux;
      }
    }
  }

  popToast(type, title, body) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 5000,
      body: body
    };
    this.toasterService.pop(toast);
  }
}


