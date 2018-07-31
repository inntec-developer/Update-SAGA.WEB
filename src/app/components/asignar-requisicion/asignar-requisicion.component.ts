import { AfterContentChecked, AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ComponentsService } from './../../service/Components/components.service';

@Component({
  selector: 'app-asignar-requisicion',
  templateUrl: './asignar-requisicion.component.html',
  styleUrls: ['./asignar-requisicion.component.scss'],
  providers: [ComponentsService]
})
export class AsignarRequisicionComponent implements OnInit {
  //Formulario
  public AsignacionForm : FormGroup;
  //Variables de entrada
  @Input() placeHolder: string;
  @Input() Asignados: any[];

  @Output()
  Asignacion : EventEmitter<any[]> = new EventEmitter();

   public items: any[] = []

  public asignacionCtrl : any[];
  public allowClear : boolean = true;
  constructor(
    private serviceComponents : ComponentsService
  ) {
    this.getGrpUser();
    this.AsignacionForm = new FormGroup({
      selectControl: new FormControl({value: '', disabled:false})
    });
    if(! this.Asignados ){
      this.AsignacionForm.patchValue({
        selectControl: this.Asignados
       });
    }
  }

  ngOnInit() {
    this.AsignacionForm.patchValue({
      selectControl: this.Asignados
     });
  }

  public getAsignados(asg){
    this.AsignacionForm.patchValue({
      selectControl: asg
     });
  }

  valueChange(obj){
    this.Asignacion.emit(this.AsignacionForm.get('selectControl').value);
    
  }

    getGrpUser(){
    this.serviceComponents.getUserGroup()
    .subscribe(data =>{
      this.items = data;
    });
  }


}
