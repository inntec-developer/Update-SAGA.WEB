import { Component, OnInit, Inject } from '@angular/core';
import {FormControl,  FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableDataSource} from '@angular/material';

// Modelos
import { Apartado } from '../../../../../models/recl/candidatos';

// Servicios
import { CandidatosService } from '../../../../../service/index';

@Component({
  selector: 'app-dialogcandidatos',
  templateUrl: './dialogcandidatos.component.html',
  styleUrls: ['./dialogcandidatos.component.scss'],
  providers: [CandidatosService]
})
export class DialogcandidatosComponent implements OnInit {

  vacantesdtl: any[];
  folio: any;
  id: any;

  constructor(public dialogRef: MatDialogRef<DialogcandidatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: CandidatosService) {
      this.service.getvacantesdtl(data)
      .subscribe(vacantesdtl => {
        this.vacantesdtl = vacantesdtl;
        this.id = vacantesdtl[0].id;
        this.folio = vacantesdtl[0].folio;
        console.log(this.vacantesdtl);
      });
    }

    ngOnInit() {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}