import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminServiceService } from '../../../service/AdminServicios/admin-service.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CustomValidators } from 'ng2-validation';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

import { Router } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AdminServiceService]
})
export class RegisterComponent implements OnInit {

  valForm: FormGroup;
  passwordForm: FormGroup;
  email: Array<any> = [];
  ListDepas: Array<any> = [];
  Oficinas: Array<any> = [];
  Lideres: Array<any> = [];
  user: string = '';
  verMsj = false;
  loading = false;
  @ViewChild('pop') epopover;
  @ViewChild('MessageModal') ShownModal: ModalDirective;

  isModalShown: boolean = false;
  prefijo: string = 'DAL';
  disabledE = false;
  alerts: any[] = [
    {
      type: 'success',
      msg: '',
      timeout: 4000
    },
    {
      type: 'danger',
      msg: '',
      timeout: 4000
    }
  ];
  alert = this.alerts;

  onClosed(): void {
    this.verMsj = false;
  }

  constructor(public settings: SettingsService,
    fb: FormBuilder,
    private service: AdminServiceService,
    private authService: AuthService,
    private router: Router) {
    // let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
    let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]));
    let certainPassword = new FormControl('', CustomValidators.equalTo(password));

    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': certainPassword
    });

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      // 'accountagreed': [null, Validators.required],
      'passwordGroup': this.passwordForm,
      'Clave': ['', [Validators.required]],
      'Nombre': ['', [Validators.required]],
      'ApellidoPaterno': ['', [Validators.required]],
      'ApellidoMaterno': ['', [Validators.required]],
      'Usuario': [{ value: '', disabled: true }],
      'DepartamentoId': ['', [Validators.required]],
      'OficinasId': ['', [Validators.required]],
      'LiderId': ['', [Validators.required]]
    });

  }

  submitForm($ev, value: any) {

    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }

    if (this.valForm.valid) {
      if (this.disabledE) {
        this.disabledE = false;
        this.loading = true;

        this.user = this.valForm.controls['email'].value.trim();
        var idx = this.user.indexOf("@");
        this.user = "DAMSA." + this.user.substring(0, idx);

        var clave = this.valForm.controls['Clave'].value.trim();
        var id = clave.indexOf(this.prefijo.substring(this.prefijo.length - 1, this.prefijo.length));

        if (id >= 0) {
          var lon = clave.substring(id + 1, clave.length);
          if (lon.length < 4) {
            clave = this.prefijo + "0".repeat(4 - lon.length) + lon;
          }
          else {
            clave = this.prefijo + lon;
          }
        }
        else {
          var lon = clave;
          if (lon.length < 4) {
            clave = this.prefijo + "0".repeat(4 - lon.length) + lon;
          }
          else {
            clave = this.prefijo + lon;
          }
        }

        //this.user = ((this.valForm.controls['Usuario'].value == null || this.valForm.controls['Usuario'].value == '') ? "DAMSA." + this.valForm.controls['Nombre'].value : this.valForm.controls['Usuario'].value);

        this.email.push({ email: this.valForm.controls['email'].value.trim(), UsuarioAlta: 'INNTEC' });

        let persona = {
          Clave: clave,
          Nombre: this.valForm.controls['Nombre'].value,
          ApellidoPaterno: this.valForm.controls['ApellidoPaterno'].value,
          ApellidoMaterno: this.valForm.controls['ApellidoMaterno'].value,
          Usuario: this.user.toUpperCase(),
          DepartamentoId: this.valForm.controls['DepartamentoId'].value,
          OficinaId: this.valForm.controls['OficinasId'].value,
          LiderId: this.valForm.controls['LiderId'].value,
          Email: this.email,
          Password: this.passwordForm.controls['password'].value,
          Foto: '/utilerias/img/user/default.jpg'
        };
debugger;
        this.service.AddUsers(persona)
          .subscribe(data => {
            if (data == 201) {
              this.alerts[0]['msg'] = 'El usuario' + persona.Usuario + 'se registro con éxito';
              this.alert = this.alerts[0];
              this.verMsj = false;

              this.loading = false;
              this.showModal();
              //this.valForm = null;
            }
            else {
              this.alerts[1]['msg'] = 'Ocurrio un error al intentar agregar usuario: ' + persona.Usuario;
              this.alert = this.alerts[1];
              this.loading = false;
              this.verMsj = true;
            }
          });
      }
      else {
        this.loading = false;
        this.alerts[1]['msg'] = 'El email: ' + this.valForm.controls['email'].value + ' ya se encuentra registrado';
        this.alert = this.alerts[1];
        this.epopover.show();
        this.disabledE = false;
        this.verMsj = true;
      }
    }
  }

  getDepartamentos() {
    this.service.getDepas()
      .subscribe(
        e => {
          this.ListDepas = e;
        })
  }
  getOficinas() {
    this.service.GetOficinas().subscribe(result => {
      this.Oficinas = result;
    });
  }

  getLider() {
    this.service.GetLideres()
      .subscribe(result => {
        this.Lideres = result
      });
  }

  closeModal() {
    this.ShownModal.hide();
    this.router.navigate(['/login']);
  }
  showModal(): void {
    this.isModalShown = true;
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  showPop() {

    this.epopover.show();

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.epopover.hide();
    }, 3000);
  }
  ValidarEmail(email: string) {
    this.user = this.valForm.controls['email'].value.trim();
    var idx = this.user.indexOf("@");
    this.user = "DAMSA." + this.user.substring(0, idx);
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    if (regexpEmail.test(email)) {
      this.authService.isUserActive(email)
        .subscribe(
          data => {
            if (data != 404) {
              this.alerts[1]['msg'] = 'El email: ' + email + ' ya se encuentra registrado';
              this.alert = this.alerts[1];
              this.disabledE = false;
              this.verMsj = true;
              this.showPop();
            }
            else {
              this.disabledE = true;
              this.verMsj = false;
              this.epopover.hide();
            }
          },
          error => {
            this.alerts[1]['msg'] = error;
            this.alert = this.alerts[1];
            this.verMsj = true;
          });
    }
    else {
      this.alerts[1]['msg'] = 'El email: ' + email + ' no tiene el formato correcto';
      this.alert = this.alerts[1];
      this.disabledE = false;
      this.verMsj = true;
      this.showPop();
    }
  }

  // ValidarDAL(dal: string)
  // {
  //    // this.epopover2.hide();
  //     this.authService.isUserDAL(dal)
  //         .subscribe(
  //             data => {
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
    this.valForm.controls['OficinasId'].reset();
    this.passwordForm.controls['password'].reset();
    this.passwordForm.controls['confirmPassword'].reset();
    this.getDepartamentos();
    this.getOficinas();
    this.getLider();
    this.disabledE = false;
    // this.disabledC = false;
  }
}
