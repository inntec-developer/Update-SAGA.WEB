
import { Component } from '@angular/core';

@Component({
    template: 'GC'
})
export class CURPValidator {
    Nombres: string[] = new Array(4);
    Nombre: string;
    Paterno: string;
    Materno: string;
    FechaNacimiento: Date;
    EstadoNacimiento: string;
    Sexo: string;

    CURP: string;
    RFC: string;
    Letra: string;
    CURPValida = '';
    RFCValida = '';
    SVI: boolean;

    constructor() { }

    ValidarIMSS(fechaNacimiento: Date, imss: string) {
        if (imss.length < 6) {
            return;
        }
        this.FechaNacimiento = fechaNacimiento;
        const _fecha = fechaNacimiento.toDateString();
        const fecha = _fecha.split(' ');
        if (imss.substr(4, 2) === fecha[3].substr(2, 2)) {
            return true;
        }
        return false;
    }
    public ValidaCurpDateState(curp: string, fch: Date, sexo: string, estadoNacimiento: string, esMexicano: boolean) {
        this.CURPValida = '';
        this.FechaNacimiento = fch;
        const _fecha = fch.toDateString();
        const fecha = _fecha.split(' ');
        this.CURPValida += fecha[3].substr(2, 2) + this.meses(fecha[1]) + fecha[2];
        this.CURPValida += sexo === '1' ? 'H' : 'M';
        if (esMexicano) {
            this.CURPValida += estadoNacimiento;
        } else {
            this.CURPValida += 'NE';
        }

        this.CURPValida = curp.substr(0, 4) + this.CURPValida + curp.substr(13, 5)

        return this.CURPValida;
    }
    public ValidarCurp(
        nombre: string,
        paterno: string,
        materno: string,
        fechaNacimiento: Date,
        sexo: string,
        estadoNacimiento: string,
        curp: string,
        esMexicano: boolean) {

        this.Nombre = this.FormatearNombre(nombre.toUpperCase().trim());
        this.Paterno = this.FormatearPaterno(paterno.toUpperCase().trim());
        if (materno == null || materno === '') {
            this.Materno = this.FormatearMaterno(materno);
        } else {
            this.Materno = this.FormatearMaterno(materno.toUpperCase().trim());
        }

        this.FechaNacimiento = new Date(fechaNacimiento);
        const fechaAux = new Date(fechaNacimiento).toDateString();
        const fecha = fechaAux.split(' ');
        this.CURPValida = '';
        this.CURPValida += this.PosicionUno();
        this.CURPValida += this.PosicionDos();
        this.CURPValida += this.PosicionTres();
        this.CURPValida += this.PosicionCuatro();
        this.CURPValida = this.PalabraInconveniente(this.CURPValida);
        this.CURPValida += fecha[3].substr(2, 2) + this.meses(fecha[1]) + fecha[2];
        this.CURPValida += sexo === '2' ? 'M' : 'H';
        if (esMexicano) {
            this.CURPValida += estadoNacimiento;
        } else {
            this.CURPValida += 'NE';
        }
        this.CURPValida += this.Posicion141516(this.Paterno, 14);
        this.CURPValida += this.Posicion141516(this.Materno, 15);
        this.CURPValida += this.Posicion141516(this.Nombre, 16);

        return this.CURPValida;
    }
    public ValidaRFCFch(rfc: string, fechaNacimiento: Date) {
        this.FechaNacimiento = fechaNacimiento;
        const _fecha = fechaNacimiento.toDateString();
        const fecha = _fecha.split(' ');
        this.RFCValida = '';
        this.RFCValida += fecha[3].substr(2, 2) + this.meses(fecha[1]) + fecha[2];
        this.RFCValida = rfc.substr(0, 4) + this.RFCValida;

        return this.RFCValida.toUpperCase();
    }
    public ValidarRFC(
        nombre: string,
        paterno: string,
        materno: string,
        fechaNacimiento: Date,
        sexo: string,
        estadoNacimiento: string,
        rfc: string) {

        if (rfc == null || rfc === '') {
            return;
        }
        this.Nombre = this.FormatearNombre(nombre.toUpperCase());
        this.Paterno = this.FormatearPaterno(paterno.toUpperCase());
        if (materno == null || materno === '') {
            this.Materno = this.FormatearMaterno(materno);
        } else {
            this.Materno = this.FormatearMaterno(materno.toUpperCase());
        }

        this.FechaNacimiento = fechaNacimiento;
        const _fecha = fechaNacimiento.toDateString();
        const fecha = _fecha.split(' ');
        this.RFCValida = '';
        this.RFCValida += this.PosicionUnoRFC();
        this.RFCValida += this.PosicionDosRFC();
        this.RFCValida += this.PosicionTresRFC();
        this.RFCValida += this.PosicionCuatroRFC();
        this.RFCValida = this.PalabraInconveniente(this.RFCValida);
        this.RFCValida += fecha[3].substr(2, 2) + this.meses(fecha[1]) + fecha[2];
        this.RFC = rfc.toUpperCase();
        if (this.RFCValida === this.RFC.substr(0, 10)) {
            return true;
        }
        return false;
    }
    public BuildRFC(nombre: string, paterno: string, materno: string, fechaNacimiento: Date, sexo: string, estadoNacimiento: string) {
        this.Nombre = this.FormatearNombre(nombre.toUpperCase().trim());
        this.Paterno = this.FormatearPaterno(paterno.toUpperCase().trim());
        if (materno === undefined) {
            this.Materno = '';
        } else {
            this.Materno = this.FormatearMaterno(materno.toUpperCase().trim());
        }

        this.FechaNacimiento = fechaNacimiento;
        const _fecha = fechaNacimiento.toDateString();
        const fecha = _fecha.split(' ');
        this.RFCValida = '';
        if (this.Materno === '' || this.Materno == null) {
            this.RFCValida = this.Paterno.substr(0, 2) + this.Nombre.substr(0, 2);
        } else {
            this.RFCValida += this.PosicionUnoRFC();
            this.RFCValida += this.PosicionDosRFC();
            this.RFCValida += this.PosicionTresRFC();
            this.RFCValida += this.PosicionCuatroRFC();
        }
        this.RFCValida = this.PalabraInconveniente(this.RFCValida);
        this.RFCValida += fecha[3].substr(2, 2) + this.meses(fecha[1]) + fecha[2];

        return this.RFCValida;
    }
    public BuildRFCNombre(nombre: string, paterno: string, materno: string, curp: string) {
        this.Nombre = this.FormatearNombre(nombre.toUpperCase().trim());
        this.Paterno = this.FormatearPaterno(paterno.toUpperCase().trim());
        if (materno == undefined) {
            this.Materno = '';
        } else {
            this.Materno = this.FormatearMaterno(materno.toUpperCase().trim());
        }

        this.RFCValida = '';
        if (this.Materno === '' || this.Materno == null) {
            this.RFCValida = this.Paterno.substr(0, 2) + this.Nombre.substr(0, 2);
        } else {
            this.RFCValida += this.PosicionUnoRFC();
            this.RFCValida += this.PosicionDosRFC();
            this.RFCValida += this.PosicionTresRFC();
            this.RFCValida += this.PosicionCuatroRFC();
        }
        this.RFCValida = this.PalabraInconveniente(this.RFCValida);
        return this.RFCValida;
    }
    public meses(mes: string) {
        switch (mes) {
            case 'Jan':
                return '01';
            case 'Feb':
                return '02';
            case 'Mar':
                return '03';
            case 'Apr':
                return '04';
            case 'May':
                return '05';
            case 'Jun':
                return '06';
            case 'Jul':
                return '07';
            case 'Aug':
                return '08';
            case 'Sep':
                return '09';
            case 'Oct':
                return '10';
            case 'Nov':
                return '11';
            case 'Dec':
                return '12';
        }
    }
    private PosicionUno() {   // primera letra del primer apellido
        if ('Ñ' === this.Paterno.substr(0, 1)) {
            return 'X';
        }
        return this.Paterno.substr(0, 1);
    }
    private PosicionUnoRFC() {  // primera letra del primer apellido
        if ('Ñ' === this.Paterno.substr(0, 1)) {
            return 'X';
        }
        return this.Paterno.substr(0, 1)
    }
    private PosicionDos() { // primera vocal interna del primer apellido
        const regex = /[AEIOU]/g;
        const str = this.Paterno.substr(1, this.Paterno.length);
        let m;
        const matches: string[] = new Array(str.length);
        let index = 0;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                matches[index] = match;
                index++;
            });
        }
        // console.log(matches);
        if (matches[0] != null && matches[0] !== '') {
            return matches[0];
        }
        return 'X';
    }
    private PosicionDosRFC() {// primera vocal interna del primer apellido
        const regex = /[AEIOU]/g;
        let str = this.Paterno.substr(1, this.Paterno.length);
        let m;
        const matches: string[] = new Array(str.length);
        let index = 0;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                matches[index] = match;
                index++;
            });
        }
        // console.log(matches);
        if (matches[0] != null && matches[0] != '') {
            return matches[0];
        } else {
            this.SVI = true;
        }
        return this.Materno.substr(0, 1);
        // return 'X';
    }

    private PosicionTres() {
        if ('Ñ' === this.Materno.substr(0, 1)) {
            return 'X';
        }
        return this.Materno.substr(0, 1);
    }
    private PosicionTresRFC() {
        if ('Ñ' === this.Materno.substr(0, 1)) {
            return 'X';
        }
        if (this.SVI) {
            return this.Nombre.substr(0, 1);
        }
        return this.Materno.substr(0, 1);
    }
    private PosicionCuatro() {// primera letra del nombre de pila
        if ('Ñ' === this.Nombre.substr(0, 1)) {
            return 'X';
        }
        return this.Nombre.substr(0, 1);
    }
    private PosicionCuatroRFC() {// primera letra del nombre de pila
        if ('Ñ' === this.Nombre.substr(0, 1)) {
            return 'X';
        }
        if (this.SVI) {
            return this.Nombre.substr(1, 1);
        }
        return this.Nombre.substr(0, 1);
    }
    private FormatearNombre(nombre: string) {
        this.Nombres = nombre.split(' ');
        let nombreNormalizado: string;
        let nombreFinal: string;
        for (var i = 0; i < this.Nombres.length; i++) {
            nombreNormalizado = this.Normalizar(this.Nombres[i]);
            nombreFinal = '';
            for (var j = 0; j < nombreNormalizado.length; j++) {
                if (nombreNormalizado[j] !== ',') {
                    nombreFinal += nombreNormalizado[j];
                }
            }

            if (!(this.NombresComunes(nombreFinal) || this.EvitarCompuestos(nombreFinal))) {
                return nombreFinal;
            }
            nombreFinal = '';
        }
        return this.Nombres[0];
    }

    private FormatearPaterno(paterno: string) {
        const paternoCompuesto = paterno.split(' ');
        let paternoNormalizado: string;
        let paternoFinal: string;
        for (var i = 0; i < paternoCompuesto.length; i++) {
            paternoNormalizado = this.Normalizar(paternoCompuesto[i]);
            paternoFinal = '';
            for (var j = 0; j < paternoNormalizado.length; j++) {
                if (paternoNormalizado[j] != ',') {
                    paternoFinal += paternoNormalizado[j];
                }
            }
            if (!(this.EvitarCompuestos(paternoFinal))) {
                return paternoFinal;
            }
            paternoFinal = '';
        }
        return paternoCompuesto[0];
    }

    private FormatearMaterno(materno: string) {
        if (materno == null || materno === '') {
            return 'X';
        }
        const maternoCompuesto = materno.split(' ');
        let maternoNormalizado: string;
        let maternoFinal: string;
        for (var i = 0; i < maternoCompuesto.length; i++) {
            maternoNormalizado = this.Normalizar(maternoCompuesto[i]);
            maternoFinal = '';
            for (var j = 0; j < maternoNormalizado.length; j++) {
                if (maternoNormalizado[j] !== ',') {
                    maternoFinal += maternoNormalizado[j];
                }
            }
            if (!(this.EvitarCompuestos(maternoFinal))) {
                return maternoFinal;
            }
            maternoFinal = '';
        }
        return maternoCompuesto[0];
    }

    public PalabraInconveniente(str: string) {
        const inconvenientes = ['BACA', 'BAKA', 'LOCO', 'LOKA', 'LOKO', 'BUEI', 'BUEY', 'MAME', 'CACA', 'MAMO',
            'CACO', 'MEAR', 'CAGA', 'MEAS', 'CAGO', 'MEON', 'CAKA', 'MIAR', 'CAKO', 'MION',
            'COGE', 'MOCO', 'COGI', 'MOKO', 'COJA', 'MULA', 'COJE', 'MULO', 'COJI', 'NACA',
            'COJO', 'NACO', 'COLA', 'PEDA', 'CULO', 'PEDO', 'FALO', 'PENE', 'FETO', 'PIPI',
            'GETA', 'PITO', 'GUEI', 'POPO', 'GUEY', 'PUTA', 'JETA', 'PUTO', 'JOTO', 'QULO',
            'KACA', 'RATA', 'KACO', 'ROBA', 'KAGA', 'ROBE', 'KAGO', 'ROBO', 'KAKA', 'RUIN',
            'KAKO', 'SENO', 'KOGE', 'TETA', 'KOGI', 'VACA', 'KOJA', 'VAGA', 'KOJE', 'VAGO',
            'KOJI', 'VAKA', 'KOJO', 'VUEI', 'KOLA', 'VUEY', 'KULO', 'WUEI', 'LILO', 'WUEY',
            'LOCA'];

        if (inconvenientes.indexOf(str) > -1) {
            str = str.replace(str.substr(1, 1), 'X')
        }

        return str;
    }

    public NombresComunes(str: string) {
        const comunes = ['MARIA', 'JOSE', 'MA', 'J', ' '];

        if (comunes.indexOf(str) > -1) {
            return true;
        }

        return false;
    }

    public Normalizar(str: string) {
        const origen = ['Ã', 'À', 'Á', 'Ä', 'Â', 'È', 'É', 'Ë', 'Ê', 'Ì', 'Í', 'Ï', 'Î',
            'Ò', 'Ó', 'Ö', 'Ô', 'Ù', 'Ú', 'Ü', 'Û', 'ã', 'à', 'á', 'ä', 'â',
            'è', 'é', 'ë', 'ê', 'ì', 'í', 'ï', 'î', 'ò', 'ó', 'ö', 'ô', 'ù',
            'ú', 'ü', 'û', 'Ç', 'ç'];
        const destino = ['A', 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I',
            'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'a', 'a', 'a', 'a', 'a',
            'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'u',
            'u', 'u', 'u', 'c', 'c'];
        const strs = str.split('');
        const salida = strs.map(function (char) {
            const pos = origen.indexOf(char);
            return (pos > -1) ? destino[pos] : char;
        }).toString();

        return salida;
    }

    public EvitarCompuestos(str: string) {
        const compuestos = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI',
            'DIE', 'DD', 'EL', 'LA', 'LOS', 'LAS', 'LE',
            'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y'];
        if (compuestos.indexOf(str) >= 0) {
            return true;
        }
        return false;
    }

    public Posicion141516(string: string, pos: number) { // primera consonante no interna del primer apellido, segundo apellido y nombre
        const regex = /[QWRTYPSDFGHJKLZXCVBNMÑ]/g;
        let str: string;
        if (pos === 14) {
            str = string.substr(1, this.Paterno.length);
        }
        if (pos === 15) {
            str = string.substr(1, this.Materno.length);
        }
        if (pos === 16) {
            str = string.substr(1, this.Nombre.length);
        }
        let m;
        const matches: string[] = new Array(str.length);
        let index = 0;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                matches[index] = match;
                index++;
            });
        }
        if (matches[0] != null && matches[0] !== '') {
            if (matches[0] == 'Ñ') {
                return 'X';
            }
            return matches[0];
        }

        return 'X';
    }

    IsLetra(digito: any) {
        const regex = /[QWERTYUIOPASDFGHJKLZXCVBNM]/g;
        const str = digito;
        let m;
        const matches: string[] = new Array(str.length);
        let index = 0;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                matches[index] = match;
                index++;
            });
        }
        if (matches[0] != null && matches[0] !== '') {
            return true;
        }
        return false;
    }

    IsDigit(digito: any) {
        const regex = /[1234567890]/g;
        const str = digito;
        let m;
        const matches: string[] = new Array(str.length);
        let index = 0;

        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                matches[index] = match;
                index++;
            });
        }

        if (matches[0] !== null && matches[0] !== '') {
            return true;
        }
        return false;
    }

}
