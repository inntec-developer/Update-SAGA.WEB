import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-return',
  templateUrl: './button-return.component.html',
  styleUrls: ['./button-return.component.scss']
})
export class ButtonReturnComponent implements OnInit {
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
