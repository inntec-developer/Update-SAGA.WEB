import { AbstractControl } from '@angular/forms';

export class CompanyValidation {
  static MachCompany(AC: AbstractControl) {
    const Empresa = AC.get('Empresa').value;
    const ValidarEmpresa = AC.get('ValidarEmpresa').value;
    if (Empresa !== ValidarEmpresa) {
      AC.get('ValidarEmpresa').setErrors({ MachCompany: true });
    } else {
      return null;
    }
  }
}
