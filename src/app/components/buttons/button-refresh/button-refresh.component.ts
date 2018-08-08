import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-refresh',
  templateUrl: './button-refresh.component.html',
  styleUrls: ['./button-refresh.component.scss']
})
export class ButtonRefreshComponent implements OnInit {
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
