import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-docs',
  templateUrl: './button-docs.component.html',
  styleUrls: ['./button-docs.component.scss']
})
export class ButtonDocsComponent implements OnInit {
 
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
