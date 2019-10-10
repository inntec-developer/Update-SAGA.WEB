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
  bg = '';
  imgLoading = false;
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
    console.log(this.Beneficios);
  }
  getHorarios(data: any) {
    this.Horarios = data;
    console.log(this.Horarios);
  }
  getActividades(data: any) {
    this.Actividades = data;
    console.log(this.Actividades);
  }

  getObservaciones(data: any) {
    this.Observaciones = data;
    console.log(this.Observaciones);
  }

  getPstDamsa(data: any) {
    this.PsicometriasD = data;
    console.log(this.PsicometriasD);
  }

  getPstCliente(data: any) {
    this.PsicometriasC = data;
    console.log(this.PsicometriasC);
  }

  getDocumento(data: any) {
    this.Documentos = data;
    console.log(this.Documentos);
  }

  getProceso(data: any) {
    this.Procesos = data;
    console.log(this.Procesos);
  }

  getPrestacion(data: any) {
    this.Prestaciones = data;
    console.log(this.Prestaciones);
  }

  getCardinales(data: any) {
    this.Cardinales = data;
    console.log(this.Cardinales);
  }

  getAreas(data: any) {
    this.Areas = data;
    console.log(this.Areas);
  }

  getGerenciales(data: any) {
    this.Gerenciales = data;
    console.log(this.Gerenciales);
  }

  getBG(nombre: string, type: string) {
    this._service.GetBG('ArteRequi/BG/' + nombre).subscribe(r => {
      this.bg = 'data:image/' + type + ';base64,' + r;
      this.Arte = nombre;
      this.imgLoading = false;
    });
  }
  openDialogBG() {
    this.imgLoading = true;
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
