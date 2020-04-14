import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ComponentsService } from '../../service/Components/components.service';

@Component({
  selector: 'app-asignar-requisicion',
  templateUrl: './asignar-requisicion.component.html',
  styleUrls: ['./asignar-requisicion.component.scss'],
  providers: [ComponentsService]
})
export class AsignarRequisicionComponent implements OnInit {
  // Formulario
  public value: any;
  public AsignacionForm: FormGroup;
  public filteredData: Array<any> = [];
  public filtro: string;
  // Variables de entrada
  @Input() placeHolder: string;
  @Input() Asignados: any[];

  @Output()
  Asignacion: EventEmitter<any[]> = new EventEmitter();

  public items: any[] = [];

  public asignacionCtrl: any[];
  public allowClear = true;
  constructor(
    private serviceComponents: ComponentsService
  ) {
    this.getGrpUser();
    this.AsignacionForm = new FormGroup({
      selectControl: new FormControl({ value: '', disabled: false })
    });
    if (!this.Asignados) {
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

  public getAsignados(asg) {
    this.AsignacionForm.patchValue({
      selectControl: asg
    });
  }

  valueChange(obj) {

    this.Asignacion.emit(this.AsignacionForm.get('selectControl').value);

  }

  getGrpUser() {
    this.filtro = '';
    const usuarios = ['coordinador', 'lider'];
    const dept = ['recl'];
    this.serviceComponents.getUserGroup(usuarios, dept)
      .subscribe(data => {
        this.items = data;
        this.filteredData = this.items;
      });

  }

  public Search(data: any) {
    const tempArray: Array<any> = [];
    const colFilter: Array<any> = [{ title: 'usuarios' }];
    let flag = false;
    this.filteredData.forEach(function (item) {
      colFilter.forEach(function (c) {
        if (c.title === 'usuarios') {
          const user = item['usuarios'];
          if (user.length > 0) {
            user.forEach(function (u) {
              if (u['nombre'].toString().toLowerCase().match(data.target.value.toLowerCase())) {
                flag = true;
              }
              if (u['email'].toString().toLowerCase().match(data.target.value.toLowerCase())) {
                flag = true;
              }
            });
          }
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    this.items = tempArray;
  }

}
