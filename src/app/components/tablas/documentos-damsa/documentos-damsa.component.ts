import { Component, OnInit } from '@angular/core';

import { CatalogosService } from '../../../service';

@Component({
  selector: 'app-documentos-damsa',
  templateUrl: './documentos-damsa.component.html',
  styleUrls: ['./documentos-damsa.component.scss'],
  providers: [ CatalogosService]
})
export class DocumentosDamsaComponent implements OnInit {

  public documentosDamsa: any[];
  constructor(
    private serviceCatalogos: CatalogosService
  ) { }

  ngOnInit() {
    this.serviceCatalogos.getDocumentosDamsa()
        .subscribe(data => {
          this.documentosDamsa = data;
        });
  }

}
