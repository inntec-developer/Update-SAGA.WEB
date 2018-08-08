import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-design',
  templateUrl: './button-design.component.html',
  styleUrls: ['./button-design.component.scss']
})
export class ButtonDesignComponent implements OnInit {

  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
