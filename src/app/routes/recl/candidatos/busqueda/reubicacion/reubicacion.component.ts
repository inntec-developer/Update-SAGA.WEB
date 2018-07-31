import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reubicacion',
  templateUrl: './reubicacion.component.html',
  styleUrls: ['./reubicacion.component.scss']
})
export class ReubicacionComponent implements OnInit {

  checked = false;
  Activo: number;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  Filtro(){
    if(this.checked){
      this.Activo = 1;
    }else{
      this.Activo = 0;
    }
    this.change.emit(this.Activo);
  }

  constructor() { }

  ngOnInit() { }

}
