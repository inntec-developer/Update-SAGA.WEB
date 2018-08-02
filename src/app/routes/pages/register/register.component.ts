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
    verMsj = false;
    @ViewChild('pop') epopover;
    @ViewChild('pop2') epopover2;
    disabledE = false;
    disabledC= false;
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
            'Usuario': [{value:'', disabled:true}],
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
            if(this.disabledE)
            {
                this.user = this.valForm.controls['email'].value.trim();
                var idx =  this.user.indexOf( "@" ); 
                this.user = "DAMSA." + this.user.substring(0, idx);

            //this.user = ((this.valForm.controls['Usuario'].value == null || this.valForm.controls['Usuario'].value == '') ? "DAMSA." + this.valForm.controls['Nombre'].value : this.valForm.controls['Usuario'].value);

           this.email.push({email: this.valForm.controls['email'].value, UsuarioAlta: 'INNTEC'});

           let persona = {
                Clave: this.valForm.controls['Clave'].value.trim(),
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
                   console.log(data)
               this.msj = data;
               this.verMsj = true;
               this.ngOnInit()
               });
            }
            else
            {
                this.msj = 'El email: ' + this.valForm.controls['email'].value + ' ya se encuentra registrado';
                        this.epopover.show();
                        this.disabledE = false;
                        this.verMsj = true;

            }
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
    }

    ValidarEmail(email: string)
    {
        this.user = this.valForm.controls['email'].value.trim();
        var idx =  this.user.indexOf( "@" ); 
        this.user = "DAMSA." + this.user.substring(0, idx);

        this.authService.isUserActive(email)
            .subscribe(
                data => {
                    if( data != 404)
                    {
                        this.msj = 'El email: ' + email + ' ya se encuentra registrado';
                        this.epopover.show();
                        this.disabledE = false;
                        this.verMsj = true;
                    }
                    else
                    {
                        this.disabledE = true;
                       this.epopover.hide();
                    }
                },
                error => {
                   this.msj = error;
                });
    }

    ValidarDAL(dal: string)
    {
        console.log(dal)
        this.authService.isUserDAL(dal)
            .subscribe(
                data => {
                    console.log(dal)
                    if( data != 404)
                    {console.log(this.epopover2)
                        this.msj = 'Clave: ' + dal + ' ya se encuentra registrado';
                        this.epopover2.show();
                        this.disabledC = false;
                        this.verMsj = true;
                    }
                    else
                    {
                       this.epopover2.hide();
                       this.verMsj = false;
                       this.disabledC = true;
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

       this.disabledE = false;
       this.disabledC = false;
       this.closePop();
 
    }

}