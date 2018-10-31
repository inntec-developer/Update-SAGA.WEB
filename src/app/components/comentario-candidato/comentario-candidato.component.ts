import { Component, ElementRef, Input, OnInit, SimpleChanges, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiConection } from '../../service';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';


declare var $: any;

@Component({
  selector: 'app-comentario-candidato',
  templateUrl: './comentario-candidato.component.html',
  styleUrls: ['./comentario-candidato.component.scss'],
  providers: [ComentariosService]
})
export class ComentarioCandidatoComponent implements OnInit {
  @Input('CandidatoId') CandidatoId: any;
  @Input('RequisicionId') RequisicionId: any;
  @Input('ProcesoCandidatoId') ProcesocandidatoId: any;

  private Comentarios: any;
  private Comentario: any = {};
  private comentario: any;
  CountComent: any;

  constructor(
    private _ComentariosService: ComentariosService,
    public elem: ElementRef,
    // @Inject(MAT_DIALOG_DATA) public dataNR: any, 
  ) { 
    
    
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
  //   console.log(this.dataNR)
  //   this.CandidatoId = this.dataNR.CandidatoId;
  //  this.RequisicionId = this.dataNR.requisicionId

    this.getComentarios(this.CandidatoId);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes.CandidatoId && !changes.CandidatoId.isFirstChange()) {
      this.getComentarios(this.CandidatoId);
    }
  }

  getComentarios(Id): void {
    this._ComentariosService.getComentariosCandidato(Id).subscribe(data => {
      this.Comentarios = data;
      this.CountComent = this.Comentarios.length;
      this.Comentarios.forEach(element => {
        element.usuario.foto = ApiConection.ServiceUrlFoto + element.usuario.foto;
      });
    }, err => {
      console.log(err)
    });
    setTimeout(() => {
      let scroll = this.elem.nativeElement.querySelector('.container-coments');
      scroll.scrollTop = scroll.scrollHeight*50;
    }, 500);
  }

  addComentario() {
    if (this.comentario != null) {
      if(this.ProcesocandidatoId === 27 || this.ProcesocandidatoId === 0){
        this.RequisicionId = null;
      }
      this.Comentario = {
        Comentario: this.comentario,
        CandidatoId: this.CandidatoId,
        RequisicionId: this.RequisicionId,
        Usuario: sessionStorage.getItem('usuario'),
        UsuarioId: sessionStorage.getItem('id')
      }
      this._ComentariosService.addComentarioCandidato(this.Comentario).subscribe(data => {
        if (data == 200) {
          this.getComentarios(this.CandidatoId);
          this.comentario = '';
        }
      }, err => {
        console.log(err);
      });
    }
    // setTimeout(() => {
    //   let scroll = this.elem.nativeElement.querySelector('.container-coments');
    //   scroll.scrollTop = scroll.scrollHeight*50;
    // }, 100);

  }
}

