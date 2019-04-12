import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements OnInit {

  idCat: string;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  selectIdCat( id: string ) {
    this.idCat = id;
  }

}
