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

  constructor() { }

  ngOnInit() {
  }

}
