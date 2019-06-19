export class CreateRequisicion{
  IdDamfo: string;
  IdAddress: string;
  Usuario: string;
  UsuarioId: string;
  IdEstatus: number;
  Confidencial: boolean;
}

export class UpdateRequisicion{
  id: string;
  folio: any;
  fch_Cumplimiento: Date;
  estatusId: number;
  prioridadId: number;
  confidencial: boolean;
  usuario: string;
}

export class AsignarRequis {
  id: string;
  fch_Cumplimiento: Date;
  diasEnvio: number;
  usuario: string;
}

export class Vacante {
  id: string;
  requisicionId: string;
  numeroVacantes: number;
  usuario: string;
}


export class EventoCalendario {
  id: string;
  titulo: string;
  inicio: Date;
  fin: Date;
  allDay: boolean;
  descripcion: string;
  reclutadorId: string;
  color: string;
}

export class Requisicion{
  folio: number;
  fch_Creacion: Date | null;
  fch_Limite: Date | null;
  prioridad: any;
  prioridadId: number;
  fch_Cumplimiento: Date | null;
  estatus:any;
  estatusId: number;
  confidencial: boolean;
  vacantes:  number;
  vBtra: number;
  tipoReclutamiento: any;
  claseReclutamiento: any;
  contratoInicial: any;
  tiempoContrato: any;
  area: any;
  genero: any;
  edadMinima: any;
  estadoCivil: any;
  sueldoMinimo: any;
  sueldoMaximo: any;
  escolaridadesRequi: any;
  aptitudesRequi: any;
  experiencia: string;
  diaCorte: any;
  tipoNomina: any;
  diaPago: any;
  periodoPago: any;
  especifique: string | null;
  direccionId: string;
  beneficiosRequi: any;
  actividadesRequi: any;
  observacionesRequi: any;
  procesoRequi: any;
  documentosClienteRequi: any;
}
