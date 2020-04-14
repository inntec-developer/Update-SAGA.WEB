import { AdminServiceService } from './../../../../../service/AdminServicios/admin-service.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { CatalogosService, RequisicionesService, ApiConection } from '../../../../../service/index';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComentariosService } from '../../../../../service/Comentarios/comentarios.service';

@Component({
  selector: 'app-view-cuerpo-requi',
  templateUrl: './view-cuerpo-requi.component.html',
  styleUrls: ['./view-cuerpo-requi.component.scss'],
  providers: [RequisicionesService, CatalogosService, AdminServiceService]
})
export class ViewCuerpoRequiComponent implements OnInit, OnChanges, AfterViewInit {
  @Input('Requisicion') Requisicion: string;
  @Input('ShowRequi') ShowRequi: boolean;
  @Input('CreateRequi') CreateRequi: boolean;

    // scroll
    disabled = false;
    compact = false;
    invertX = false;
    invertY = false;
    shown = 'shown';
    loading = false;

  public requisicion: any;
  public checked = false;
  public EstatusRequi: any;
  arte: string;
  bg = '';
  principal = true;
  estudios = true;
  directorio = true;
  actividades = true;
  documentos = true;
  psicometrias = true;
  competencias = true;
  verArte = true;
  verComent = true;
  Comentarios: any = [];
  constructor(
    private serviceRequisiciones: RequisicionesService,
    private spinner: NgxSpinnerService,
    private _service: AdminServiceService,
    private _ComentariosService: ComentariosService
  ) { }

  ngOnInit() {
    if (this.Requisicion) {
    this.GetDataRequi();
    }
  }

  ngAfterViewInit(): void {
    // if (this.Requisicion) {
    //   this.GetDataRequi();
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Requisicion && !changes.Requisicion.isFirstChange()) {
      this.GetDataRequi();
    }
  }

  GetDataRequi() {
    this.loading = true;
    this.serviceRequisiciones.getNewRequi(this.Requisicion)
      .subscribe(data => {
        this.spinner.hide();
        this.requisicion = data;
        const aux = data['arte'];
        let id = aux.lastIndexOf('/');
        const nom = aux.substr(id + 1, aux.length);
        id = nom.lastIndexOf('.');
        let type = nom.substr(id + 1, nom.length);
        type = type.replace('.', '');
        this._service.GetBG('ArteRequi/BG/' + nom).subscribe(r => {
          this.arte = 'data:image/' + type + ';base64,' + r;
        });
        this.EstatusRequi = data.estatusId;
        this.getComentarios(this.Requisicion);
      });
  }
  getComentarios(Id): void {
    this._ComentariosService.getComentariosVacante(Id).subscribe(data => {
      this.Comentarios = data;
      this.Comentarios.forEach(element => {
        element.foto = ApiConection.ServiceUrlFotoUser + element.clave + '.jpg';
      });
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

  ErrorImg(clave: any, comentario: any) {
    const index = this.Comentarios.findIndex(c => c.clave === clave && c.comentario === comentario);
    this.Comentarios[index]['foto'] = '/assets/img/user/default.jpg';
  }

}
