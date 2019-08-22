import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-procesos',
  templateUrl: './perfil-procesos.component.html',
  styleUrls: ['./perfil-procesos.component.scss']
})
export class PerfilProcesosComponent implements OnInit {
  @Input() IdFormato: any;
  @Input() Procesos: any[];
  @Output() ProcesosEmt = new EventEmitter();

  ProcesosNew = [];
  Orden = 0;

  esNuevo: boolean = true;
  private Add: boolean;

  public ProcesosArray: FormGroup;
  public proceso: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.ProcesosArray = this.fb.group({
      proceso: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Procesos != null) {
        this.PopulateForm(this.Procesos);
      }
    }
  }

  private PopulateForm(observacion: any) {
    for (let x in observacion) {
      this.AddProceso(1);
    }
    this.ProcesosArray.patchValue({
      proceso: this.Procesos
    });
  }

  AddProceso(Proceso?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Proceso > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.ProcesosArray.controls['proceso'];
      const addCtrl = this.initProceso();
      control.push(addCtrl);
    }
  }

  initProceso() {
    return this.fb.group({
      id: ['0'],
      proceso: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.Orden += 1;
      this.ProcesosNew.push({
        Proceso: data['Proceso'],
        Orden: this.Orden,
        UsuarioAlta: data['UsuarioAlta']
      });
    } else {
      let editRegistro = {
        Proceso: data['Proceso'],
        UsuarioAlta: data['UsuarioAlta']
      };
      this.ProcesosNew[data['index']] = editRegistro;
    }
    this.ProcesosEmt.emit(this.ProcesosNew);
  }

  removeProceso(i: number) {
    const control = <FormArray>this.ProcesosArray.controls['proceso'];
    control.removeAt(i);
    this.ProcesosNew.splice(i, 1);
    this.ProcesosEmt.emit(this.ProcesosNew);
  }

}
