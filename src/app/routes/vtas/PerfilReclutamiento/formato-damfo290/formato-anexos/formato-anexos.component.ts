import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { PerfilReclutamientoService } from '../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';

@Component({
  selector: 'app-formato-anexos',
  templateUrl: './formato-anexos.component.html',
  styleUrls: ['./formato-anexos.component.scss'],
  providers: [PerfilReclutamientoService]
})
export class FormatoAnexosComponent implements OnInit {
  @Input('IdFormato') IdFormato: any;

  Beneficios: any[];
  Horarios: any[];
  Actividades: any[];
  Observaciones: any[];
  PstDamsa: any[];
  PstCliente: any[];
  PsicometriasD: any[];

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,

  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.IdFormato != null){
      console.log(this.IdFormato);
      this._servicePerfilR.getAnexosPerfil(this.IdFormato).subscribe(data => {
          if(data != 404){
            debugger;
            this.Beneficios = data['beneficios'];
            this.Horarios = data['horarios'];
            this.Actividades = data['actividades'];
            this.Observaciones = data['observaciones'];
            this.PsicometriasD = data ['psicometriasD']
          }
      });
    }
  }

  getBeneficios(data:any){
    this.Beneficios = data;
    console.log('Beneficios', data);
  }
  getHorarios(data:any){
    this.Horarios = data;
    console.log('Horarios', data);
  }
  getActividades(data:any){
    this.Actividades = data;
    console.log('Actividades', data);
  }

  getObservaciones(data :any){
    this.Observaciones = data;
    console.log('Observaciones', data);
  }

  getPstDamsa(data :any){
    this.PstDamsa = data;
    console.log('Pst DAMSA', data);
  }

  getPstCliente(data :any){
    this.PstCliente = data;
    console.log('Pst Cliente', data);
  }
}
