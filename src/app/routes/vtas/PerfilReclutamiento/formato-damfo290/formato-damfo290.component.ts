import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { FormatoAnexosComponent } from './formato-anexos/formato-anexos.component';
import { FormatoClienteComponent } from './formato-cliente/formato-cliente.component';
import { FormatoRequisitosComponent } from './formato-requisitos/formato-requisitos.component';
import { PerfilReclutamientoService } from './../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../core/settings/settings.service';

@Component({
  selector: 'app-formato-damfo290',
  templateUrl: './formato-damfo290.component.html',
  styleUrls: ['./formato-damfo290.component.scss'],
  providers: [PerfilReclutamientoService]
})
export class FormatoDAMFO290Component implements OnInit, OnChanges {
  @ViewChild(FormatoClienteComponent) cliente: FormatoClienteComponent;
  @ViewChild(FormatoRequisitosComponent) requisitos: FormatoRequisitosComponent;
  @ViewChild(FormatoAnexosComponent) anexos: FormatoAnexosComponent;

  IdFormato: any;
  isNew = false;
  imprimir = false;

  loading = false;

  /*Mensajes del sistema */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,
    private _setting: SettingsService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    private toasterService: ToasterService,
  ) {
    this._Route.params.subscribe(params => {
      if (params['IdFormato'] != null) {
        this.IdFormato = params['IdFormato'];
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
  }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cliente['Cliente'][0]['id'] && !changes.cliente['Cliente'][0]['id'].isFirstChange()) {
      const obj = this.cliente.Cliente[0]['id'];
    }
  }

  GuardarPerfil() {
    debugger;
    this.loading = true;
    const apt = this.requisitos.formEncabezado.get('Aptitud').value;
    const Aptitudes = [];

    apt.forEach(x => {
      Aptitudes.push({
        DAMFO290Id: this.IdFormato || null,
        AptitudId: x,
        UsuarioAlta: this._setting.user.usuario
      });
    });

    const Encabezado = {
      Id: this.IdFormato || null,
      NombrePerfil: this.requisitos.formEncabezado.get('NombrePuesto').value.toUpperCase(),
      TiporeclutamientoId: this.cliente.formCliente.get('Tipo').value,
      ClaseReclutamientoId: this.cliente.formCliente.get('Clase').value,
      GeneroId: this.requisitos.formEncabezado.get('Genero').value,
      EdadMinima: this.requisitos.formEncabezado.get('EdadMin').value,
      EdadMaxima: this.requisitos.formEncabezado.get('EdadMax').value,
      EstadoCivilId: this.requisitos.formEncabezado.get('EstadoCivil').value,
      AreaId: this.requisitos.formEncabezado.get('Area').value,
      Experiencia: this.requisitos.formEncabezado.get('Experiencia').value.toUpperCase(),
      SueldoMinimo: this.requisitos.formEncabezado.get('SueldoMinimo').value,
      SueldoMaximo: this.requisitos.formEncabezado.get('SueldoMaximo').value,
      DiaCorteId: this.requisitos.formEncabezado.get('DiaCorte').value,
      TipoNominaId: this.requisitos.formEncabezado.get('TipoNomina').value,
      DiaPagoId: this.requisitos.formEncabezado.get('DiaPago').value,
      PeriodoPagoId: this.requisitos.formEncabezado.get('PeriodoPago').value,
      Especifique: '',
      ContratoInicialId: this.requisitos.formEncabezado.get('Contrato').value,
      TiempoContratoId: this.requisitos.formEncabezado.get('TiempoContrato').value || null,
      Usuario: this._setting.user.usuario,
    };

    const Collections = {
      actividadesPerfil: this.anexos.Actividades,
      aptitudesPerfil: Aptitudes,
      competenciasAreaPerfil: this.anexos.Areas,
      beneficiosPerfil: this.anexos.Beneficios,
      competenciasCardinalPerfil: this.anexos.Cardinales,
      documentosCliente: this.anexos.Documentos,
      competetenciasGerencialPerfil: this.anexos.Gerenciales,
      horariosPerfil: this.anexos.Horarios,
      observacionesPerfil: this.anexos.Observaciones,
      prestacionesCliente: this.anexos.Prestaciones,
      procesoPerfil: this.anexos.Procesos,
      psicometriasCliente: this.anexos.PsicometriasC,
      psicometriasDamsa: this.anexos.PsicometriasD,
      escolardadesPerfil: this.requisitos.Escolaridades,
    };

    const PerfilReclutamiento = {
      Headers: Encabezado,
      Collections: Collections,
    };
    if (this.IdFormato == null) {
      PerfilReclutamiento['Action'] = 'create';
      Encabezado['ClienteId'] = this.cliente.Cliente[0]['id'];
    } else {
      PerfilReclutamiento['Action'] = 'update';
    }

    this._servicePerfilR.CrudPerfilReclutamiento(PerfilReclutamiento).subscribe(x => {
      if (x !== 404 && x !== 406) {
        if (PerfilReclutamiento['Action'] === 'create') {
          this.popToast('success', 'Perfil Reclutamiento',
            'Se acreado con éxito el perfil de reclutamiento par la vacante' +
            Encabezado['NombrePerfil'] + '.');
        } else {
          this.popToast('success', 'Perfil Reclutamiento',
          'Se actualizo con éxito el perfil de reclutamiento par la vacante' +
          Encabezado['NombrePerfil'] + '.');
        }
        this._Router.navigate(['/reclutamiento/290']);
      } else {
        this.popToast('error', 'Perfil Reclutamiento',
          'Algo salio mal, intente de nuevo, si el problema persiste favor de notificarlo.');
          this.loading = false;
      }
    });


    console.log('guardar Perfil', PerfilReclutamiento);
  }

  popToast(type: any, title: any, body: any) {
    const toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    };
    this.toasterService.pop(toast);
  }


}
