import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PerfilReclutamientoService } from '../../../../../../service/PerfilReclutamiento/perfil-reclutamiento.service';
import { SettingsService } from './../../../../../../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-perfil-escolaridades',
  templateUrl: './perfil-escolaridades.component.html',
  styleUrls: ['./perfil-escolaridades.component.scss']
})
export class PerfilEscolaridadesComponent implements OnInit {
  @Input() IdFormato: any

  esNuevo: boolean = true;

  public formEscolaridades: FormGroup;

  constructor(
    private _servicePerfilR: PerfilReclutamientoService,
    private _settings: SettingsService,
    private toasterService: ToasterService,
    private fb: FormBuilder

  ) {
    this.formEscolaridades = new FormGroup({
      Escolaridad: new FormControl('', [Validators.required]),
      Nivel: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.formEscolaridades = this.fb.group({
      Escolaridad: [{value:'', disabled: false}, [Validators.required]],
      Nivel: [{value:'', disabled: false}, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.IdFormato != null){
      this.esNuevo = false;
    }
  }

}
