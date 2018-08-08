import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-print',
  templateUrl: './button-print.component.html',
  styleUrls: ['./button-print.component.scss']
})
export class ButtonPrintComponent implements OnInit {

  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
