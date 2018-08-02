import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { CustomValidators } from 'ng2-validation';
import { RequestOptions } from '@angular/http';
import { SettingsService } from '../../../core/settings/settings.service';
import { AuthService } from './../../../service/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers:[ AdminServiceService ]
})
export class RegisterComponent implements OnInit {

    valForm: FormGroup;
    passwordForm: FormGroup;
    email: Array<any>=[];
    msj: string = '';
    ListDepas: Array<any> = [];
    user: string = '';
    @ViewChild('pop') epopover;
    disabled = false;

    constructor(public settings: SettingsService,
                fb: FormBuilder,
                private service: AdminServiceService,
                private authService: AuthService )
    {
        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            // 'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm,
            'Clave': ['',  [Validators.required]],
            'Nombre': ['',  [Validators.required]],
            'ApellidoPaterno': ['',  [Validators.required]],
            'ApellidoMaterno': ['',  [Validators.required]],
            'Usuario': '',
            'DepartamentoId': ['',  [Validators.required]]
        });

    }

    submitForm($ev, value: any)
    {
       
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
           this.valForm.controls[c].markAsTouched();
        }
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid)
        {
            debugger;
           this.user = ((this.valForm.controls['Usuario'].value == null || this.valForm.controls['Usuario'].value == '') ? "DAMSA." + this.valForm.controls['Nombre'].value : this.valForm.controls['Usuario'].value);

           this.email.push({email: this.valForm.controls['email'].value, UsuarioAlta: 'INNTEC'});
           let persona = {
                Clave: this.valForm.controls['Clave'].value,
                Nombre: this.valForm.controls['Nombre'].value,
                ApellidoPaterno: this.valForm.controls['ApellidoPaterno'].value,
                ApellidoMaterno: this.valForm.controls['ApellidoMaterno'].value,
                Usuario: this.user.toUpperCase(),
                DepartamentoId: this.valForm.controls['DepartamentoId'].value,
                Email: this.email,
                Password: this.passwordForm.controls['password'].value,
                Foto: "/utilerias/img/user/default.jpg"
              };
              console.log(persona)
             
           this.service.AddUsers(persona)
               .subscribe( data => {
               this.msj = data;
               this.ngOnInit()
               });
        }
    }

    getDepartamentos()
    {
      this.service.getDepas()
      .subscribe(
        e=>{
          this.ListDepas = e;
        })
    }

    closePop()
    {
        this.epopover.hide();
        this.msj = "";
    }

    ValidarEmail(email: string)
    {
        this.authService.isUserActive(email)
            .subscribe(
                data => {
                    if( data != 404)
                    {
                        this.msj = 'El email: ' + this.valForm.controls['email'].value + ' ya se encuentra registrado';
                        this.epopover.show();
                        this.disabled = false;
                    }
                    else
                    {
                       this.epopover.hide();
                       this.disabled = true;
                    }
                },
                error => {
                   this.msj = error;
                });
    }

    ngOnInit() {
   
       this.valForm.controls['Clave'].reset();
       this.valForm.controls['Nombre'].reset();
       this.valForm.controls['ApellidoPaterno'].reset();
       this.valForm.controls['email'].reset();
       this.valForm.controls['Usuario'].reset();
       this.valForm.controls['ApellidoMaterno'].reset();
       this.valForm.controls['DepartamentoId'].reset();

       this.passwordForm.controls['password'].reset();
       this.passwordForm.controls['confirmPassword'].reset();

       this.getDepartamentos();

       this.disabled = false;
       this.closePop();
    }

}