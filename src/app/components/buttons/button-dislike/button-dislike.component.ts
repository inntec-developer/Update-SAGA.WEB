import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'btn-dislike',
  templateUrl: './button-dislike.component.html',
  styleUrls: ['./button-dislike.component.scss']
})
export class ButtonDislikeComponent implements OnInit {
  @Input('VacanteId') vacantesId : string;
  @Input('Status') Status: any;;
  @Input('RequisicionId') requisicionId: string;
  @Input('Reclutador') Reclutador: string;
  Usuario : any;
  

  constructor() {
    this.Usuario = localStorage.getItem('nombre');
    console.log("Dis-Like", this.vacantesId,this.Status, this.requisicionId, this.Reclutador)
   }

  ngOnInit() {
  }

}
