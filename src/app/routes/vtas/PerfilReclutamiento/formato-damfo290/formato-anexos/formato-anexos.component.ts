import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formato-anexos',
  templateUrl: './formato-anexos.component.html',
  styleUrls: ['./formato-anexos.component.scss']
})
export class FormatoAnexosComponent implements OnInit {
  @Input('IdFormato') IdFormato: any;

  constructor() { }

  ngOnInit() {
  }

}
