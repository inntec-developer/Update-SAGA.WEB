import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { views, viewsdtl } from '../../../../models/recl/viewvacantes';

import { ApiConection } from '../../../../service/api-conection.service';
import { CatalogoConfiguracionService } from '../../../../service/DisenioVacante/catalogo-configuracion.service';
import { ConfiguracionService } from '../../../../service/DisenioVacante/configuracion.service';
import { Http } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequisicionesService } from '../../../../service/requisiciones/requisiciones.service';
import { debug } from 'util';

// Modelos




@Component({
  selector: 'app-disenador-vacante',
  templateUrl: './disenador-vacante.component.html',
  styleUrls: ['./disenador-vacante.component.scss'],
  providers: [CatalogoConfiguracionService, ConfiguracionService, RequisicionesService],
})

export class DisenadorVacanteComponent implements OnInit {
  public General: any[];
  public Contrato: any[];
  public PuestoReclutar: any[];
  public Horario: any[];
  public sueldo: any[];
  public Otros: any[];
  public Actividad: any[];
  public Beneficio: any[];
  public Direccion: any[];
  public Telefono: any[];
  public Contacto: any[];
  public Psicometria: any[];
  public Documento: any[];
  public Proceso: any[];
  public Copetencia: any[];
  public Ubicacion: any[];
  public ListaCampo: Array<any> = [];
  public ListaCon: Array<any> = [];
  public Clasifica: any[];
  public ViewRequi: any[];
  public contactos: any[];
  public escolaridadesRequi: any[];
  public horariosRequi: any[];
  public beneficiosRequi: any[];
  public psicoDamsa: any[];
  public psicoCliente: any[];
  public telefono: any[];
  public IdHdr: number;
  public IdDtl: number;
  public Vistas = new views;
  public Vistasdtl = new viewsdtl;
  panelOpenState = false;

  public Requi: string;
  public Mensaje: string;
  public variable = false;
  private toasterService: ToasterService;
  public bol: boolean;
  private UrlBolsa = ApiConection.ServiceUrlLoginBolsa;

  step = 0;
  stepd = 0;
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true
  });
  Folio: any;
  VBtra: any;

  constructor(
    private service: CatalogoConfiguracionService
    , private http: Http
    , private route: ActivatedRoute
    , private router: Router
    , private Config: ConfiguracionService
    , toasterService: ToasterService
    , private spinner: NgxSpinnerService
    , private serviceRequi: RequisicionesService
  ) {
    this.toasterService = toasterService;
    this.route.params.subscribe(params => {
      this.Requi = params['Requi'];
      this.Folio = params['Folio'];
      this.VBtra = params['VBtra'];
    });
  }

  ngOnInit() {
    this.service.getGeneral(this.Requi)
      .subscribe(data => {
        this.General = data;
        this.ViewRequi = data[0].requi;
        this.contactos = data[0].requi.contactos[0];
        this.escolaridadesRequi = data[0].requi.escolaridadesRequi;
        this.horariosRequi = data[0].requi.horariosRequi;
        this.beneficiosRequi = data[0].requi.beneficiosRequi;
        this.psicoDamsa = data[0].requi.psicoDamsa;
        this.psicoCliente = data[0].requi.psicoCliente;
        this.telefono = data[0].requi.telefono[0];
        console.log(this.ViewRequi);
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.View(element.id, element.resumen, 'H');
          this.View(element.id, element.resumen, 'D');
        }
      });

    this.service.getCampos()
      .subscribe(data => {
        //  let ListaCampo : any[];
        this.ListaCampo = [];
        this.ListaCampo = data;
        //  this.Publicar()
      });

    this.service.getClasificaciones()
      .subscribe(data => {
        this.Clasifica = data;
      });
  }

  Publicar() {
    this.spinner.show();
    for (const item of this.ListaCampo) {
      const d = document.getElementById('Detalle_' + item.id);
      const r = document.getElementById('Resumen_' + item.id);
      const det = d['checked'];
      const res = r['checked'];
      const config = {
        detalle: det,
        resumen: res,
        idCampo: item.id,
        nombre: item.nombre,
        id: this.Requi
      }
      this.ListaCon.push(config);
    }

    this.Config.UpdatePublicar(this.ListaCon)
      .subscribe(data => {
        this.popGenerico(data.mensaje, data.bandera, 'Publicacion');
        this.spinner.hide();
      });
    this.ListaCon = [];
  }

  // public config: ToasterConfig =
  //      new ToasterConfig({
  //          showCloseButton: true,
  //          tapToDismiss: false,
  //          timeout: 0
  //      });

  Descripcion() {
    this.toasterService.pop('warning', 'Trabajando', 'Se cambio la forma de como guardar la configuracion');
  }

  SetDetalle(id: any, titulo: any, event: any) {
    console.log(id, titulo, event);
    // let e2 = document.getElementById('Detalle_' + id);
    // let algo = (<HTMLInputElement>e2).checked;
    // let e = document.getElementById('Detalle_' + id);
    // let bol = e['checked'];
    this.View(id, event, 'D');
    // this.Config.SetDetalle(this.Requi,id,bol)
    // .subscribe( data => {
    //  this.pop('', true, bol, titulo, 'Detalle');
    // });
  }

  SetResumen(id: any, titulo: any, event: any) {
    console.log(id, titulo, event);
    // const e = document.getElementById('Resumen_' + id);
    // this.bol = e['checked'];
    this.View(id, event, 'H');
    // this.Config.SetResumen(this.Requi,id,this.bol)
    // .subscribe( data => {
    //   this.Mensaje = data;
    //  this.pop('', true, this.bol, titulo, 'Resumen');
    // });
  }

  View(Id: any, view: boolean, tp: string) {
    debugger;
    if (tp === 'H') {
      switch (Id) {  // Vistas del header
        case 10:
          this.Vistas.Id10 = view;
          break;
        case 11:
          this.Vistas.Id11 = view;
          break;
        case 12:
          this.Vistas.Id12 = view;
          break;
        case 13:
          this.Vistas.Id13 = view;
          break;
        case 14:
          this.Vistas.Id14 = view;
          break;
        case 15:
          this.Vistas.Id15 = view;
          break;
        case 16:
          this.Vistas.Id16 = view;
          break;
        case 17:
          this.Vistas.Id17 = view;
          break;
        case 18:
          this.Vistas.Id18 = view;
          break;
        case 19:
          this.Vistas.Id19 = view;
          break;
        case 20:
          this.Vistas.Id20 = view;
          break;
        case 21:
          this.Vistas.Id21 = view;
          break;
        case 22:
          this.Vistas.Id22 = view;
          break;
        case 23:
          this.Vistas.Id23 = view;
          break;
        case 24:
          this.Vistas.Id24 = view;
          break;
        case 25:
          this.Vistas.Id25 = view;
          break;
        case 26:
          this.Vistas.Id26 = view;
          break;
        case 27:
          this.Vistas.Id27 = view;
          break;
        case 28:
          this.Vistas.Id28 = view;
          break;
        case 29:
          this.Vistas.Id29 = view;
          break;
        case 30:
          this.Vistas.Id30 = view;
          break;
        case 31:
          this.Vistas.Id31 = view;
          break;
        case 32:
          this.Vistas.Id32 = view;
          break;
        case 33:
          this.Vistas.Id33 = view;
          break;
        case 34:
          this.Vistas.Id34 = view;
          break;
        case 35:
          this.Vistas.Id35 = view;
          break;
        case 36:
          this.Vistas.Id36 = view;
          break;
        case 37:
          this.Vistas.Id37 = view;
          break;
        case 38:
          this.Vistas.Id38 = view;
          break;
        case 39:
          this.Vistas.Id39 = view;
          break;
        case 40:
          this.Vistas.Id40 = view;
          break;
        case 41:
          this.Vistas.Id41 = view;
          break;
        case 42:
          this.Vistas.Id42 = view;
          break;
        case 43:
          this.Vistas.Id43 = view;
          break;
        case 44:
          this.Vistas.Id44 = view;
          break;
        case 45:
          this.Vistas.Id45 = view;
          break;
        case 46:
          this.Vistas.Id46 = view;
          break;
        case 47:
          this.Vistas.Id47 = view;
          break;
        case 48:
          this.Vistas.Id48 = view;
          break;
        case 49:
          this.Vistas.Id49 = view;
          break;
        case 50:
          this.Vistas.Id50 = view;
          break;
        case 51:
          this.Vistas.Id51 = view;
          break;
        case 52:
          this.Vistas.Id52 = view;
          break;
        case 53:
          this.Vistas.Id53 = view;
          break;
        case 54:
          this.Vistas.Id54 = view;
          break;
        case 55:
          this.Vistas.Id55 = view;
          break;
        case 56:
          this.Vistas.Id56 = view;
          break;
        case 57:
          this.Vistas.Id57 = view;
          break;
        case 58:
          this.Vistas.Id58 = view;
          break;
        case 59:
          this.Vistas.Id59 = view;
          break;
        case 60:
          this.Vistas.Id60 = view;
          break;
        case 61:
          this.Vistas.Id61 = view;
          break;
        case 62:
          this.Vistas.Id62 = view;
          break;
        case 63:
          this.Vistas.Id63 = view;
          break;
        case 64:
          this.Vistas.Id64 = view;
          break;
        case 65:
          this.Vistas.Id65 = view;
          break;
        case 66:
          this.Vistas.Id66 = view;
          break;
        case 67:
          this.Vistas.Id67 = view;
          break;
        case 68:
          this.Vistas.Id68 = view;
          break;
        case 69:
          this.Vistas.Id69 = view;
          break;
        case 70:
          this.Vistas.Id70 = view;
          break;
        case 71:
          this.Vistas.Id71 = view;
          break;
        case 72:
          this.Vistas.Id72 = view;
          break;
        case 73:
          this.Vistas.Id73 = view;
          break;
        case 74:
          this.Vistas.Id74 = view;
          break;
        case 75:
          this.Vistas.Id75 = view;
          break;
        case 76:
          this.Vistas.Id76 = view;
          break;
        case 77:
          this.Vistas.Id77 = view;
          break;
        case 78:
          this.Vistas.Id78 = view;
          break;
        case 79:
          this.Vistas.Id79 = view;
          break;
        case 80:
          this.Vistas.Id80 = view;
          break;
        case 81:
          this.Vistas.Id81 = view;
          break;
        case 82:
          this.Vistas.Id82 = view;
          break;
        case 83:
          this.Vistas.Id83 = view;
          break;
        case 84:
          this.Vistas.Id84 = view;
          break;
        case 85:
          this.Vistas.Id85 = view;
          break;
        case 86:
          this.Vistas.Id86 = view;
          break;
        case 87:
          this.Vistas.Id87 = view;
          break;
        case 88:
          this.Vistas.Id88 = view;
          break;
        case 89:
          this.Vistas.Id89 = view;
          break;
        case 90:
          this.Vistas.Id90 = view;
          break;
        case 91:
          this.Vistas.Id91 = view;
          break;
        case 92:
          this.Vistas.Id92 = view;
          break;
        case 93:
          this.Vistas.Id93 = view;
          break;
        case 94:
          this.Vistas.Id94 = view;
          break;
        case 95:
          this.Vistas.Id95 = view;
          break;
        case 96:
          this.Vistas.Id96 = view;
          break;
        case 97:
          this.Vistas.Id97 = view;
          break;
        case 98:
          this.Vistas.Id98 = view;
          break;
        case 99:
          this.Vistas.Id99 = view;
          break;
        case 100:
          this.Vistas.Id100 = view;
          break;
        case 101:
          this.Vistas.Id101 = view;
          break;
        case 102:
          this.Vistas.Id102 = view;
          break;
        case 103:
          this.Vistas.Id103 = view;
          break;
        case 105:
          this.Vistas.Id105 = view;
          break;
        case 106:
          this.Vistas.Id106 = view;
          break;
        case 108:
          this.Vistas.Id108 = view;
          break;
        case 109:
          this.Vistas.Id109 = view;
          break;
        case 111:
          this.Vistas.Id111 = view;
          break;
        case 112:
          this.Vistas.Id112 = view;
          break;
        case 114:
          this.Vistas.Id114 = view;
          break;
        case 115:
          this.Vistas.Id115 = view;
          break;
        case 116:
          this.Vistas.Id116 = view;
          break;
        case 136:
          this.Vistas.Id136 = view;
          break;
        case 242:
          this.Vistas.Id242 = view;
          break;
        case 244:
          this.Vistas.Id244 = view;
          break;
        case 245:
          this.Vistas.Id245 = view;
          break;
        default:
          break;
      }
    } else {
      switch (Id) {  // Vistas del detalle
        case 10:
          this.Vistasdtl.Idd10 = view;
          break;
        case 11:
          this.Vistasdtl.Idd11 = view;
          break;
        case 12:
          this.Vistasdtl.Idd12 = view;
          break;
        case 13:
          this.Vistasdtl.Idd13 = view;
          break;
        case 14:
          this.Vistasdtl.Idd14 = view;
          break;
        case 15:
          this.Vistasdtl.Idd15 = view;
          break;
        case 16:
          this.Vistasdtl.Idd16 = view;
          break;
        case 17:
          this.Vistasdtl.Idd17 = view;
          break;
        case 18:
          this.Vistasdtl.Idd18 = view;
          break;
        case 19:
          this.Vistasdtl.Idd19 = view;
          break;
        case 20:
          this.Vistasdtl.Idd20 = view;
          break;
        case 21:
          this.Vistasdtl.Idd21 = view;
          break;
        case 22:
          this.Vistasdtl.Idd22 = view;
          break;
        case 23:
          this.Vistasdtl.Idd23 = view;
          break;
        case 24:
          this.Vistasdtl.Idd24 = view;
          break;
        case 25:
          this.Vistasdtl.Idd25 = view;
          break;
        case 26:
          this.Vistasdtl.Idd26 = view;
          break;
        case 27:
          this.Vistasdtl.Idd27 = view;
          break;
        case 28:
          this.Vistasdtl.Idd28 = view;
          break;
        case 29:
          this.Vistasdtl.Idd29 = view;
          break;
        case 30:
          this.Vistasdtl.Idd30 = view;
          break;
        case 31:
          this.Vistasdtl.Idd31 = view;
          break;
        case 32:
          this.Vistasdtl.Idd32 = view;
          break;
        case 33:
          this.Vistasdtl.Idd33 = view;
          break;
        case 34:
          this.Vistasdtl.Idd34 = view;
          break;
        case 35:
          this.Vistasdtl.Idd35 = view;
          break;
        case 36:
          this.Vistasdtl.Idd36 = view;
          break;
        case 37:
          this.Vistasdtl.Idd37 = view;
          break;
        case 38:
          this.Vistasdtl.Idd38 = view;
          break;
        case 39:
          this.Vistasdtl.Idd39 = view;
          break;
        case 40:
          this.Vistasdtl.Idd40 = view;
          break;
        case 41:
          this.Vistasdtl.Idd41 = view;
          break;
        case 42:
          this.Vistasdtl.Idd42 = view;
          break;
        case 43:
          this.Vistasdtl.Idd43 = view;
          break;
        case 44:
          this.Vistasdtl.Idd44 = view;
          break;
        case 45:
          this.Vistasdtl.Idd45 = view;
          break;
        case 46:
          this.Vistasdtl.Idd46 = view;
          break;
        case 47:
          this.Vistasdtl.Idd47 = view;
          break;
        case 48:
          this.Vistasdtl.Idd48 = view;
          break;
        case 49:
          this.Vistasdtl.Idd49 = view;
          break;
        case 50:
          this.Vistasdtl.Idd50 = view;
          break;
        case 51:
          this.Vistasdtl.Idd51 = view;
          break;
        case 52:
          this.Vistasdtl.Idd52 = view;
          break;
        case 53:
          this.Vistasdtl.Idd53 = view;
          break;
        case 54:
          this.Vistasdtl.Idd54 = view;
          break;
        case 55:
          this.Vistasdtl.Idd55 = view;
          break;
        case 56:
          this.Vistasdtl.Idd56 = view;
          break;
        case 57:
          this.Vistasdtl.Idd57 = view;
          break;
        case 58:
          this.Vistasdtl.Idd58 = view;
          break;
        case 59:
          this.Vistasdtl.Idd59 = view;
          break;
        case 60:
          this.Vistasdtl.Idd60 = view;
          break;
        case 61:
          this.Vistasdtl.Idd61 = view;
          break;
        case 62:
          this.Vistasdtl.Idd62 = view;
          break;
        case 63:
          this.Vistasdtl.Idd63 = view;
          break;
        case 64:
          this.Vistasdtl.Idd64 = view;
          break;
        case 65:
          this.Vistasdtl.Idd65 = view;
          break;
        case 66:
          this.Vistasdtl.Idd66 = view;
          break;
        case 67:
          this.Vistasdtl.Idd67 = view;
          break;
        case 68:
          this.Vistasdtl.Idd68 = view;
          break;
        case 69:
          this.Vistasdtl.Idd69 = view;
          break;
        case 70:
          this.Vistasdtl.Idd70 = view;
          break;
        case 71:
          this.Vistasdtl.Idd71 = view;
          break;
        case 72:
          this.Vistasdtl.Idd72 = view;
          break;
        case 73:
          this.Vistasdtl.Idd73 = view;
          break;
        case 74:
          this.Vistasdtl.Idd74 = view;
          break;
        case 75:
          this.Vistasdtl.Idd75 = view;
          break;
        case 76:
          this.Vistasdtl.Idd76 = view;
          break;
        case 77:
          this.Vistasdtl.Idd77 = view;
          break;
        case 78:
          this.Vistasdtl.Idd78 = view;
          break;
        case 79:
          this.Vistasdtl.Idd79 = view;
          break;
        case 80:
          this.Vistasdtl.Idd80 = view;
          break;
        case 81:
          this.Vistasdtl.Idd81 = view;
          break;
        case 82:
          this.Vistasdtl.Idd82 = view;
          break;
        case 83:
          this.Vistasdtl.Idd83 = view;
          break;
        case 84:
          this.Vistasdtl.Idd84 = view;
          break;
        case 85:
          this.Vistasdtl.Idd85 = view;
          break;
        case 86:
          this.Vistasdtl.Idd86 = view;
          break;
        case 87:
          this.Vistasdtl.Idd87 = view;
          break;
        case 88:
          this.Vistasdtl.Idd88 = view;
          break;
        case 89:
          this.Vistasdtl.Idd89 = view;
          break;
        case 90:
          this.Vistasdtl.Idd90 = view;
          break;
        case 91:
          this.Vistasdtl.Idd91 = view;
          break;
        case 92:
          this.Vistasdtl.Idd92 = view;
          break;
        case 93:
          this.Vistasdtl.Idd93 = view;
          break;
        case 94:
          this.Vistasdtl.Idd94 = view;
          break;
        case 95:
          this.Vistasdtl.Idd95 = view;
          break;
        case 96:
          this.Vistasdtl.Idd96 = view;
          break;
        case 97:
          this.Vistasdtl.Idd97 = view;
          break;
        case 98:
          this.Vistasdtl.Idd98 = view;
          break;
        case 99:
          this.Vistasdtl.Idd99 = view;
          break;
        case 100:
          this.Vistasdtl.Idd100 = view;
          break;
        case 101:
          this.Vistasdtl.Idd101 = view;
          break;
        case 102:
          this.Vistasdtl.Idd102 = view;
          break;
        case 103:
          this.Vistasdtl.Idd103 = view;
          break;
        case 105:
          this.Vistasdtl.Idd105 = view;
          break;
        case 106:
          this.Vistasdtl.Idd106 = view;
          break;
        case 108:
          this.Vistasdtl.Idd108 = view;
          break;
        case 109:
          this.Vistasdtl.Idd109 = view;
          break;
        case 111:
          this.Vistasdtl.Idd111 = view;
          break;
        case 112:
          this.Vistasdtl.Idd112 = view;
          break;
        case 114:
          this.Vistasdtl.Idd114 = view;
          break;
        case 115:
          this.Vistasdtl.Idd115 = view;
          break;
        case 116:
          this.Vistasdtl.Idd116 = view;
          break;
        case 136:
          this.Vistasdtl.Idd136 = view;
          break;
        case 242:
          this.Vistasdtl.Idd242 = view;
          break;
        case 244:
          this.Vistasdtl.Idd244 = view;
          break;
        case 245:
          this.Vistasdtl.Idd245 = view;
          break;
        default:
          break;
      }
    }
  }

  popGenerico(mensaje: string, bandera: boolean, titulo: string) {
    var type = 'success';
    if (bandera == false) {
      type = 'error';
      mensaje = 'Ocurrio algo inesperado intentelo mas tarde';

    }
    this.toasterService.pop(type, titulo, mensaje);
  }

  pop(mensaje: string, bandera: boolean, tipo: boolean, titulo: string, area: string) {
    var type = 'success';
    mensaje = 'Se mostrara en  ' + area;
    if (tipo == false) {
      type = 'info';
      mensaje = 'No se mostrara en ' + area;
    }
    if (bandera == false) {
      type = 'error';
      mensaje = 'Ocurrio algo inesperado intentelo mas tarde';
    }
    this.toasterService.pop(type, titulo, mensaje);
  }

  LlamarVacante() {
    this.router.navigate(['/reclutamiento/vacantes']);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setStepD(index: number) {
    console.log(index);
    this.stepd = index;
  }

  nextStepD() {
    this.stepd++;
  }

  prevStepD() {
    this.stepd--;
  }

  PrevResumen() {
    this.spinner.show();
    for (let item of this.ListaCampo) {
      let d = document.getElementById('Detalle_' + item.id);
      let r = document.getElementById('Resumen_' + item.id);
      let det = d['checked'];
      let res = r['checked'];
      let config = {
        detalle: det,
        resumen: res,
        idCampo: item.id,
        nombre: item.nombre,
        id: this.Requi
      }
      this.ListaCon.push(config);
    }

    this.Config.GuardarPublicacion(this.ListaCon)
      .subscribe(data => {
        this.spinner.hide();
        window.open(this.UrlBolsa + '/Home/Previsualizacion?RequiID=' + this.Requi + '&tipo=1', '_blank');
      });
    this.ListaCon = [];
  }

  PrevDetalle() {
    this.spinner.show();
    for (let item of this.ListaCampo) {
      let d = document.getElementById('Detalle_' + item.id);
      let r = document.getElementById('Resumen_' + item.id);
      let det = d['checked'];
      let res = r['checked'];
      let config = {
        detalle: det,
        resumen: res,
        idCampo: item.id,
        nombre: item.nombre,
        id: this.Requi
      }
      this.ListaCon.push(config);
    }

    this.Config.GuardarPublicacion(this.ListaCon)
      .subscribe(data => {
        this.spinner.hide();
        window.open(this.UrlBolsa + '/Home/Previsulizacion?RequiID=' + this.Requi, '_blank');
      });
    this.ListaCon = [];

  }
}
