import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'btn-accept',
  templateUrl: './button-accept.component.html',
  styleUrls: ['./button-accept.component.scss']
})
export class ButtonAcceptComponent implements OnInit {
  @Input('text') text : string;
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
