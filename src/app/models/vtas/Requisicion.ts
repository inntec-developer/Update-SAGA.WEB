export class CreateRequisicion{
  IdDamfo: string;
  IdAddress: string;
  Usuario: string;
  UsuarioId: string;
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