import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { map, startWith } from 'rxjs/operators';

import { CatalogosService } from '../../../../../service';
import { Observable } from 'rxjs';
import { PerfilReclutamientoService } from './../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-formato-requisitos',
  templateUrl: './formato-requisitos.component.html',
  styleUrls: ['./formato-requisitos.component.scss'],
  providers: [
    PerfilReclutamientoService,
    CatalogosService
  ]
})
export class FormatoRequisitosComponent implements OnInit {
  @ViewChild('AptitudtInput') AptitudtInput: ElementRef;
  @Input() IdFormato: any;
  EditPerfil: boolean = false;
  isPrueba: boolean = false;
  public formEncabezado: FormGroup;

  Areas: any;
  AreasAux: any;
  EstadoCivil: any;
  Contratos: any;
  TiempoContrato: any;
  buscarArea: string = '';
  Escolaridades: any[];
  Aptitudes: string[] = [''];
  sueldoMin: number = 1000;
  sueldoMax: number = 1000;
  PeriodosPago: any;
  DiasPago: any;
  TiposNomina: any;
  DiasCorte: any;

  Genero = [
    { id: 0, genero: 'Indistinto' },
    { id: 1, genero: 'Masculino' },
    { id: 2, genero: 'Femenino' },
  ]

  exp: any = '';
  apt = []



  @ViewChild('fruitInput') fruitInput: ElementRef;

  constructor(
    private ToasterService: ToasterService,
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
      TiempoContrato: [{ value: '', disabled: false }, [Validators.required]],
      Aptitud: [{ value: '', disabled: false }, [Validators.required]],
      Experiencia: [{ value: '', disabled: false }, [Validators.required]],
      SueldoMinimo: [{ value: '1000', disabled: false }, [Validators.required]],
      SueldoMaximo: [{ value: '1000', disabled: false }, [Validators.required]],
      DiaCorte: [{ value: '', disabled: false }, [Validators.required]],
      TipoNomina: [{ value: '', disabled: false }, [Validators.required]],
      DiaPago: [{ value: '', disabled: false }, [Validators.required]],
      PeriodoPago: [{ value: '', disabled: false }, [Validators.required]],
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.IdFormato != null) {
      this.EditPerfil = true;
      this._servicePerfilR.getInfoPerfil(this.IdFormato).subscribe(element => {

        this.Escolaridades = element['escolaridades'];

        var aptitudes = []
        element['aptitudes'].forEach(x => {
          aptitudes.push(x['id']);
        });

        if(element['contratoInicialId'] == 2){
          this.isPrueba = true;
        }

        this.apt= aptitudes;
        this.exp = element['experiencia'];
        this.formEncabezado.controls['NombrePuesto'].setValue(element['nombrePerfil']);
        this.formEncabezado.controls['EdadMin'].setValue(element['edadMinima']);
        this.formEncabezado.controls['EdadMax'].setValue(element['edadMaxima']);
        this.formEncabezado.controls['SueldoMinimo'].setValue(element['sueldoMinimo']);
        this.formEncabezado.controls['SueldoMaximo'].setValue(element['sueldoMaximo']);

        setTimeout(() => {
          this.formEncabezado.controls['Genero'].setValue(element['generoId']);
          this.formEncabezado.controls['EstadoCivil'].setValue(element['estadoCivilId']);
          this.formEncabezado.controls['Area'].setValue(element['areaId']);
          this.formEncabezado.controls['Contrato'].setValue(element['contratoInicialId']);
          this.formEncabezado.controls['TiempoContrato'].setValue(element['tiempoContratoId']);
          this.formEncabezado.controls['DiaCorte'].setValue(element['diaCorteId']);
          this.formEncabezado.controls['TipoNomina'].setValue(element['tipoNominaId']);
          this.formEncabezado.controls['DiaPago'].setValue(element['diaPagoId']);
          this.formEncabezado.controls['PeriodoPago'].setValue(element['periodoPagoId']);
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
      this.DiasCorte = element;
      this.DiasPago = element;
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
    if (this.buscarArea != '') {
      this.AreasAux = this.Areas.filter(x => {
        return x['areaExperiencia']
          .toString()
          .toLowerCase().match(this.buscarArea.toString().toLowerCase());
      })
    }
    else {
      this.AreasAux = this.Areas
    }
  }

  getContrato(){
    if(this.formEncabezado.get('Contrato').value == 2 ){
      this.isPrueba = true
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
    console.log('Padre', data);
  }
  //#endregion


}
