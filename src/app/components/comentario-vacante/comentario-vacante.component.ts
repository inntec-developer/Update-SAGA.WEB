import { Component, ElementRef, Input, OnInit, SimpleChanges, AfterViewInit, OnChanges, Inject } from '@angular/core';
import { ApiConection } from './../../service/api-conection.service';
import { ComentariosService } from '../../service/Comentarios/comentarios.service';
import { SettingsService } from '../../core/settings/settings.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
const Swal = require('sweetalert2');
declare var $: any;

@Component({
  selector: 'comentario-vacante',
  templateUrl: './comentario-vacante.component.html',
  styleUrls: ['./comentario-vacante.component.scss'],
  providers: [ComentariosService]
})
export class ComentarioVacanteComponent implements OnInit, AfterViewInit, OnChanges {
  @Input('RequisicionId') RequisicionId: string;
  @Input('EstatusId') EstatusId: string;
  @Input('MotivoId') MotivoId;
  public Comentarios: any;
  public Comentario: any = {};
  public CountComent: any;
  public comentario: any = '';

  // scroll
  disabled = false;
  compact = false;
  invertX = false;
  invertY = false;
  shown = 'shown';
  loading = false;
  editing = {};
  constructor(
    private settings: SettingsService,
    private _ComentariosService: ComentariosService,
    public elem: ElementRef,
    private dialog: MatDialogRef<ComentarioVacanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.RequisicionId = this.data.id;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.RequisicionId) {
      this.getComentarios(this.RequisicionId);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.RequisicionId && !changes.RequisicionId.isFirstChange()) {
      this.getComentarios(this.RequisicionId);
    }
    // const scroll = this.elem.nativeElement.querySelector('.container-coments');
    // if (scroll.scrollTop !== 0) {
    //   const scrollHeight = scroll.scrollHeight;
    //   scroll.scrollTop = scrollHeight;
    // } else {
    //   scroll.scrollTop = 1000000000;
    // }
  }

  getComentarios(Id): void {
    this._ComentariosService.getComentariosVacante(Id).subscribe(data => {
      this.Comentarios = data;
      this.CountComent = this.Comentarios.length;
      this.Comentarios.forEach(element => {
        element.foto = ApiConection.ServiceUrlFotoUser + element.clave + '.jpg';
      });
    }, err => {
      console.log(err);
    });
    // setTimeout(() => {
    //     const scroll = this.elem.nativeElement.querySelector('.container-coments');
    //     if (scroll.scrollTop !== 0){
    //       const scrollHeight = scroll.scrollHeight;
    //       scroll.scrollTop = scrollHeight;
    //     } else {
    //       scroll.scrollTop = 1000000000;
    //     }
    //   }, 1000);
  }

  addComentario() {
    if (this.comentario != null) {
      this.loading = true;
      this.Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.RequisicionId,
        UsuarioAlta: this.settings.user['usuario'],
        reclutadorId: this.settings.user['id'],
        MotivoId: this.data.motivoId,
        EstatusId: 0
      };
      this._ComentariosService.addComentarioVacante(this.Comentario).subscribe(data => {
        if (data === 200) {
          this.loading = false;
          this.getComentarios(this.RequisicionId);
          this.comentario = '';
          this.elem.nativeElement.querySelector('textarea').focus();
        } else {
          this.loading = false;
        }
      }, err => {
        this.loading = false;
      });
    }
  }
  editarComent(comentario, id, rowIndex) {
    Swal.fire({
      title: 'MODIFICANDO COMENTARIO ...',
      text: 'El proceso puede durar varios segundos por favor espere',
      type: 'warning',
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
        Swal.showLoading();
        this.Comentario = {
          Id: id,
          RequisicionId: this.RequisicionId,
          UsuarioAlta: this.settings.user['usuario'],
          reclutadorId: this.settings.user['id'],
          Comentario: comentario
        };
        this._ComentariosService.UpdateComentarioVacante(this.Comentario).subscribe(data => {
          if (data === 200) {
            Swal.hideLoading();
            this.Comentarios[rowIndex]['comentario'] = comentario;
            this.editing[rowIndex + '-coment'] = false;
            Swal.close();
          } else {
            Swal.hideLoading();
            Swal.fire(
              'MODIFICAR',
              'Ocurrio un error por favor intentelo de nuevo o notifique al administrador',
              'error'
            );
          }
        });
      }
    });
  }
  borrarComent(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿ESTAS SEGURO?',
      text: 'El comentario se borrará de la base de datos',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡SI BORRAR!',
      cancelButtonText: 'NO, CANCELAR!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'ELIMINANDO COMENTARIO ...',
          text: 'El proceso puede durar varios segundos por favor espere',
          type: 'warning',
          allowEscapeKey: false,
          allowEnterKey: false,
          onOpen: () => {
            Swal.showLoading();
            this.Comentario = {
              Id: id,
              RequisicionId: this.RequisicionId,
              UsuarioAlta: this.settings.user['usuario'],
              reclutadorId: this.settings.user['id'],
            };
            this._ComentariosService.DeleteComentarioVacante(this.Comentario).subscribe(data => {
              if (data === 200) {
                Swal.hideLoading();
                swalWithBootstrapButtons.fire(
                  'BORRAR',
                  'El comentario se borró correctamente',
                  'success'
                );
                this.getComentarios(this.RequisicionId);
                this.comentario = '';
              } else {
                Swal.hideLoading();
                Swal.fire(
                  'BORRAR',
                  'Ocurrio un error por favor intentelo de nuevo o notifique al administrador',
                  'error'
                );
              }
            }, err => {
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'CANCELADO',
          'NO SE REALIZÓ NINGUN CAMBIO',
          'error'
        );
      }
    })
  }
  onCloseDialog() {
    this.dialog.close(0);
  }
  ErrorImg(clave: any, comentario: any) {
    const index = this.Comentarios.findIndex(c => c.clave === clave && c.comentario === comentario);
    this.Comentarios[index]['foto'] = '/assets/img/user/default.jpg';
  }

}
