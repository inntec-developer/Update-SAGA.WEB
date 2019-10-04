import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { CatalogosService } from '../../../../../service';
import { PerfilReclutamientoService } from './../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../core/settings/settings.service';

@Component({
  selector: 'app-formato-requisitos',
  templateUrl: './formato-requisitos.component.html',
  styleUrls: ['./formato-requisitos.component.scss'],
  providers: [
    PerfilReclutamientoService,
    CatalogosService
  ]
})
export class FormatoRequisitosComponent implements OnInit, OnChanges {
  @ViewChild('AptitudtInput') AptitudtInput: ElementRef;
  @Input() IdFormato: any;
  EditPerfil = false;
  isContratoPrueba = false;
  public formEncabezado: FormGroup;

  ContratoValue: any;
  Areas: any;
  AreasAux: any;
  EstadoCivil: any;
  Contratos: any;
  TiempoContrato: any;
  buscarArea = '';
  Escolaridades: any[] = [];
  Aptitudes = [''];
  sueldoMin = 1000;
  sueldoMax = 1000;
  PeriodosPago: any;
  DiasPago: any;
  TiposNomina: any;
  DiasCorte: any;

  Genero = [
    { id: 0, genero: 'Indistinto' },
    { id: 1, genero: 'Masculino' },
    { id: 2, genero: 'Femenino' },
  ];

  exp: any = '';
  apt = [];

  constructor(
    private toasterService: ToasterService,
    private settings: SettingsService,
    private fb: FormBuilder,
    private _servicePerfilR: PerfilReclutamientoService,
    private _serviceCatalgos: CatalogosService
  ) {
    this.formEncabezado = new FormGroup({
      NombrePuesto: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      Genero: new FormControl('', Validators.required),
      EdadMin: new FormControl('', [Validators.min(16), Validators.max(75)]),
      EdadMax: new FormControl('', [Validators.min(18), Validators.max(75)]),
      EstadoCivil: new FormControl('', [Validators.required]),
      Area: new FormControl('', [Validators.required]),
      Contrato: new FormControl('', [Validators.required]),
      TiempoContrato: new FormControl('', [Validators.required]),
      Aptitudes: new FormControl('', [Validators.required]),
      Experiencia: new FormControl('', [Validators.required]),
      sueldoMinimo: new FormControl('', [Validators.required]),
      SueldoMaximo: new FormControl('', [Validators.required]),
      DiasCorte: new FormControl('', [Validators.required]),
      TipoNomina: new FormControl('', [Validators.required]),
      DiasPago: new FormControl('', [Validators.required]),
      PeriodoPago: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getCatalogos();
    this.formEncabezado = this.fb.group({
      NombrePuesto: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(100)]],
      Genero: [{ value: '', disabled: false }, [Validators.required]],
      EdadMin: [{ value: '', disabled: false }, [Validators.max(75)]],
      EdadMax: [{ value: '', disabled: false }, [Validators.max(75)]],
      EstadoCivil: [{ value: '', disabled: false }, [Validators.required]],
      Area: [{ value: '', disabled: false }, [Validators.required]],
      Contrato: [{ value: '', disabled: false }, [Validators.required]],
      TiempoContrato: [{ value: '', disabled: false }],
      Aptitud: [{ value: '', disabled: false }, [Validators.required]],
      Experiencia: [{ value: '', disabled: false }, [Validators.required]],
      SueldoMinimo: [{ value: '1000', disabled: false }, [Validators.required]],
      SueldoMaximo: [{ value: '1000', disabled: false }, [Validators.required]],
      DiaCorte: [{ value: '', disabled: false }, [Validators.required]],
      TipoNomina: [{ value: '', disabled: false }, [Validators.required]],
      DiaPago: [{ value: '', disabled: false }, [Validators.required]],
      PeriodoPago: [{ value: '', disabled: false }, [Validators.required]],
    });
    this.markFormGroupTouched(this.formEncabezado);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.EditPerfil = true;
      this._servicePerfilR.getInfoPerfil(this.IdFormato).subscribe(element => {

        this.Escolaridades = element['escolaridades'];

        const aptitudes = [];
        element['aptitudes'].forEach(x => {
          aptitudes.push(x['id']);
        });

        if (element['contratoInicialId'] === 2) {
          this.isContratoPrueba = true;
        }
        this.apt = aptitudes;
        this.exp = element['experiencia'];
        this.sueldoMin = element['sueldoMinimo'];
        this.sueldoMax = element['sueldoMaximo'];
        this.ContratoValue = element['contratoInicialId'];
        this.formEncabezado.patchValue({
          NombrePuesto: element['nombrePerfil'],
          EdadMin: element['edadMinima'],
          EdadMax: element['edadMaxima'],
          SueldoMinimo: element['sueldoMinimo'],
          SueldoMaximo: element['sueldoMaximo'],
          Experiencia: element['experiencia'],
        });


        setTimeout(() => {
          this.formEncabezado.patchValue({
            Genero: element['generoId'],
            EstadoCivil: element['estadoCivilId'],
            Area: element['areaId'],
            Contrato: element['contratoInicialId'],
            TiempoContrato: element['tiempoContratoId'],
            DiaCorte: element['diaCorteId'],
            TipoNomina: element['tipoNominaId'],
            DiaPago: element['diaPagoId'],
            PeriodoPago: element['periodoPagoId'],
          });
        }, 1000);


      });
    }
  }

  getCatalogos() {
    this._serviceCatalgos.getCatalogoForId(7).subscribe(element => {
      this.EstadoCivil = element;
    });
    this._serviceCatalgos.getCatalogoForId(17).subscribe(element => {
      this.Aptitudes = element;
    });
    this._serviceCatalgos.getCatalogoForId(18).subscribe(element => {
      this.Areas = element;
      this.AreasAux = element;
    });
    this._serviceCatalgos.getCatalogoForId(23).subscribe(element => {
      this.DiasCorte = element.filter(e => e.tipo === 1);
      this.DiasPago = element.filter(e => e.tipo === 2);
    });
    this._serviceCatalgos.getCatalogoForId(24).subscribe(element => {
      this.TiposNomina = element;
    });
    this._serviceCatalgos.getCatalogoForId(26).subscribe(element => {
      this.PeriodosPago = element;
    });
    this._serviceCatalgos.getCatalogoForId(28).subscribe(element => {
      this.Contratos = element;
    });
    this._serviceCatalgos.getCatalogoForId(29).subscribe(element => {
      this.TiempoContrato = element;
    });
  }

  filterAreas() {
    if (this.buscarArea !== '') {
      this.AreasAux = this.Areas.filter(x => {
        return x['areaExperiencia']
          .toString()
          .toLowerCase().match(this.buscarArea.toString().toLowerCase());
      });
    } else {
      this.AreasAux = this.Areas;
    }
  }

  getContrato() {
    if (this.formEncabezado.get('Contrato').value !== 2) {
      this.formEncabezado.controls['TiempoContrato'].reset();
    }
  }

  getSueldoMinimo() {
    this.sueldoMin = this.formEncabezado.get('SueldoMinimo').value;
  }
  getSueldoMaximo() {
    this.sueldoMax = this.formEncabezado.get('SueldoMaximo').value;
  }

  //#region Funciones para recuperar informacion de otros componentes
  getEscolaridades(data: any) {
    this.Escolaridades = data;
  }
  //#endregion

  //#region  CREACION DE MENSAJES
  // toaster: any;
  // toasterConfig: any;
  // toasterconfig: ToasterConfig = new ToasterConfig({
  //   positionClass: 'toast-bottom-right',
  //   limit: 7, tapToDismiss: false,
  //   showCloseButton: true,
  //   mouseoverTimerStop: true,
  // });
  // popToast(type, title, body) {
  //   var toast: Toast = {
  //     type: type,
  //     title: title,
  //     timeout: 5000,
  //     body: body
  //   }
  //   this.toasterService.pop(toast);
  // }
  //#endregion


}
