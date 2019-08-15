import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-pst-damsa',
  templateUrl: './perfil-pst-damsa.component.html',
  styleUrls: ['./perfil-pst-damsa.component.scss']
})
export class PerfilPstDamsaComponent implements OnInit {

  @Input() IdFormato: any;
  @Input() Psicometrias: any[];
  @Output() PsicometriasEmt = new EventEmitter();

  PsicometriasNew = [];

  esNuevo: boolean = true;

  private Add: boolean;

  public PsicometriasArray: FormGroup;
  public pscometrias: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    debugger;
    this.IdFormato = this.IdFormato || null;
    this.PsicometriasArray = this.fb.group({
      psicometria: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Psicometrias != null) {
        this.PopulateForm(this.Psicometrias);
      }
    }
  }

  private PopulateForm(psicometria: any) {
    debugger;
    for (let x in psicometria) {
      this.AddPsicometria(1);
    }
    this.PsicometriasArray.patchValue({
      psicometria: this.Psicometrias
    });
  }

  AddPsicometria(Psicometria: any) {
    debugger;
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Psicometria > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.PsicometriasArray.controls['psicometria'];
      const addCtrl = this.initPsicometria();
      control.push(addCtrl);
    }
  }

  initPsicometria(){
    return  this.fb.group({
      id: ['0'],
      psicometria: [],
      descripcion: [{value:'', disabled: true}, [Validators.required]],
      psicometriaId: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  Agregar(Value: boolean){
    this.Add = false;
  }

  getRegistros(data: any){
    if (!data['isEdit']) {
      this.PsicometriasNew.push({
        psicometriaId: data['psicometriaId'],
        UsuarioAlta: data['UsuarioAlta']
      });
    } else {
      let editRegistro = {
        psicometriaId: data['psicometriaId'],
        UsuarioAlta: data['UsuarioAlta']
      };
      this.PsicometriasNew[data['index']] = editRegistro;
    }
    this.PsicometriasEmt.emit(this.PsicometriasNew);
  }

  removePsicometria(i: number) {
    const control = <FormArray>this.PsicometriasArray.controls['psicometria'];
    control.removeAt(i);
    this.PsicometriasNew.splice(i, 1);
    this.PsicometriasEmt.emit(this.PsicometriasNew);
  }
}
