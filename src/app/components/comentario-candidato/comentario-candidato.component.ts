import { Component, Input, OnInit } from '@angular/core';

import { ComentariosService } from './../../service/Comentarios/comentarios.service';
import { providers } from 'ng2-dnd';

@Component({
  selector: 'app-comentario-candidato',
  templateUrl: './comentario-candidato.component.html',
  styleUrls: ['./comentario-candidato.component.scss'],
  providers: [ComentariosService]
})
export class ComentarioCandidatoComponent implements OnInit {
  @Input('CandidatoId') CandidatoId: any;
  @Input('RequisicionId') RequisicionId: any;

  private Comentarios: any;
  private Comentario: any = {};
  private comentario: any;

  constructor(
    private _ComentariosService: ComentariosService
  ) { 
    this.CandidatoId = '4F65DAC1-C6A0-E811-80E8-9E274155325E'
    
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.getComentarios(this.CandidatoId);
  }

  getComentarios(Id): void {
    this._ComentariosService.getComentariosCandidato(Id).subscribe(data => {
      this.Comentarios = data;
      console.log(this.Comentarios);
    }, err => {
      console.log(err)
    })
  }

  addComentario() {
    if (this.comentario != null) {
      this.Comentario = {
        Comentario: this.comentario,
        CandidatoId: this.CandidatoId,
        RequisicionId: this.RequisicionId,
        Usuario: localStorage.getItem('usuario'),
        UsuarioId: localStorage.getItem('id')
      }
      this._ComentariosService.addComentarioCandidato(this.Comentario).subscribe(data => {
        if (data == 200) {
          this.getComentarios(this.CandidatoId);
        }
      }, err => {
        console.log(err);
      });
    }

  }
}

