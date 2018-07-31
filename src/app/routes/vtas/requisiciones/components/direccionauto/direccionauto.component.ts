import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, NgForm, Validator } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


//Service
import { RequisicionesService } from '../../../../../service/index'

@Component({
  selector: 'app-direccionauto',
  templateUrl: './direccionauto.component.html',
  styleUrls: ['./direccionauto.component.scss'],
  providers: [RequisicionesService]
})
export class DireccionautoComponent implements OnInit {
  //Variable
  mostrarId: string;
  @Input('Damfo') filtroDamfo: any;
  Direcciones: any[];
  AddressCtrl: FormControl;
  filteredAddress: Observable<any[]>;
  // Sacamos el filtro para velo en busqueda.
  filtrodireccion: any;
  @Input() IdDireccion: string;
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();


  constructor(private service: RequisicionesService) {
      this.AddressCtrl =  new FormControl();
  }

  filterAddress(calle : string){
    return this.filtrodireccion = this.Direcciones.filter(address =>
    address.calle.toLowerCase().indexOf(calle.toLowerCase()) === 0);
  }

  SendIdDireccion(){
    if(this.filtrodireccion != null){
      this.IdDireccion = this.filtrodireccion[0].id;
      this.change.emit(this.IdDireccion);
    }else{
      this.IdDireccion = null;
    }
  }

  ngOnInit() {
    this.service.getAddress(this.filtroDamfo)
    .subscribe(data => {
      this.Direcciones = data;
      this.filteredAddress = this.AddressCtrl.valueChanges
        .pipe(startWith(''),
        map( calle => calle ? this.filterAddress(calle) : this.Direcciones.slice())
      );
    });
  }

}
