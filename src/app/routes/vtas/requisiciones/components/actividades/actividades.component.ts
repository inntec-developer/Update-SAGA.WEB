import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {
  @Input() Actividades: any[];

  constructor() { }

  ngOnInit() {
  }



}
