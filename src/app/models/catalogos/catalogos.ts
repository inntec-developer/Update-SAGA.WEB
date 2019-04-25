export class catalogos {
   opt: number;
   Catalogos: Catalogos;
   Pais: Array<paises>;
   Estado: Array<estados>;
   Municipio: Array<municipio>;
   Colonia: Array<colonias>;
   TpTelefono: Array<tptelefonos>;
   TpUsuario: Array<tpusuario>;
   EstadoCivil: Array<estadocivil>;
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

export class filtros {
    IdCat: number;
    IdEstado: number;
    IdMunicipio: number;
}
