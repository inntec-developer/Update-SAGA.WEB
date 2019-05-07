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
   ActividadEmpresa: Array<actividadempresas>;
   TamanoEmpresa: Array<tamanoempresas>;
   TiposBase: Array<tiposbase>;
   PerfilExperiencia: Array<perfilexperiencia>;
   Aptitud: Array<aptitudes>;
   AreaExperiencia: Array<areaExperiencias>;
   AreaInteres: Array<areaintereses>;
   JornadaLaboral: Array<areaintereses>;
   TipoModalidad: Array<tpmodalidad>;
   TipoPsicometria: Array<psicometrias>;
   TipoNomina: Array<tpNomina>;
   PeriodoPago: Array<periodospago>;
   DiasSemana: Array<diasemana>;
   BeneficioPerfil: Array<beneficios>;
   TipoContrato: Array<tpcontratos>;
   TiemposContrato: Array<tiempocontratos>;
   DocDamsa: Array<DocDamsa>;
   PrestacionesLey: Array<PrestacionesLey>;
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

interface actividadempresas {
    Id: number;
    giroempresa: string;
    actividadempresa: string;
    activo: boolean;
}

interface tamanoempresas {
    Id: number;
    tamanoempresa: string;
    activo: boolean;
}

interface tiposbase {
    Id: number;
    tipobase: string;
    activo: boolean;
}

interface perfilexperiencia {
    Id: number;
    perfilexperiencia: string;
    activo: boolean;
}

interface aptitudes {
    Id: number;
    aptitud: string;
    activo: boolean;
}

interface areaExperiencias {
    Id: number;
    areaExperiencia: string;
    activo: boolean;
    icono: string;
}

interface areaintereses {
    Id: number;
    areainteres: string;
    areaExperiencia: string;
    activo: boolean;
}

interface jornadalaboral {
    Id: number;
    jornada: string;
    orden: number;
    varioshorarios: boolean;
    activo: boolean;
}

interface tpmodalidad {
    Id: number;
    modalidad: string;
    orden: number;
    activo: boolean;
}

interface psicometrias {
    Id: number;
    tipoPsicometria: string;
    descripcion: number;
    activo: boolean;
}

interface tpNomina {
    Id: number;
    tipodenomina: string;
    activo: boolean;
}

interface periodospago {
    Id: number;
    periodoPago: string;
    activo: boolean;
}

interface diasemana {
    Id: number;
    diaSemana: string;
    activo: boolean;
}

interface beneficios {
    Id: number;
    tipoBeneficio: string;
    activo: boolean;
}

interface tpcontratos {
    Id: number;
    tipoContrato: string;
    periodoPrueba: boolean;
    activo: boolean;
}

interface tiempocontratos {
    Id: number;
    tiempo: string;
    orden: number;
    activo: boolean;
}

interface DocDamsa {
    Id: number;
    documentoDamsa: string;
    activo: boolean;
}

interface PrestacionesLey {
    Id: number;
    prestacionLey: string;
    activo: boolean;
}

export class filtros {
    IdCat: number;
    IdEstado: number;
    IdMunicipio: number;
}
