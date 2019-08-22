import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { FormatoAnexosComponent } from './formato-anexos/formato-anexos.component';
import { FormatoClienteComponent } from './formato-cliente/formato-cliente.component';
import { FormatoRequisitosComponent } from './formato-requisitos/formato-requisitos.component';
import { SettingsService } from '../../../../core/settings/settings.service';

@Component({
  selector: 'app-formato-damfo290',
  templateUrl: './formato-damfo290.component.html',
  styleUrls: ['./formato-damfo290.component.scss']
})
export class FormatoDAMFO290Component implements OnInit, OnChanges {
  @ViewChild(FormatoClienteComponent) cliente: FormatoClienteComponent;
  @ViewChild(FormatoRequisitosComponent) requisitos: FormatoRequisitosComponent;
  @ViewChild(FormatoAnexosComponent) anexos: FormatoAnexosComponent;

  IdFormato: any;
  isNew = false;
  imprimir = false;

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
    debugger;
    if (changes.cliente['Cliente'][0]['id'] && !changes.cliente['Cliente'][0]['id'].isFirstChange()) {
      const obj = this.cliente.Cliente[0]['id'];
    }
  }

  GuardarPerfil() {
    debugger;
    // this.cliente.formCliente.valid
    // const validformEncabezado = this.requisitos.formEncabezado.valid;
    // if (!validformEncabezado) {
    //   this.popToast('warning', 'Perfil Reclutamiento', 'Verificar información en datos del perfil');
    //   return;
    // }
    this.anexos.Actividades;
    this.anexos.Areas;
    this.anexos.Beneficios;
    this.anexos.Cardinales;
    this.anexos.Documentos;
    this.anexos.Gerenciales;
    this.anexos.Horarios;
    this.anexos.Observaciones;
    this.anexos.Prestaciones;
    this.anexos.Procesos;
    this.anexos.PsicometriasC
    this.anexos.PsicometriasD;

    const obj = {
      ClienteId: this.cliente.Cliente[0]['id'],
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
      // Especifique: this.requisitos.formEncabezado.get('').value || '',
      ContratoInicialId: this.requisitos.formEncabezado.get('Contrato').value,
      TiempoContratoId: this.requisitos.formEncabezado.get('TiempoContrato').value || null,
      Usuario: this._setting.user.usuario,
    };
    console.log('guardar Perfil', obj);
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
