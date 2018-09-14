import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'btn-like',
  templateUrl: './button-like.component.html',
  styleUrls: ['./button-like.component.scss']
})
export class ButtonLikeComponent implements OnInit {
  @Input('VacanteId') vacantesId : string;
  @Input('Status') Status: any;
  @Input('RequisicionId') requisicionId: string;
  @Input('Reclutador') Reclutador: string;
  Usuario : any;
  

  constructor() {
    this.Usuario = sessionStorage.getItem('nombre');
    this.Reclutador == null ? '' : this.Reclutador
    console.log("Like", this.vacantesId,this.Status, this.requisicionId, this.Reclutador)
   }

  ngOnInit() {
  }

}
