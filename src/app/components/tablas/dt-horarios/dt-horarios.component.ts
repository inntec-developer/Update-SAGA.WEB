import { AfterContentChecked, Component, Input } from '@angular/core';

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
export class DtHorariosComponent implements  AfterContentChecked {
  @Input() Horarios: any[];
  public rows: Array<any> = [];
  getHorarios: boolean = false;
  ruta: string;
  horario: any;
  constructor(
    private dialog: MatDialog,
    private service: RequisicionesService,
    private activeRoute: ActivatedRoute
  ) {
    // this.ruta = this.activeRoute.snapshot.routeConfig ? 
    // this.activeRoute.routeConfig.data.componente : 
    // sessionStorage.getItem('ruta')
   }

  ngAfterContentChecked(){
    if(this.Horarios != null){
      this.cargarHorarios(this.Horarios);
    }
  }

  cargarHorarios(data){
    if(!this.getHorarios){
      this.rows = data;
      this.getHorarios =  true;
    }
  }

  openDialogEdit(){
    if(this.horario){
      let dialogEditH = this.dialog.open(DialogEditHorarioComponent, {
        width: '25%',
        height: 'auto',
        data: this.horario
      });
      dialogEditH.afterClosed().subscribe(result => {
        if(result){
          this.rows = result;
        }
      //   this.service.getRequiHorarios(this.horario.requisicionId).subscribe(data =>{
      //     this.getHorarios = false;
      //     this.cargarHorarios(data);
      //   });
      });
    }
  }

  public columns: Array<any> = [
    {title: 'Nombre', className: 'text-info text-center'},
    {title: 'De Día', className: 'text-info text-center'},
    {title: 'A Día', className: 'text-info text-center'},
    {title: 'De Hora', className: 'text-info text-center'},
    {title: 'A Hora', className: 'text-info text-center'},
    {title: 'Vacantes', className: 'text-info text-center'},
    {title: 'Espec.', className: 'text-info text-center'},
  ];

  public config: any = {
    className: ['table-striped table-bordered mb-0 d-table-fixed']
  };

  public onCellClick(data: any): any {
    if(this.ruta != 'Formato 290'){
      let index = this.rows.indexOf(data.row);
      this.horario = data;
      /* add an class 'active' on click */
      $('#tablaHorarios').on('click', 'tr', function (event: any) {
          //noinspection TypeScriptUnresolvedFunction
          $(this).addClass('selected').siblings().removeClass('selected');
      });
    }
  }
}


