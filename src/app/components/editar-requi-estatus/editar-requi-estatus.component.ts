
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { RequisicionesService } from './../../service/requisiciones/requisiciones.service';
import { Component, OnInit, Input } from '@angular/core';
import { PostulateService } from '../../service/SeguimientoVacante/postulate.service';
import { Toast, ToasterConfig, ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-editar-requi-estatus',
  templateUrl: './editar-requi-estatus.component.html',
  styleUrls: ['./editar-requi-estatus.component.scss']
})
export class EditarRequiEstatusComponent implements OnInit {

  @Input('estatusId') estatusId;
  @Input('usuarioId') usuarioId;

  requis: any = [];
  editing = {};
  comentario: string = "";
  loading = false;
  constructor(private service: RequisicionesService, private comentarioService: ComentariosService, private postulateService: PostulateService, private toasterService: ToasterService ) { }

  ngOnInit() {
    this.GetRequisiciones();
  }

  GetRequisiciones()
  {
    this.service.GetRequisicionesEstatus(this.estatusId, this.usuarioId).subscribe( result =>{

      this.requis = result;
      // this.requis.forEach(element => {
      //   element.activar = false;
      // });
  
    })
  }

  onSelect(row, rowIndex)
  {
   
      row.selected ? row.selected = false : row.selected = true;
  
  }

  updateValue(event, cell, rowIndex) 
  {

    var aux;
    if(event.target.value !== '')
    {
      aux = this.requis[rowIndex]['comentarioReclutador'];
      aux.respuesta = event.target.value;
      this.requis[rowIndex]['comentarioReclutador'] = aux;
      this.comentario = event.target.value;
      this.requis[rowIndex]['activar'] = true;
    }

    this.editing[rowIndex + '-' + cell] = false;
    this.requis = [...this.requis];
  }

   //estatus vacantes
   SetStatus(row, rowIndex) {
    this.loading = true;

    var estatusId = 29;
    var estatus = "BUSQUEDA DE CANDIDATOS"
    if(row.enProceso > 0)
    {
      if(row.enProcesoFC > 0 || row.contratados > 0)
      {
        estatusId = 33;
        estatus = "EN ESPERA DE CONTRATACIÓN";
      }
      else if(row.enProcesoEC > 0)
      {
        estatusId = 30;
        estatus = "ENVÍO AL CLIENTE"
      }
      else
      {
        estatusId = 29;
      }
    }

    var datos = { estatusId: estatusId, requisicionId: row.id };

    this.postulateService.SetProcesoVacante(datos).subscribe(data => {
        if (data == 201) {
          
          this.requis[rowIndex]['estatus'] = estatus;
          this.requis[rowIndex]['estatusId'] = estatusId;
        this.loading = false;
          this.popToast('success', 'Estatus', 'Los datos se actualizaron con éxito');

        }
        else {
          this.loading = false;
          this.popToast('error', 'Estatus', 'Ocurrió un error al intentar actualizar los datos');
        }
      })
    }
  

  AddComentario(row, rowIndex)
  {
    let Comentario = {
        Comentario: this.comentario,
        RequisicionId: row.id,
        MotivoId: 7,
        UsuarioAlta: sessionStorage.getItem('usuario'),
        ReclutadorId: sessionStorage.getItem('id'), 
        RespuestaId: row.comentarioReclutador.id
      }
      this.comentarioService.addComentarioVacante(Comentario).subscribe(data => {
        if (data == 200) {
          this.comentario = '';
          

          this.SetStatus(row, rowIndex)

          row.activar = false;
   
        }
      }, err => {
      
        console.log(err);
      });
    }

        
/**
   * configuracion para mensajes de acciones.
   */
  toaster: any;
  toasterConfig: any;
  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true,
    preventDuplicates: true,
  });

  popToast(type, title, body) {
    var toast: Toast = {
      type: type,
      title: title,
      timeout: 4000,
      body: body
    }
    this.toasterService.pop(toast);

  }
}
