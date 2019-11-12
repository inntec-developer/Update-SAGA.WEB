import { AbstractControl } from '@angular/forms';

export class RFCValidator {
    static MachRFC(AC: AbstractControl) {
        const RFC = AC.get('RFC').value;
        const ValidarRFC = AC.get('ValidarRFC').value;
        if (RFC !== ValidarRFC) {
            AC.get('ValidarRFC').setErrors({ MachRFC: true });
        } else {
            return null;
        }
    }
}
