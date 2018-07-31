import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'btn-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss']
})
export class ButtonAddComponent implements OnInit {
  @Input('text') text: string;
  constructor() { }

  ngOnInit() {
  }

}
