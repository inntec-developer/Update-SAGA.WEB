import { Component, OnInit } from '@angular/core';

import { ClientesService } from './../../../service/clientes/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-directorio-empresarial',
  templateUrl: './directorio-empresarial.component.html',
  styleUrls: ['./directorio-empresarial.component.scss'],
  providers: [ClientesService]
})
export class DirectorioEmpresarialComponent implements OnInit {
  public Prospectos: Array<any> = [];
  public Clientes: Array<any> = [];
  public CountProspectos = 0;
  public CountClientes = 0;
  public viewProspectos = false;

  constructor(
    private _service: ClientesService,
    private _Router: Router,
    private _Route: ActivatedRoute,
    ) {
  }

  ngOnInit() {
this._Route.params.subscribe(params => {
  if (params['ruta'] != null) {
    if (params['ruta'] === '2') {
      this.viewProspectos = true;
    } else {
      this.viewProspectos = false;
    }
  }
});

    this._service.getProspectos().subscribe(element =>{
      this.Prospectos = element;
      this.CountProspectos = this.Prospectos.length;
    });

    this._service.getClientes().subscribe(elemet =>{
      this.Clientes = elemet;
      this.CountClientes = this.Clientes.length;
    });
  }

  // clicProspectos() {

  //   this._Router.navigate(['/ventas/prospectos',this.Prospectos], { skipLocationChange: true });
  // }

  selectClientes() {
    this.viewProspectos = false;
  }

  selectProspectos(){
    this.viewProspectos = true;
  }
}
