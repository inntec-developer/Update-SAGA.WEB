import { AbstractControl } from "@angular/forms";

export class RFCValidator {
    static MachRFC(AC: AbstractControl) {
        let RFC = AC.get('RFC').value;
        let ValidarRFC= AC.get('ValidarRFC').value;
        if (RFC != ValidarRFC) {
            AC.get('ValidarRFC').setErrors({ MachRFC: true })
        }
        else {
            return null;
        }
    }
}
