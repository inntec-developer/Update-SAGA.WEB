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
  
  constructor() { }

  ngOnInit() {
  }

}
