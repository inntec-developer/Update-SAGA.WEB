export class Filtros {
    IdPais: number;
    IdEstado: number;
    IdMunicipio: number;
    IdColonia: number;
    Cp: number;
    IdAreaExp: number;
    IdPerfil: number;
    Salario: number;
    IdGenero: number;
    Edad: number;
    Reubicacion: boolean;
    IdPDiscapacidad: number;
    IdTpLicencia: number;
    IdNvEstudios: number;
    IdIdiomas: number;
    TpVehiculo: boolean;
    // palabraClave: string;
    // filtroEstados: number[];
    // filtrosmunicipio: number[];
    // filtroCategoria: number[];
    // filtroEscolaridades: number[];
    // SMin: number;
    // SMax: number;
}

export class Apartado {
  Id: any;
  RequisicionId: any;
  CandidatoId: any;
  Reclutador: any;
  Estatus: any;
  TpContrato: number;
}

export class Comentarios{
  Comentario: string;
  CandidatoId: string;
  RequisicionId: string;
  Usuario: string;
}
