import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatalogosService } from '../../../../../service';
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
  @Input() IdFormato: any;
  public formEncabezado: FormGroup;
  Areas: any;
  AreasAux: any;
  EstadoCivil: any;
  Contratos: any;
  buscarArea: string = '';

  Genero = [
    { id: 0, genero: 'Indistinto' },
    { id: 1, genero: 'Masculino' },
    { id: 2, genero: 'Femenino' },
  ]

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
      Contrato: new FormControl('', [Validators.required])
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
      Contrato: [{ value: '', disabled: false }, [Validators.required]]
    })

  }


  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.IdFormato != null) {

    }
  }

  getCatalogos() {
    this._serviceCatalgos.getCatalgoForId(7).subscribe(element => {
      this.EstadoCivil = element;
    });
    this._serviceCatalgos.getCatalgoForId(18).subscribe(element => {
      this.Areas = element;
      this.AreasAux = element;
    });
    this._serviceCatalgos.getCatalgoForId(28).subscribe(element => {
      this.Contratos = element;
    });
  }

  filterAreas(){
    if(this.buscarArea != ''){
      this.AreasAux = this.Areas.filter(x => {
        return x['areaExperiencia']
        .toString()
        .toLowerCase().match(this.buscarArea.toString().toLowerCase());
      })
    }
    else{
      this.AreasAux = this.Areas
    }
  }
}
