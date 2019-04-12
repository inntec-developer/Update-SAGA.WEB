import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CatalogosService } from '../../../service/catalogos/catalogos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() idCatalogo = new EventEmitter<string>();
  catalogosGroup: any;
  selectedValue: string;
  Catalogos: any;

  constructor( private servicioCatalogo: CatalogosService ) {
    this.servicioCatalogo.getCatalogos()
    .subscribe( result => {
      this.catalogosGroup = result;
    });
  }

  ngOnInit() {
  }

  buscaCatalogo() {
    this.idCatalogo.emit( this.selectedValue );
  }


}
