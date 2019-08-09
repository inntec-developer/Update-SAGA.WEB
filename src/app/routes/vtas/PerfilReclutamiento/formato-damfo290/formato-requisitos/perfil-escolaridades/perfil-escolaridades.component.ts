import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatalogosService } from './../../../../../../service/catalogos/catalogos.service';
import { PerfilReclutamientoService } from '../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from './../../../../../../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-perfil-escolaridades',
  templateUrl: './perfil-escolaridades.component.html',
  styleUrls: ['./perfil-escolaridades.component.scss'],
  providers: [CatalogosService]
})
export class PerfilEscolaridadesComponent implements OnInit {
  @Input() IdFormato: any;
  @Input() Escolaridades: any[];
  @Output() EscolaridadesEmt = new EventEmitter();
  EscolaridadesNew = [];

  esNuevo: boolean = true;
  // Escolaridades: any[];
  // Niveles: any;

  private Add: boolean;

  // public formEscolaridades: FormGroup;
  public EscolaridadArray: FormGroup;
  public escolaridad: any;

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,
    private _serviceCatalogos: CatalogosService,
    private _settings: SettingsService,
    private toasterService: ToasterService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.EscolaridadArray = this.fb.group({
      escolaridad: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    debugger;
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Escolaridades != null) {
        this.PopulateForm(this.Escolaridades);
      }
    }
  }

  private PopulateForm(escolaridad: any[]) {
    for (let x in escolaridad) {
      this.AddEscolaridad(1);
    }
    this.EscolaridadArray.patchValue({
      escolaridad: this.Escolaridades,
    });
  }

  AddEscolaridad(Escolaridad: any) {
    if (this.Add) {
      this.Add = true;
      return;
    }
    else {
      Escolaridad > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.EscolaridadArray.controls['escolaridad'];
      const addrCtrl = this.initEscolaridad();
      control.push(addrCtrl);
    }
  }

  initEscolaridad() {
    return this.fb.group({
      id: ['0'],
      escolaridad: [],
      nivel: [],
      escolaridadId: ['', Validators.required],
      nivelId: ['', Validators.required]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    debugger;
    if (!data['isEdit']) {

      this.EscolaridadesNew.push({
        escolaridadId: data['escolaridadId'],
        estadoEstudioId: data['estadoEstudioId']
      });
    } else {
      let editRegistro = {
        escolaridadId: data['escolaridadId'],
        estadoEstudioId: data['estadoEstudioId']
      };
      this.EscolaridadesNew[data['index']] = editRegistro;
    }
    this.EscolaridadesEmt.emit(this.EscolaridadesNew);
  }

  removeEscolaridad(i: number) {
    const control = <FormArray>this.EscolaridadArray.controls['escolaridad'];
    control.removeAt(i);
    this.EscolaridadesNew.splice(i, 1);
    this.EscolaridadesEmt.emit(this.EscolaridadesNew);
  }


}
