import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-send',
  templateUrl: './button-send.component.html',
  styleUrls: ['./button-send.component.scss']
})
export class ButtonSendComponent implements OnInit {

  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
