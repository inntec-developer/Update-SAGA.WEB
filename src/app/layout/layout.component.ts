import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConection } from '../service/api-conection.service';

declare var $: any;

const swal = require('sweetalert');

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    public Activo = true;
    private mouseStop = null;
    public lock: boolean;

    constructor( private _Router: Router ) { }

    ngOnInit() {
    }

    Sesion() {
        clearTimeout(this.mouseStop);
        this.mouseStop = setTimeout(() => {
            this.lock = true;
            // swal('Tu sesión esta proxima caducar', 'Tienes 20 segundos para confirmar', 'warning');
            swal({
                title: 'Tu sesión esta proxima a caducar',
                text: 'Tienes 20 segundos para confirmar',
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Permanecer',
                closeOnConfirm: true,
                showLoaderOnConfirm: true
                }, (isConfirm) => {
                if (isConfirm) {
                    this.lock = false;
                    return;
                }
                });
                setTimeout(() => {
                if (this.lock) {
                    swal({
                        title: 'Tu sesión ha caducado',
                        text: 'Incia sesión nuevamente.',
                        type: 'info',
                        showCancelButton: false,
                        confirmButtonText: 'Ok',
                        closeOnConfirm: true,
                        showLoaderOnConfirm: true
                        }, (isConfirm: any) => {
                        if (isConfirm) {
                            window.location.href = ApiConection.ServiceUrlWeb + 'login';
                        }
                    });
                }
            }, 20000);
        }, 900000);
    }
}
