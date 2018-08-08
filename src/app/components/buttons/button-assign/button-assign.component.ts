import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-assign',
  templateUrl: './button-assign.component.html',
  styleUrls: ['./button-assign.component.scss']
})
export class ButtonAssignComponent implements OnInit {
  @Input('xs') xs: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
