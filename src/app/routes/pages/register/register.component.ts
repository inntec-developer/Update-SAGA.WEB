import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { CustomValidators } from 'ng2-validation';
import { RequestOptions } from '@angular/http';
import { SettingsService } from '../../../core/settings/settings.service';
import { AuthService } from '../../../service/auth/auth.service';
import { ModalDirective } from 'ngx-bootstrap';

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
    verMsg = false;
    success = false;
    haserror = false;
    @ViewChild('pop') epopover;
    @ViewChild('MessageModal') ShownModal: ModalDirective;
    isModalShown: boolean = false;
    prefijo: string = 'DAL';

   // @ViewChild('pop2') epopover2;
    disabledE = false;
    //disabledC= false;
    constructor(public settings: SettingsService,
                fb: FormBuilder,
                private service: AdminServiceService,
                private authService: AuthService,
                private router: Router )
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

                var clave = this.valForm.controls['Clave'].value.trim();
                var id = clave.indexOf(this.prefijo.substring(this.prefijo.length - 1, this.prefijo.length));

                if(id >= 0)
                {
                    var lon = clave.substring(id + 1, clave.length);
                    if(lon.length < 4)
                    {
                        clave = this.prefijo + "0".repeat(4-lon.length) + lon;
                    }
                }
                else
                {
                    var lon = clave;
                    if(lon.length < 4)
                    {
                        clave = this.prefijo + "0".repeat(4-lon.length) + lon;
                    }
                }

            //this.user = ((this.valForm.controls['Usuario'].value == null || this.valForm.controls['Usuario'].value == '') ? "DAMSA." + this.valForm.controls['Nombre'].value : this.valForm.controls['Usuario'].value);

                this.email.push({email: this.valForm.controls['email'].value.trim(), UsuarioAlta: 'INNTEC'});

                let persona = {
                    Clave: clave,
                    Nombre: this.valForm.controls['Nombre'].value,
                    ApellidoPaterno: this.valForm.controls['ApellidoPaterno'].value,
                    ApellidoMaterno: this.valForm.controls['ApellidoMaterno'].value,
                    Usuario: this.user.toUpperCase(),
                    DepartamentoId: this.valForm.controls['DepartamentoId'].value,
                    Email: this.email,
                    Password: this.passwordForm.controls['password'].value,
                    Foto: "/utilerias/img/user/default.jpg"
                };
           
                this.service.AddUsers(persona)
                    .subscribe(data => {
                        if (data == 201) {
                            this.msj = 'El usuario' + persona.Usuario + 'se registro con éxito';
                            this.verMsg = true;
                            this.success = true;
                            this.haserror = false;
                           
                            this.showModal();
                            //this.valForm = null;
                        }
                        else {
                            this.msj = 'Ocurrio un error al intentar agregar usuario: ' + persona.Usuario;
                            this.verMsg = true;
                            this.haserror = true;
                            this.success = false;
                            this.ngOnInit();
                        }
                    });
            }
            else {
                this.msj = 'El email: ' + this.valForm.controls['email'].value + ' ya se encuentra registrado';
                this.epopover.show();
                this.disabledE = false;
                this.verMsg = true;
                this.haserror = true;
                this.success = false;
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
    closeModal()
    {
        this.ShownModal.hide();
        this.router.navigate(['/login']);
    }
    showModal(): void {
        this.isModalShown = true;
    }

    onHidden(): void {
        this.isModalShown = false;
      }

    ValidarEmail(email: string)
    {
        this.closePop();

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
                        this.verMsg = true;
                        this.haserror = true;
                        this.success = false;

                    }
                    else
                    {
                        this.disabledE = true;
                        this.haserror = false;
                        this.success = false;
                        this.verMsg = false;
                       this.epopover.hide();
                    }
                },
                error => {
                   this.msj = error;
                   this.haserror = true;
                   this.success = false;
                });
    }

    // ValidarDAL(dal: string)
    // {
    //    // this.epopover2.hide();
    //     this.authService.isUserDAL(dal)
    //         .subscribe(
    //             data => {
    //                 console.log(dal)
    //                 if( data != 404)
    //                 {
    //                     this.msj = 'Clave: ' + dal + ' ya se encuentra registrado';
    //                     this.epopover2.show();
    //                     this.disabledC = false;
    //                     this.verMsg = true;
    //                     this.haserror = true;
    //                     this.success = false;
    //                 }
    //                 else
    //                 {
    //                    this.epopover2.hide();
    //                    this.verMsg = false;
    //                    this.disabledC = true;

    //                 }
    //             },
    //             error => {
    //                this.msj = error;
    //                this.verMsg = true;
    //                this.haserror = true;
    //                this.success = false;
    //             });
    // }

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
      // this.disabledC = false;
       this.closePop();
 
    }

}