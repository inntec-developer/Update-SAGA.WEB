import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.scss']
})
export class ButtonEditComponent implements OnInit {
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
