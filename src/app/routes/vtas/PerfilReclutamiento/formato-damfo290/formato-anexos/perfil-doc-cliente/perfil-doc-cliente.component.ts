import { forEach } from '@angular/router/src/utils/collection';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-perfil-doc-cliente',
  templateUrl: './perfil-doc-cliente.component.html',
  styleUrls: ['./perfil-doc-cliente.component.scss']
})
export class PerfilDocClienteComponent implements OnInit, OnChanges {
  @Input() IdFormato: any;
  @Input() Documentos: any[];
  @Output() DocumentosEmt = new EventEmitter();

  DocumentosNew = [];

  esNuevo = true;
  private Add: boolean;

  public DocumentosArray: FormGroup;
  public documento: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.IdFormato = this.IdFormato || null;
    this.DocumentosArray = this.fb.group({
      documento: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.IdFormato != null) {
      this.esNuevo = false;
      if (this.Documentos.length > 0) {
        this.PopulateForm(this.Documentos);
      }
    }
  }

  private PopulateForm(observacion: any) {
    observacion.forEach(x => {
      this.AddDocumento(1);
    });
    this.DocumentosArray.patchValue({
      documento: this.Documentos
    });
  }

  AddDocumento(Documentos?: any) {
    if (this.Add) {
      this.Add = true;
      return;
    } else {
      Documentos > 0 ? this.Add = false : this.Add = true;
      const control = <FormArray>this.DocumentosArray.controls['documento'];
      const addCtrl = this.initDocumento();
      control.push(addCtrl);
    }
  }

  initDocumento() {
    return this.fb.group({
      id: ['0'],
      documento: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  Agregar(Value: boolean) {
    this.Add = false;
  }

  getRegistros(data: any) {
    if (!data['isEdit']) {
      this.DocumentosNew.push({
        Documento: data['Documento'],
        UsuarioAlta: data['UsuarioAlta']
      });
    } else {
      const editRegistro = {
        Documento: data['Documento'],
        UsuarioAlta: data['UsuarioAlta']
      };
      this.DocumentosNew[data['index']] = editRegistro;
    }
    this.DocumentosEmt.emit(this.DocumentosNew);
  }

  removeDocumento(i: number) {
    const control = <FormArray>this.DocumentosArray.controls['documento'];
    control.removeAt(i);
    this.DocumentosNew.splice(i, 1);
    this.DocumentosEmt.emit(this.DocumentosNew);
  }

}
