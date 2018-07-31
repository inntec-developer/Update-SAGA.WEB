import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehpropio',
  templateUrl: './vehpropio.component.html',
  styleUrls: ['./vehpropio.component.scss']
})
export class VehpropioComponent implements OnInit {

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

  ngOnInit() {
  }

}
