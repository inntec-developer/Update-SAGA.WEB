import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../../../../../service';

@Component({
  selector: 'app-prestaciones-ley',
  templateUrl: './prestaciones-ley.component.html',
  styleUrls: ['./prestaciones-ley.component.scss'],
  providers: [CatalogosService]
})
export class PrestacionesLeyComponent implements OnInit {
  public prestacionesLey: any[];
  constructor(
    private serviceCatalogos: CatalogosService
  ) { }

  ngOnInit() {
    this.serviceCatalogos.getPrestacionesLey()
        .subscribe(data => {
          this.prestacionesLey = data;
        })
  }

}
