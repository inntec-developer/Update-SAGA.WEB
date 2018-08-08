import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-desing-recl',
  templateUrl: './button-desing-recl.component.html',
  styleUrls: ['./button-desing-recl.component.scss']
})
export class ButtonDesingReclComponent implements OnInit {
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
