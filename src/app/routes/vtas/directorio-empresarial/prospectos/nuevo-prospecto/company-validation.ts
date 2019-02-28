import { AbstractControl } from "@angular/forms";
import { Password } from "primeng/primeng";

export class CompanyValidation {
    static MachCompany(AC: AbstractControl) {
        let Empresa = AC.get('Empresa').value;
        let ValidarEmpresa = AC.get('ValidarEmpresa').value;
        if (Empresa != ValidarEmpresa) {
            AC.get('ValidarEmpresa').setErrors({ MachCompany: true })
        }
        else {
            return null;
        }
    }
}
