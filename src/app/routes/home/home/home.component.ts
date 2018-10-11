import { ActivatedRoute, CanDeactivate, Router, } from '@angular/router';
import {Component, OnInit} from '@angular/core';

import { DialogLiberarCandidatoComponent } from './../../../components/dialog-liberar-candidato/dialog-liberar-candidato.component';
import { MatDialog } from '@angular/material';
import { debug } from 'util';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent implements OnInit {
    usuario: string;
    direccionId : string;
    
    element: any;
    constructor(private dialog: MatDialog
    ) {
        this.direccionId  =  '6d177620-7c54-e811-80e0-9e274155325e'
     }

    ngOnInit() {
    }
    getIdCandidato(event){
        console.log(event);
    }

    openDialogLiberar(){
        let dialogLiberar = this.dialog.open(DialogLiberarCandidatoComponent, {
            width: '25%',
            height: 'auto',
          });
          dialogLiberar.afterClosed().subscribe(result => {
            if (result) {
              this.element = result;
              console.log(this.element);
            }
            else{
                console.log('No se regresaron registros.');
            }
          });
    }
}
    