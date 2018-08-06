import {ActivatedRoute, Router} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { ApiConection } from "../../../service";
import { AuthService } from './../../../service/auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from '../../../core/settings/settings.service';
import { debug } from "util";
import { looseIdentical } from "../../../../../node_modules/@angular/core/src/util";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers:[ AdminServiceService, AuthService ]
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    loading = false;
    returnUrl: string;
    failLogin: any;
    noAccess: any;

    constructor(
        private service: AdminServiceService, 
        public settings: SettingsService, 
        fb: FormBuilder, 
        private route: ActivatedRoute, 
        private router: Router, 
        private authenticationService: AuthService) {

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) 
        {
            this.login(value.email, value.password)
        }
    }

    login(email: string, password: string) {
        this.loading = true;
        this.authenticationService.login(email, password)
            .subscribe(
                data => {
                    if(data != 404 && data != 406){
                        localStorage.setItem('ConexionBolsa', ApiConection.ServiceUrlBolsa);
                        localStorage.setItem('privilegios', JSON.stringify(data.privilegios));
                        localStorage.setItem('usuario',data.usuario);
                        localStorage.setItem('nombre', data.nombre);
                        localStorage.setItem('email', data.email);
                        localStorage.setItem('clave', data.clave)
                        localStorage.setItem('foto', data.foto);
                        localStorage.setItem('id', data.id)
                        
                        console.log(data)
                        this.router.navigate(['/home']);
                    }
                    if(data == 404){
                        this.failLogin = true;
                        this.noAccess = false;
                        this.loading = false;
                        setTimeout(()=>{
                            this.failLogin = false;
                        }, 1500);
                    }
                    if(data == 406){
                        this.noAccess = true;
                        this.failLogin = false;
                        this.loading = false;
                        setTimeout(()=>{
                            this.noAccess = false;
                        }, 1500);
                    }
                },
                error => {
                    this.loading = false;
                });
    }

    ngOnInit() {
       // this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        localStorage.clear();
    }
}
