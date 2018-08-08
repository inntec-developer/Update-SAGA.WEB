import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.scss']
})
export class ButtonSaveComponent implements OnInit {
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
