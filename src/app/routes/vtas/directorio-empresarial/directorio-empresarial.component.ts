import { Component, OnInit } from '@angular/core';

import { ClientesService } from './../../../service/clientes/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directorio-empresarial',
  templateUrl: './directorio-empresarial.component.html',
  styleUrls: ['./directorio-empresarial.component.scss'],
  providers: [ClientesService]
})
export class DirectorioEmpresarialComponent implements OnInit {
  Prospectos: Array<any> = [];
  Clientes: Array<any> = [];
  CountProspectos: number = 0;
  CountClientes: number = 0;
  viewProspectos: boolean = null;
  

  constructor(
    private _service: ClientesService,
    private _Router: Router
    ) { }

  ngOnInit() {
    this._service.getProspectos().subscribe(element =>{
      this.Prospectos = element;
      this.CountProspectos = this.Prospectos.length;
    });

    this._service.getClientes().subscribe(elemet =>{
      this.Clientes = elemet;
      this.CountClientes = this.Clientes.length;
    });
  }

  clicProspectos(){
    this._Router.navigate(['/ventas/prospectos',this.Prospectos], { skipLocationChange: true });
  }

  selectClientes(){
    this.viewProspectos = false;
  }

  selectProspectos(){
    this.viewProspectos = true;
  }
}
