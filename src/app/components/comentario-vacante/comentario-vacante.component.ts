import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';

import { ApiConection } from './../../service/api-conection.service';
import { ComentariosService } from '../../service/Comentarios/comentarios.service';
import { forEach } from '@angular/router/src/utils/collection';

declare var $: any;

@Component({
  selector: 'comentario-vacante',
  templateUrl: './comentario-vacante.component.html',
  styleUrls: ['./comentario-vacante.component.scss'],
  providers: [ComentariosService]
})
export class ComentarioVacanteComponent implements OnInit {
  @Input('RequisicionId') RequisicionId: string;
  @Input('EstatusId') EstatusId: string;

  private Comentarios: any;
  private Comentario: any = {};
  private CountComent: any;
  private comentario: any;

  constructor(
    private _ComentariosService: ComentariosService,
    public elem: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.RequisicionId = 'CC9A3F79-C9B5-E811-80E9-9E274155325E'
    if(!this.RequisicionId){
      console.log('Sin referencia de requisición.')
    }else{
      this.getComentarios(this.RequisicionId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.RequisicionId && !changes.RequisicionId.isFirstChange()) {
      this.getComentarios(this.RequisicionId);
    }
    let scroll = this.elem.nativeElement.querySelector('.container-coments');
    if(scroll.scrollTop != 0){
      let scrollHeight = scroll.scrollHeight;
      scroll.scrollTop = scrollHeight;
    }else{
      scroll.scrollTop = 1000000000;
    }
  }

  getComentarios(Id): void {
    this._ComentariosService.getComentariosVacante(Id).subscribe(data => {
      this.Comentarios = data;
      this.CountComent = this.Comentarios.length;
      this.Comentarios.forEach(element => {
        element.foto = ApiConection.ServiceUrlFoto + element.foto;
      });
      
    }, err => {
      console.log(err)
    });
    setTimeout(() => {
        let scroll = this.elem.nativeElement.querySelector('.container-coments');
        if(scroll.scrollTop != 0){
          let scrollHeight = scroll.scrollHeight;
          scroll.scrollTop = scrollHeight;
        }else{
          scroll.scrollTop = 1000000000;
        }
      }, 1000);
  }

  addComentario(RequisicionId: string) {
    if (this.comentario != null) {
      this.Comentario = {
        Comentario: this.comentario,
        RequisicionId: this.RequisicionId,
        UsuarioAlta: sessionStorage.getItem('usuario'),
        reclutadorId: sessionStorage.getItem('id')
      }
      this._ComentariosService.addComentarioVacante(this.Comentario).subscribe(data => {
        if (data === 200) {
          this.getComentarios(this.RequisicionId);
          this.comentario = '';
          this.elem.nativeElement.querySelector('textarea').focus();
        }
      }, err => {
        console.log(err);
      });
      setTimeout(() => {
        let scroll = this.elem.nativeElement.querySelector('.container-coments');
        if(scroll.scrolltop != 0){
          let scrollHeight = scroll.scrollHeight;
          scroll.scrollTop = scrollHeight;
        }else{
          scroll.scrollTop = 1000000000;
        }
      }, 1000);

    }
  }

}
