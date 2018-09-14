import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { ApiConection } from '../../service';
import { ComentariosService } from './../../service/Comentarios/comentarios.service';

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
    private _ComentariosService: ComentariosService
  ) { 
    
    
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
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
      console.log(this.Comentarios);
    }, err => {
      console.log(err)
    })
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

  }
}

