import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit, OnChanges {

  @Input() SelectedPais: any;
  formPaises: FormGroup;

  constructor() {
    this.formPaises = new FormGroup({
      id: new FormControl(),
      pais: new FormControl('', [Validators.required]),
      valido: new FormControl()
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['SelectedPais'].firstChange) {

      console.log();
    }
  }

  getErrorMessage() {
    debugger;
    return this.formPaises.get('pais').hasError('required') ? 'You must enter a value' :
            '';
  }

}
