import { Component, OnInit } from '@angular/core';
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

    constructor() { }

    ngOnInit() {
    }

    Sesion() {
        if (sessionStorage.getItem('usuario') === 'DAMSA.JCERVANTES' || sessionStorage.getItem('usuario') === 'DAMSA.MVENTURA'
        || sessionStorage.getItem('usuario') === 'DAMSA.NINIGUEZ' || sessionStorage.getItem('usuario') === 'DAMSA.IDELATORRE'
        || sessionStorage.getItem('usuario') === 'DAMSA.BMORALES') {

            clearTimeout(this.mouseStop);
            this.mouseStop = setTimeout(() => {
                swal('Valar Morghulis,(Pero tu sesión NO!, puedes continuar trabajando)', 'Valar Doheris', 'error');
            }, 900000);

        } else {
            if (sessionStorage.getItem('id')) { // Nos percatamos si ya inicio sesión.
                clearTimeout(this.mouseStop);
                this.mouseStop = setTimeout(() => {
                this.lock = true;
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
            }, 1800000);
        }
        }
    }
}
