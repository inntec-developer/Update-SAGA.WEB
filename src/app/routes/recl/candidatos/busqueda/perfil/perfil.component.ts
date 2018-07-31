import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

// Servicios
import { CandidatosService } from '../../../../../service/index';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [CandidatosService]
})
export class PerfilComponent implements OnInit {

  // Declarar variables.
    Perfiles: any[];
    perfilCtrl: FormControl;
    filteredperfil: Observable<any[]>;
    filtroperfil: any;
    IdPerfil: number;
    @Output()
    change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: CandidatosService) {
    this.perfilCtrl = new FormControl();
  }

  ngOnInit() {
    this.service.getperfiles()
    .subscribe(data => {
      this.Perfiles = data;
      this.filteredperfil = this.perfilCtrl.valueChanges
        .pipe(startWith(''),
        map(perfil => perfil ? this.filterperfil(perfil) : this.Perfiles.slice()));
    });
  }

  filterperfil(perfil: string) {
    return this.filtroperfil = this.Perfiles.filter(perfilexp =>
      perfilexp.perfilExperiencia.toLowerCase().indexOf(perfil.toLowerCase()) === 0);
  }

  SendIdPerfil(){
    this.filteredperfil = this.perfilCtrl.valueChanges
      .pipe(startWith(''),
      map(perfil => perfil ? this.filterperfil(perfil) : this.Perfiles.slice()));

    if(this.filtroperfil != null){
      this.IdPerfil = this.filtroperfil[0].id;
      this.change.emit(this.IdPerfil);
    }
  }


}
