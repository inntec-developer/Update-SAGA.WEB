import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { PerfilReclutamientoService } from '../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';

@Component({
  selector: 'app-formato-anexos',
  templateUrl: './formato-anexos.component.html',
  styleUrls: ['./formato-anexos.component.scss'],
  providers: [PerfilReclutamientoService]
})
export class FormatoAnexosComponent implements OnInit, OnChanges {
  @Input('IdFormato') IdFormato: any;

  public Beneficios: any[]  = [] ;
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

  constructor(
    private _servicePerfilR: PerfilReclutamientoService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      console.log(this.IdFormato);
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
        }
      });
    }
  }

  getBeneficios(data: any) {
    this.Beneficios = data;
    console.log('Beneficios', data);
  }
  getHorarios(data: any) {
    this.Horarios = data;
    console.log('Horarios', data);
  }
  getActividades(data: any) {
    this.Actividades = data;
    console.log('Actividades', data);
  }

  getObservaciones(data: any) {
    this.Observaciones = data;
    console.log('Observaciones', data);
  }

  getPstDamsa(data: any) {
    this.PsicometriasD = data;
    console.log('Pst DAMSA', data);
  }

  getPstCliente(data: any) {
    this.PsicometriasC = data;
    console.log('Pst Cliente', data);
  }

  getDocumento(data: any) {
    this.Documentos = data;
    console.log('Documentos', data);
  }

  getProceso(data: any) {
    this.Procesos = data;
    console.log('Porcesos', data);
  }

  getPrestacion(data: any) {
    this.Prestaciones = data;
    console.log('Porcesos', data);
  }

  getCardianales(data: any) {
    this.Cardinales = data;
    console.log('Cardinales', data);
  }

  getAreas(data: any) {
    this.Areas = data;
    console.log('Areas', data);
  }

  getGerenciales(data: any) {
    this.Gerenciales = data;
    console.log('Gerenciales', data);
  }

}