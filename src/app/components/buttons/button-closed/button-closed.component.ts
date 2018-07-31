import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'btn-closed',
  templateUrl: './button-closed.component.html',
  styleUrls: ['./button-closed.component.scss']
})
export class ButtonClosedComponent implements OnInit {
  @Input('text') text : string;
  constructor() { }

  ngOnInit() {
  }

}
