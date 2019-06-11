export class ApiConection {
  public static ServiceUrl = 'http://localhost:33333/api/';

  // //Produccion
  // public static ServiceUrlWeb = 'https://weberp.damsa.com.mx/';
  // public static ServiceUrlFotoUser = 'https://apierp.damsa.com.mx/img/';
  // public static ServiceUrl = 'https://apierp.damsa.com.mx/api/';
  // public static ServiceUrlFileManager = 'https://apierp.damsa.com.mx/utilerias/';
  // public static ServiceUrlFoto = 'https://apierp.damsa.com.mx/';
  // public static ServiceUrlBolsa = 'https://aplicapp.damsa.com.mx';
  // public static ServiceUrlLoginBolsa = 'https://bolsa.damsa.com.mx';
  // public static ServicioUrl290 = 'https://webpfrc.damsa.com.mx/Home/';

  // // Pruebas
  public static ServiceUrlWeb = 'https://websb.damsa.com.mx/';
  public static ServiceUrlFotoUser = 'https://apierp.damsa.com.mx/img/';
  // public static ServiceUrl = 'https://apisb.damsa.com.mx/api/';
  public static ServiceUrlFileManager = 'https://apisb.damsa.com.mx/utilerias/';
  public static ServiceUrlFoto = 'https://apisb.damsa.com.mx/';
  public static ServiceUrlBolsa = 'https://btapi.damsa.com.mx';
  public static ServiceUrlLoginBolsa = 'https://btweb.damsa.com.mx';
  public static ServicioUrl290 = 'https://webrcsb.damsa.com.mx/Home/';

  /* Calendario Event */
  public static GetCalendarioEvent = 'CalendarEvent/GetEvent';
  public static AddCalendarioEvent = 'CalendarEvent/AddEvent';
  public static UpdateCalendarioEvent = 'CalendarEvent/UpdateEvent';
  public static DeleteCalendarioEvent = 'CalendarEvent/DeleteEvent';
  public static CulminarEvent = 'CalendarEvent/CulminarEvent';

  /* Compoentes de Asignacion de Requisiciones */
  public static GetUserGroup = 'AsignacionRequi/getUserGroup';
  public static GetUserGroupL = 'AsignacionRequi/getUserGroupL';
  public static GetAsignados = 'AsignacionRequi/getAsignados';

  /* Alertas STM  */
  public static GetAlertStm = 'AlertSTM/getAlert';
  public static GetAllAlertStm = 'AlertSTM/getAllAlert';
  public static DeleteAlertStm = 'AlertSTM/deleteAlert';

  /* Catalogos */
  public static GetDocumentosDamsa = 'Catalogos/getDocDamsa';
  public static GetPrestacionesLey = 'Catalogos/getPrestacionesLey';
  public static getTiposUsuarios = 'Catalogos/getTipos';
  public static getDepartamentos = 'Catalogos/getDepa';
  public static GetPrioridades = 'Catalogos/getPrioridades';
  public static GetEstatusRequi = 'Catalogos/getEstatus';
  public static GetGrupos = 'Catalogos/getGrupos';
  public static GetRoles = 'Catalogos/getRoles';
  public static GetMotivosLiberacion = 'Catalogos/getMotivosLiberacion';
  public static GetTiposActividadesRecl = 'Catalogos/getTiposActividadesRecl';
  public static GetTipoTelefono = 'Catalogos/getTipoTelefono';
  public static GetTipoDireccion = 'Catalogos/getTipoDireccion';
  public static GetPais = 'Catalogos/getPais';
  public static GetEstado = 'Catalogos/getEstado';
  public static GetMunicipio = 'Catalogos/getMunicipio';
  public static GetColonia = 'Catalogos/getColonia';
  public static GetForCP = 'Catalogos/getInfoCP';

  /* Catalogos para clientes */
  public static GetGiroEmp = 'Catalogos/getGiroEmp';
  public static GetActividadesEmp = 'Catalogos/getActividadEmp';
  public static GetTamanioEmp = 'Catalogos/getTamanioEmp';
  public static GetTipoEmp = 'Catalogos/getTipoEmp';
  public static GetTipoBase = 'Catalogos/getTipoBase';

  /* Reclutamiento */
  public static Damfo290GetById = 'Damfo290/getById?id=';
  public static GetDamfoRutasCamion = 'Damfo290/getDamfoRutasCamion';
  public static GetViewDamfos = "Damfo290/getViewDamfos";
  public static GetVacantesDamfo = "Damfo290/getVacantesDamfo";

  /* Ventas */
  public static AddressCliente = "Requisiciones/getAddress?Id=";
  public static CreateRequi = "Requisiciones/createRequi";
  public static GetRequisicionById = "Requisiciones/getById?Id=";
  public static GetRequisicionByFolio = "Requisiciones/getByFolio";
  public static GetRequisicionesAll = "Requisiciones/getRequisiciones?propietario=";
  public static UpdateRequisicion = "Requisiciones/updateRequisiciones";
  public static DeleteRequisicion = "Requisiciones/deleteRequisiciones";
  public static CancelRequisicion = 'Requisiciones/cancelREquisiciones';
  public static ReActivarRequisicion = 'Requisiciones/reActivarRequisiciones';
  public static GetUserGroups = 'Requisiciones/getUserGroups'
  public static GetRequiReclutador = 'Requisiciones/getRequiReclutador';
  public static AsignarRequisicion = 'Requisiciones/asignacionRequisiciones'
  public static GetDireccionRequisicion = 'Requisiciones/getDireccionRequisicon';
  public static GetRutasCamionRequisicion = 'Requisiciones/getRutasCamion'
  public static AddRutaCamion = 'Requisiciones/addRutaCamion';
  public static UpdateRutaCamion = 'Requisiciones/updateRutaCamion';
  public static DeleteRutaCamion = 'Requisiciones/deleteRutaCamion';
  public static UpdateVacantes = 'Requisiciones/upadateVacantes';
  public static GetHorariosRequi = 'Requisiciones/getHorariosRequisicion?id=';
  public static GetHorariosRequiConteo = 'Requisiciones/getHorariosRequiConteo';
  public static GetRequisicioneEstatus = 'Requisiciones/getRequisicionesEstatus';
  public static GetInformeRequisiciones = 'Requisiciones/getInformeVacantes';
  public static getRequiEstadisticos = 'Requisiciones/getRequiEstadisticos';
  public static GetUltimoEstatusRequi = 'Requisiciones/getUltimoEstatus';
  public static GetRequiTipoRecl = 'Requisiciones/getRequisicionesTipo';
  public static SendEmailRequiPuro = 'Requisiciones/sendEmailRequiPura';
  public static SendEmailRedesSociales = 'Requisiciones/sendEmailRedesSociales'
  public static AddDatosFactura = 'Requisiciones/insertDtosFactura';
  public static GetReporte70 = 'Requisiciones/getReporte70';
  public static GetRepoteCandidatos = 'Candidatos/getRPTCandidatosVacante'

  /* Clientes / Prospectos */
  public static GetProspectos = 'Directorio/getProspectos';
  public static GetClientes = 'Directorio/getClientes';
  public static AddProspectos = 'Directorio/addProspecto';
  public static HacerCliente = 'Directorio/hacerCliente';
  public static GetCliente = 'Directorio/getCliente';
  public static EditInfoGeneral = 'Directorio/EditInfoGeneral';
  // Direcciones del Cliente
  public static AddDireccionCliente = 'Directorio/AddDireccionCliente';
  public static DeleteDireccionCliente = 'Directorio/DeleteDireccionCliente';
  public static EditDireccionCliente = 'Directorio/EditDireccionCliente'; s

  // Telefonos del Cliente
  public static AddTelefonoCliente = 'Directorio/AddTelefonoCliente';
  public static DeleteTelefonoCliente = 'Directorio/DeleteTelefonoCliente';
  public static EditTelefonoCliente = 'Directorio/EditTelefonoCliente';

  // Emails del Cliente
  public static AddEmailCliente = 'Directorio/AddEmailCliente';
  public static DeleteEmailCliente = 'Directorio/DeleteEmailCliente';
  public static EditEmailCliente = 'Directorio/EditEmailCliente';

  // Contactos del Cliente
  public static AddContactoCliente = 'Directorio/AddContactoCliente';
  public static DeleteContactoCliente = 'Directorio/DeleteContactoCliente';
  public static EditContactoCliente = 'Directorio/EditContactoCliente';

  public static CRUDTelefonContacto = 'Directorio/CRUDTelefonContacto';

  public static CRUDContactoCorreo = 'Directorio/CRUDContactoCorreo';

  /* Candidatos */
  public static filtropaises = 'Candidatos/get';
  public static filtroestados = 'Candidatos/getestados';
  public static filtromunicipios = 'Candidatos/getmunicipios';
  public static filtrocolonias = 'Candidatos/getcolonias';
  public static Candidatos = 'Candidatos/getcandidatos';
  public static MisCandidatos = 'candidatos/getMisCandidatos'
  public static Candidatodetail = 'Candidatos/getcandidatoid';
  public static Postulaciones = 'Candidatos/getpostulaciones';
  public static Areasexp = 'Candidatos/getareasexp';
  public static Perfiles = 'Candidatos/getperfiles';
  public static Generos = 'Candidatos/getgeneros';
  public static Discapacidad = 'Candidatos/getdescapacidad';
  public static TpLicencia = 'Candidatos/gettplicencia';
  public static NivelEstudio = 'Candidatos/getnivelestudio';
  public static Idiomas = 'Candidatos/getidiomas';
  public static Vacantes = 'Candidatos/getvacantes';
  public static Apartar = 'Candidatos/postapartado';
  public static GetEstatus = 'Candidatos/getestatuscandidato';
  public static Liberar = 'Candidatos/postliberado';
  public static VacantesDtl = 'Candidatos/getvacantesdtl';
  public static ComentariosCandidato = 'Candidatos/getComentarios';
  public static AddComentariosCandidato = 'Candidatos/addComentarios';
  public static GetCandidatoPalabraClave = 'Candidatos/getCandidatoPalabraClave';
  public static GetAreasRecl = 'Candidatos/getAreasRecl';
  public static GetMediosRecl = 'Candidatos/getMediosRecl'
  public static UpdateFuenteRecl = 'Candidatos/updateFuenteRecl'
  public static UpdateCandidatoContratado = 'Candidatos/updateContratados'
  public static GetMotivos = 'Candidatos/getMotivos'
  public static GetContratados = 'Candidatos/getContratados'
  public static AddComentarioNR = 'Candidatos/addComentariosNR'
  public static GetCandidatosNR = 'Candidatos/getFoliosIncidencias' //comentarioCandidatosController
  public static AddRespuesta = 'Candidatos/addRespuesta'
  public static GetInfoContratados = 'Candidatos/getInfoContratados'

  /* Vacantes */
  public static getRequis = '/dvacante/get';
  public static setDetalle = '/dvacante/setDetalle';
  public static setResumen = '/dvacante/setResumen';
  public static getGeneral = '/dvacante/getGenerales';
  public static getContrato = '/dvacante/getContrato';
  public static getPuestoReclutar = '/dvacante/getPuestoReclutar';
  public static getHorario = '/dvacante/getHorario';
  public static getsueldo = '/dvacante/getsueldo';
  public static getOtros = '/dvacante/getOtros';
  public static getActividad = '/dvacante/getActividad';
  public static getBeneficio = '/dvacante/getBeneficio';
  public static getDireccion = '/dvacante/getDireccion';
  public static getTelefono = '/dvacante/getTelefono';
  public static getContacto = '/dvacante/getContacto';
  public static getPsicometria = '/dvacante/getPsicometria';
  public static getDocumento = '/dvacante/getDocumento';
  public static getProceso = '/dvacante/getProceso';
  public static getCopetencia = '/dvacante/getCopetencia';
  public static getUbicacion = '/dvacante/getUbicacion';
  public static updatePublicar = '/dvacante/updatePublicar';
  public static GuardarConfi = '/dvacante/GuardarVacante';
  public static getCampos = '/dvacante/getCampos';
  public static getClasificaciones = '/dvacante/getClasificaciones';




  /* Admin */
  public static getDtosPersonal = '/admin/get';
  public static getUsuariosByDepa = '/admin/getUsuarioByDepa';
  public static addRol = '/admin/agregarRol';
  public static addGrupo = '/admin/addGrupo';
  public static addUser = 'admin/addUsuario';
  public static login = 'admin/login';
  public static GetUser = '/admin/getUser';
  public static udActivoUser = '/admin/udActivo';
  public static addUserGroup = '/admin/addUserGroup';
  public static addGroupRol = '/admin/addGroupRol';
  public static getGruposRoles = '/admin/getGruposRoles';
  public static updateUsuario = '/admin/updateUsuario';
  public static updateGrupo = '/admin/updateGrupo';
  public static updateRoles = '/admin/updateRoles';
  public static deleteGrupo = '/admin/deleteGrupo';
  public static deleteRoles = 'admin/deleteRoles';
  public static getTreeRoles = '/admin/GetEstructura';
  public static getEntidadesUG = '/admin/getEntidadesByRol';
  public static getEntidades = '/admin/getEntidades2';
  public static getEstructuraRoles = '/admin/getEstructuraRoles';
  public static getPrivilegios = '/admin/getPrivilegios';
  public static modificarPrivilegios = 'admin/modificarPrivilegios';
  public static getUsuariosByGrupo = '/admin/getUsuarioByGrupo';
  public static deleteUserGroup = 'admin/deleteUserGroup';
  public static deleteUserRol = 'admin/deleteUserRol';
  public static getStruct = 'admin/getStruct';
  public static uploadImage = 'admin/UploadImage';
  public static addSeccion = 'admin/agregarSeccion';
  public static validarEmail = 'admin/validarEmail';
  public static validarDAL = 'admin/validarDAL';
  public static getImage = 'admin/getImage';
  public static getFiles = 'admin/getFiles';
  public static sendEmailRegister = 'admin/sendEmailRegister';
  public static downloadFiles = 'admin/downloadFiles';
  public static viewFile = 'admin/viewFile';
  public static uploadFile = 'admin/uploadFile';
  public static updateActivo = 'admin/updateActivo';
  public static getLideres = 'admin/getLideres';
  public static getOficinas = 'admin/getOficinas';
  public static GetByUsuario = 'admin/getByTipoUsuario'
  public static EnviaCorreo = 'admin/EnviaCorreo';
  public static updatePassword = 'admin/updatePassword';

  /*Seguimiento Vacantes*/
  public static getDtosCard = 'reclutamiento/seguimientovacante/getCard';
  public static getDtosDetail = 'reclutamiento/seguimientovacante/getvacantesdtl';
  public static getPostulados = 'reclutamiento/seguimientovacante/getPostulate';
  public static getProcesoPostulados = 'reclutamiento/seguimientovacante/getProceso';
  public static getInfoCandidato = 'reclutamiento/seguimientovacante/getInfoCandidato';
  public static getMisVacantes = 'reclutamiento/seguimientovacante/getMisVacantes';
  public static getPostulaciones = 'reclutamiento/seguimientovacante/getPostulaciones';
  public static setApartarCandidato = 'reclutamiento/seguimientovacante/apartarCandidato';
  public static setLiberarCandidato = 'reclutamiento/seguimientovacante/liberarCandidato';
  public static setProcesoPostulado = 'reclutamiento/seguimientovacante/updateStatus';
  public static setProcesoVacante = 'reclutamiento/seguimientovacante/updateStatusVacante';
  public static ComentariosVacante = 'reclutamiento/seguimientovacante/getComentariosVacante';
  public static AddComentariosVacante = 'reclutamiento/seguimientovacante/addComentariosVacante';
  public static setStatusBolsa = 'reclutamiento/seguimientovacante/updateStatusBolsa';
  public static sendEmailCandidato = 'reclutamiento/seguimientovacante/sendEmailCandidato';
  public static sendEmailNoContratado = 'reclutamiento/seguimientovacante/sendEmailsNoContratado';
  public static getConteoVacante = 'Requisiciones/getConteoVacante';
  public static execProcedurePause = 'Requisiciones/execProcedurePause'
  public static execProcedureSinCambios = 'Requisiciones/execProcedureSinCambio'
  public static execProcedureSinAsignar = 'Requisiciones/execProcedureSinAsignar'
  public static execProcedureVencidas = 'Requisiciones/execProcedureVencidas'
  public static getRequisicionesHistorial = 'Requisiciones/getRequisicionesHistorial'
  public static registrarCandidatos = 'reclutamiento/seguimientovacante/registrarCandidatos'


  /*Examenes */
  public static InsertExamen = 'examenes/insertExamen'
  public static GetCatalogo = 'examenes/getCatalogo'
  public static GetExamenes = 'examenes/getExamenes'
  public static GetExamen = 'examenes/getExamen'
  public static InsertRelacion = 'examenes/insertRelacion'
  public static InsertRespCandidato = 'examenes/insertRespCandidato'
  public static GetCandidatosExamen = 'examenes/getCandidatos'
  public static GetRespuestasCandidato = 'examenes/getRespCandidatos'
  public static ActualizarResultado = 'examenes/actualizarResultado'
  public static GetExamenRequi = 'examenes/getExamenRequi'
  public static GetRequiEstatus = 'examenes/getRequiEstatus'
  public static GetExamenCandidato = 'examenes/getExamenCandidato'
  public static GetRequisicionesPsico = 'examenes/getRequisiciones'
  public static InsertClaves = 'examenes/insertClaves'
  public static AgregarResultado = 'examenes/agregarResultado'
  public static GetClaves = 'examenes/getClaves'
  public static GetClaveCandidatos = 'examenes/getClaveCandidatos'
  public static GetClavesCandidatos = 'examenes/getClavesCandidatos'

  /*Reportes */
  public static GetInforme = 'reporte/Informe'
  public static GetEmpresas = 'reporte/empresas'
  public static GetUsuario = 'reporte/usuario'
  public static GetEstatusRep = 'reporte/estatus'
  public static GetOficinas = 'reporte/oficinas'
  public static GetProActividad = 'reporte/actividad'


  /*SistTickets */

  public static InsertTicket = 'SistTickets/InsertTicketRecl'
  public static GetFilaTickets = 'SistTickets/getFilaTickets'
  public static GetTicketRecl = 'SistTickets/getTicketsReclutador'
  public static GetTicketPrioridad = 'SistTickets/getTicketPrioridad'
  public static UpdateStatusTicket = 'SistTickets/updateStatus'
  public static GetPostulaciones = 'SistTickets/getPostulaciones'
  public static GetVacantesReclutador = 'SistTickets/getVacantesReclutador'
  public static LiberarCandidato = 'SistTickets/liberarCandidato'
  public static GetTicketEnAtencion = 'SistTickets/getTicketEnAtencion'
  public static GetVacantes = 'SistTickets/getVacantes'
  public static SetExamen = 'SistTickets/setExamen'
  public static GetModulos = 'SistTickets/getModulos'
  public static UpdateRequiTicket = 'SistTickets/updateRequiTicket'
  public static GetTicketExamen = 'SistTickets/getTicketsExamen'
  public static AsignarClaveCandidato = 'examenes/asignarClaveCandidato'
  public static SetEstatusCandidato = 'SistTickets/setEstatusCandidato'
  public static GetTicketConCita = 'SistTickets/ticketConCita'
  public static GetTicketSinCita = 'SistTickets/ticketSinCita'
  public static GetConcurrenciaReporte = 'SistTickets/getConcurrencia'
  public static UpdateCandidatoTicket = 'SistTickets/updateCandidatoTicket'
  public static RegistrarCandidato = 'SistTickets/registrarCandidato'
  public static LoginBolsa = 'SistTickets/loginBolsa'
  public static GetCitas = 'SistTickets/getCitas'
  public static PostularCandidato = 'SistTickets/postularCandidato'
  public static GetTicketsGenerados = 'SistTickets/getTicketsGenerados'
  public static GetRportAtencion = 'SistTickets/getRportAtencion'

  /*TrackingVacantes*/
  public static GetInformeTracking = 'Requisiciones/getInformeClientes';

  /* Componentes de Graficas */
  public static GraficPAVacantes = 'Graficas/vacantesInicio';
  public static GetRequisicionesGPA = 'Graficas/getRequisicionesGPA'


  /*Preguntas frecuentes */
  public static GetPreguntasFrecuentes = 'PreguntasFrecuente/preguntas'
  public static AddPreguntasFrecuentes = 'PreguntasFrecuente/add'
  public static alterPreguntasFrecuentes = 'PreguntasFrecuente/alter'
  public static deletePreguntasFrecuentes = 'PreguntasFrecuente/delete'


  /*Oficinas */
  public static GetSucursal = 'Oficina/oficina'
  public static GetEstadoOfi = 'Oficina/estado'
  public static GetMunicipioOfi = 'Oficina/municipio'
  public static GetColoniaOfi = 'Oficina/colonia'
  public static AddOficina = 'Oficina/add'
  public static alterOficina = 'Oficina/editar'
  public static deleteOficina = 'Oficina/delete'

  /*Indicadores */
  public static getCubiertaG = 'indicador/vcubierta'
  public static getActivaG = 'indicador/vactiva'
  public static getPorvencerG = 'indicador/vporvencer'
  public static getVencidasG = 'indicador/vvencida'
  public static getResumenG = 'indicador/resumen'
  public static getRadialG = 'indicador/radial'

  /* Contadores */
  public static getPerfiles = 'contadores/perfiles';
  public static getFolios = 'contadores/folios';
  public static getPosiciones = 'contadores/posiciones';
  public static getPosicionesActivas = 'contadores/posicionesActivas';
  public static getCandidatos = 'contadores/candidatos';
  public static getCandidatosInicio = 'contadores/candidatosEstatus';

  /* Menu de Catalogos */
  public static getCatalogos = 'Catalogos/getCatalogos';
  public static getCatalogosComplete = 'Catalogos/getCatalogosComplete';
  public static postCatalogos = 'Catalogos/postCatalogo';
  public static FilterCatalogos = 'Catalogos/FilterCatalogo';

}
