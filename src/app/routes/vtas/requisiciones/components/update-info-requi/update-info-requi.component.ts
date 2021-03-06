import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CatalogosService, RequisicionesService } from '../../../../../service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';

import { AsignarRequisicionComponent } from '../../../../../components/asignar-requisicion/asignar-requisicion.component';
import { ExamenesService } from './../../../../../service/Examenes/examenes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../../core/settings/settings.service';
import { UpdateRequisicion } from '../../../../../models/vtas/Requisicion'

@Component({
  selector: 'app-update-info-requi',
  templateUrl: './update-info-requi.component.html',
  styleUrls: ['./update-info-requi.component.scss'],
  providers: [RequisicionesService,
    CatalogosService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class UpdateInfoRequiComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() Folios: any;
  @Input() NumeroVacantes: any;

  @ViewChild('asginaciones') asignaciones: AsignarRequisicionComponent;
  public RequiId: string;
  public checked = false;
  public Prioridades: any[];
  public Estatus: any[];
  public requiUpdate: UpdateRequisicion;
  public return: any;
  public placeHolderSelect: string;
  public asignadosRequi: any[] = [];
  public infoRequi: any[];
  public loading: boolean;
  public warn = 'warn';
  public formRequi: FormGroup;
  public minLimitDate: any;

  catalogo = [];
  examenes = [];
  examen = [];
  examenRequi = [];
  verExamen = false;
  examenId = 0;
  tipoId = 0;
  se = new FormControl('', [Validators.required]);
  ste = new FormControl('', [Validators.required]);
  DisabledButton = true;
  estatusId: any;
  constructor(
    private settings: SettingsService,
    public fb: FormBuilder,
    public serviceRequisicion: RequisicionesService,
    public serviceCatalogos: CatalogosService,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService,
    private service: ExamenesService,
    private _Router: Router,
  ) {
    this.formRequi = new FormGroup({
      folio: new FormControl('', [Validators.required]),
      fch_Solicitud: new FormControl('', [Validators.required]),
      fch_Limite: new FormControl('', [Validators.required]),
      prioridad: new FormControl('', [Validators.required]),
      fch_Cumplimiento: new FormControl('', [Validators.required]),
      confidencial: new FormControl(),
      estatus: new FormControl('', [Validators.required]),
    });
  }

  // ------------------------------------------------------------------------------------
  // Toasts (Mensajes del sistema)
  // ------------------------------------------------------------------------------------
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
  });

   ngOnInit() {
    this.placeHolderSelect = 'ASIGNAR COORDINADOR';
    if (this.Folios != null) {
      this.getInformacionRequisicio(this.Folios);
      if (this.NumeroVacantes === 0) {
        this.DisabledButton = true;
      }
    }
    this.getPrioridades();
    this.getEstatus(2);
    this.formRequi = this.fb.group({
      folio: [{ value: '', disabled: true }],
      fch_Solicitud: [{ value: '', disabled: true }],
      fch_Limite: [{ value: '', disabled: true }],
      prioridad: [{ value: '' }, Validators.required],
      fch_Cumplimiento: [{ value: '' }, Validators.required],
      confidencial: [false],
      estatus: [{ value: '', disabled: true }]
    });
    // this.GetCatalogoExamenes();
  }

  ngAfterViewInit(): void {
  }
  getAsignacion(event: any) {
    this.asignadosRequi = event;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Folios && !changes.Folios.isFirstChange()) {
      this.getInformacionRequisicio(this.Folios);
    }
    if (changes.NumeroVacantes && !changes.NumeroVacantes.isFirstChange()) {
      if (this.NumeroVacantes === 0 || this.NumeroVacantes == null) {
        this.DisabledButton = true;
      } else {
        this.DisabledButton = false;
      }
    }

  }

  GetCatalogoExamenes() {
    this.service.GetCatalogo().subscribe(data => {
      this.catalogo = data;
    });
  }

  GetExamenes() {
    this.service.GetExamenes(this.tipoId).subscribe(data => {
      this.examenes = data;
    });
  }

  GetExamen(ExamenId) {
    this.service.GetExamen(ExamenId).subscribe(data => {
      this.examen = data;
    });
  }

  GetExamenRequi() {
    this.service.GetExamenRequi(this.RequiId).subscribe(data => {
      this.examenRequi = data;
      this.examen = data;
    });
  }

  AgregarExamen() {
    const relacion = [{ ExamenId: this.examenId, RequisicionId: this.RequiId }];
    this.service.InsertRelacion(relacion).subscribe(data => {
      if (data === 200) {
        this.popToast('success', 'Asignar Exámen', 'La relación requisición exámen se generó con éxito');
        this.examenId = 0;
        this.tipoId = 0;
        this.examen = [];
        this.examenes = [];
        this.CloseModal();

      } else {
        this.popToast('error', 'Asignar Exámen', 'Ocurrio un error');
      }
    });


  }

  CloseModal() {
    this.verExamen = false;
    this.catalogo = [];
    this.examenId = 0;
    this.tipoId = 0;
    this.GetExamenRequi();
  }

  public getInformacionRequisicio(folio: any) {
    if (folio != null) {
      this.serviceRequisicion.getRequiFolio(this.Folios)
        .subscribe(data => {
          this.asignadosRequi = data.asignados;
          this.infoRequi = data;
          this.asignaciones.getAsignados(this.asignadosRequi);
          this.RequiId = data.id;
          this.formRequi.patchValue({
            folio: data.folio,
            fch_Solicitud: data.fch_Creacion,
            fch_Limite: data.fch_Limite,
            prioridad: data.prioridad.id,
            estatus: data.estatus.id,
            fch_Cumplimiento: data.fch_Cumplimiento,
            confidencial: data.confidencial,
          });
          this.estatusId = data.estatus.id;
          // this.GetExamenRequi();
          this.loading = false;
        }, error => console.error(error));
    }
  }
  /*Cargar Formularios*/
  getPrioridades() {
    this.serviceCatalogos.getPrioridades()
      .subscribe(data => {
        this.Prioridades = data;
      });
  }
  getEstatus(tipoMov: number) {
    this.serviceCatalogos.getEstatusRequi(tipoMov)
      .subscribe(data => {
        this.Estatus = data;
      });
  }
  /* Save Requisicion */
  Save() {
    this.loading = true;
    const asg = [];
    let tipo = 2;
    if (this.asignadosRequi.length > 0) {
        if (this.formRequi.get('estatus').value === 4 || this.formRequi.get('estatus').value === 43) {
          tipo = 1;
        }
       this.asignadosRequi.forEach( a => {
        asg.push({
          RequisicionId: this.RequiId,
          GrpUsrId: a,
          UsuarioAlta: this.settings.user['usuario'],
          UsuarioMod: this.settings.user['usuario'],
          fch_Modificacion: new Date(),
          Tipo: tipo
        });
      });
    }
    const update = {
      id: this.RequiId,
      folio: this.formRequi.get('folio').value,
      prioridadId: this.formRequi.get('prioridad').value,
      fch_Cumplimiento: this.formRequi.get('fch_Cumplimiento').value,
      estatusId: this.formRequi.get('estatus').value,
      confidencial: this.formRequi.get('confidencial').value,
      usuario: this.settings.user['usuario'],
      asignacionRequi: asg
    };
    this.requiUpdate = update;
    this.serviceRequisicion.updateRequisicion(this.requiUpdate)
      .subscribe(data => {
        this.return = data;
        if (this.return === 200) {
          this.popToast('success', 'Requisición', 'La requisición se actualizó correctamente ');
          this.loading = false;
          if (this.estatusId === 43) {
            this.serviceRequisicion.SendEmailRequiPuro(update.id).subscribe(email => {
              if (email === 200) {
                this.popToast(
                  'success',
                  'Reclutamiento Puro',
                  'Se ha notificado por correo electrónico al Gerente Regional, para revisión de la vacante.'
                );
                // setTimeout(() => {
                //   this._Router.navigate(['/ventas/requisicion']);
                // }, 500);
              } else {
                this.popToast(
                  'error',
                  'Error',
                  'Error inesperado al intentar notificar al Gerente Regional sobre la vanate de Reclutamiento Puro.'
                );
              }
            });
          }
         this._Router.navigate(['/ventas/requisicion']);
        } else {
          this.popToast('error', 'Oops!!', 'Algo salió mal intente de nuevo');
          this.loading = false;
        }
      });
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
