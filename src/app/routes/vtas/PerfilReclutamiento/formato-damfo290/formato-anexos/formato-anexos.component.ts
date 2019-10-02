import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PerfilReclutamientoService } from '../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { AdminServiceService } from '../../../../../service/AdminServicios/admin-service.service';
import { DlgBGArteComponent } from '../../../../../components/editor-arte-requisiciones/dlg-bgarte/dlg-bgarte.component';

@Component({
  selector: 'app-formato-anexos',
  templateUrl: './formato-anexos.component.html',
  styleUrls: ['./formato-anexos.component.scss'],
  providers: [PerfilReclutamientoService, AdminServiceService]
})
export class FormatoAnexosComponent implements OnInit, OnChanges {
  @Input('IdFormato') IdFormato: any;

  public Beneficios: any[] = [];
  public Horarios: any[] = [];
  public Actividades: any[] = [];
  public Observaciones: any[] = [];
  public PsicometriasD: any[] = [];
  public PsicometriasC: any[] = [];
  public Documentos: any[] = [];
  public Procesos: any[] = [];
  public Prestaciones: any[] = [];
  public Cardinales: any[] = [];
  public Areas: any[] = [];
  public Gerenciales: any[] = [];

  public Arte = '';
  public Artes = [
    { id: 1, value: 'DamsaVacantes_PP' },
    { id: 2, value: 'DamsaVacantes_PP1' },
    { id: 3, value: 'DamsaVacantes_PP2' },
    { id: 4, value: 'DamsaVacantes_PP3' },
    { id: 5, value: 'DamsaVacantes_PP4' },
    { id: 6, value: 'DamsaVacantes_PP5' },
    { id: 7, value: 'DamsaVacantes_PP6' },
    { id: 1, value: 'DamsaVacantes_PP7' },
    { id: 1, value: 'DamsaVacantes_PP8' },
    { id: 1, value: 'DamsaVacantes_PP17' },
  ];
  bg = '';

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,
    private dialog: MatDialog,
    private _service: AdminServiceService
  ) {
   }

  ngOnInit() {
    this.getBG('DamsaVacantes_PP1.jpg', 'jpg');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this._servicePerfilR.getAnexosPerfil(this.IdFormato).subscribe(data => {
        if (data !== 404) {

          this.Beneficios = data['beneficios'];
          this.Horarios = data['horarios'];
          this.Actividades = data['actividades'];
          this.Observaciones = data['observaciones'];
          this.PsicometriasD = data['psicometriasD'];
          this.PsicometriasC = data['psicometriasC'];
          this.Documentos = data['documentos'];
          this.Procesos = data['procesos'];
          this.Prestaciones = data['prestaciones'];
          this.Cardinales = data['cardinales'];
          this.Areas = data['areas'];
          this.Gerenciales = data['gerenciales'];
          this.bg = data['arte'];
        }
      });
    }
  }

  getBeneficios(data: any) {
    this.Beneficios = data;
  }
  getHorarios(data: any) {
    this.Horarios = data;
  }
  getActividades(data: any) {
    this.Actividades = data;
  }

  getObservaciones(data: any) {
    this.Observaciones = data;
  }

  getPstDamsa(data: any) {
    this.PsicometriasD = data;
  }

  getPstCliente(data: any) {
    this.PsicometriasC = data;
  }

  getDocumento(data: any) {
    this.Documentos = data;
  }

  getProceso(data: any) {
    this.Procesos = data;
  }

  getPrestacion(data: any) {
    this.Prestaciones = data;
  }

  getCardinales(data: any) {
    this.Cardinales = data;
  }

  getAreas(data: any) {
    this.Areas = data;
  }

  getGerenciales(data: any) {
    this.Gerenciales = data;
  }

  getBG(nombre: string, type: string) {
    this._service.GetBG('ArteRequi/BG/' + nombre).subscribe(r => {
      this.bg = 'data:image/' + type + ';base64,' + r;
      this.Arte = nombre;
      console.log(this.Arte);
    });
  }
  openDialogBG() {
    const dialogCnc = this.dialog.open(DlgBGArteComponent, {
      width: '90%',
      height: '90%',
    });
    dialogCnc.afterClosed().subscribe(result => {
      if (result !== '') {
        const type = result.type.replace('.', '');
        this.getBG(result.nom, type);
      }
    });
  }
}
