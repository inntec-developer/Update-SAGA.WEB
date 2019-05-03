export class catalogos {
   opt: number;
   usuario: string;
   Catalogos: Catalogos;
   Pais: Array<paises>;
   Estado: Array<estados>;
   Municipio: Array<municipio>;
   Colonia: Array<colonias>;
   TpTelefono: Array<tptelefonos>;
   TpUsuario: Array<tpusuario>;
   EstadoCivil: Array<estadocivil>;
   Departamentos: Array<departamentos>;
   Areas: Array<areas>;
   Escolaridades: Array<escolaridades>;
   Nivel: Array<niveles>;
   Medio: Array<medios>;
   Idioma: Array<idiomas>;
   Discapacidad: Array<discapacidades>;
   TipoLicencia: Array<tplicencias>;
   TipoExamen: Array<tpexamen>;
   GiroEmpresa: Array<giroempresas>;
}

interface Catalogos {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Activo: boolean;
}

interface paises {
    Id: number;
    pais: string;
    Activo: boolean;
}

interface estados {
    Id: number;
    estado: string;
    Clave: string;
    Pais: string;
}

interface municipio {
    Id: number;
    municipio: string;
    EstadoId: number;
    Estado: string;
    Activo: boolean;
}

interface colonias {
    Id: number;
    colonia: string;
    CP: string;
    TipoColonia: string;
    municipio: string;
    estado: string;
    pais: string;
    Activo: boolean;
}

interface tptelefonos {
    Id: number;
    tipo: string;
    activo: boolean;
}

interface tpusuario {
    Id: number;
    tipo: string;
}

interface estadocivil {
    Id: number;
    estadocivil: string;
    activo: boolean;
}

interface departamentos {
    Id: string;
    nombre: string;
    area: string;
    clave: string;
    orden: number;
}

interface areas {
    Id: number;
    nombre: string;
    clave: string;
    orden: string;
}

interface escolaridades {
    Id: number;
    gradoEstudio: string;
}

interface niveles {
    Id: number;
    nivel: string;
}

interface medios {
    Id: number;
    nombre: string;
    activo: boolean;
}

interface idiomas {
    Id: number;
    idioma: string;
    activo: boolean;
}

interface discapacidades {
    Id: number;
    tipodiscapacidad: string;
    activo: boolean;
}

interface tplicencias {
    Id: number;
    tipolicencia: string;
    descripcion: string;
    activo: boolean;
}

interface tpexamen {
    Id: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

interface giroempresas {
    Id: number;
    giroEmpresa: string;
    activo: boolean;
}
export class filtros {
    IdCat: number;
    IdEstado: number;
    IdMunicipio: number;
}
