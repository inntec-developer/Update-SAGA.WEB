export class ApiConection {
  public static ServiceUrlWeb = 'http://localhost:4200/'
  /*Servicio de purbeas locales*/
  public static ServiceUrl = 'http://localhost:33333/api/';
  //public static ServiceUrlFileManager = 'http://localhost:4200/assets/';
  public static ServiceUrlFileManager = 'http://localhost:33333/utilerias/';
  public static ServiceUrlFoto = 'http://localhost:33333/';
  // Conexiones a bolsa de trabajo.
  public static ServiceUrlBolsa = 'http://sagainn.com.mx:403';
  // Conexion a FORMATO 290 
  public static ServicioUrl290 = 'http://sagainn.com.mx:413/Home/';

  /* Componentes */
  public static GetUserGroup = 'AsignacionRequi/getUserGroup';
  public static GetUserGroupL = 'AsignacionRequi/getUserGroupL';

  /* Catalogos */
  public static GetDocumentosDamsa = 'Catalogos/getDocDamsa';
  public static GetPrestacionesLey = 'Catalogos/getPrestacionesLey';
  public static getTiposUsuarios = 'Catalogos/getTipos';
  public static getDepartamentos = 'Catalogos/getDepa';
  public static GetPrioridades = 'Catalogos/getPrioridades';
  public static GetEstatusRequi = 'Catalogos/getEstatus?tipoMov=';
  public static GetGrupos = 'Catalogos/getGrupos';
  public static GetRoles = 'Catalogos/getRoles';

  /* Reclutamiento */
  public static Damfo290GetById = 'Damfo290/getById?id=';
  public static GetViewDamfos = "Damfo290/getViewDamfos";

  /* Ventas */
  public static AddressCliente = "Requisiciones/getAddress?Id=";
  public static CreateRequi = "Requisiciones/createRequi";
  public static GetRequisicionById = "Requisiciones/getById?Id=";
  public static GetRequisicionByFolio = "Requisiciones/getByFolio?folio=";
  public static GetRequisicionesAll = "Requisiciones/getRequisiciones?propietario=";
  public static UpdateRequisicion = "Requisiciones/updateRequisiciones";
  public static DeleteRequisicion = "Requisiciones/deleteRequisiciones";
  public static CancelRequisicion = 'Requisiciones/cancelREquisiciones';
  public static ReActivarRequisicion = 'Requisiciones/reActivarRequisiciones';
  public static GetUserGroups = 'Requisiciones/getUserGroups'
  public static GetRequiReclutador = 'Requisiciones/getRequiReclutador?IdUsuario=';
  public static AsignarRequisicion = 'Requisiciones/asignacionRequisiciones'
  public static GetDireccionRequisicion = 'Requisiciones/getDireccionRequisicon?id=';
  public static UpdateVacantes = 'Requisiciones/upadateVacantes';
  public static GetHorariosRequi = 'Requisiciones/getHorariosRequisicion?id=';


  /* Candidatos */
  public static filtropaises = 'Candidatos/get';
  public static filtroestados = 'Candidatos/getestados';
  public static filtromunicipios = 'Candidatos/getmunicipios';
  public static filtrocolonias = 'Candidatos/getcolonias';
  public static Candidatos = 'Candidatos/getcandidatos';
  public static MisCandidatos = 'candidatos/getMisCandidatos?reclutador='
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
  public static Comentarios = 'Candidatos/getComentarios';
  public static AddComentarios = 'Candidatos/addComentarios';

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
  public static getCampos = '/dvacante/getCampos';
  public static getClasificaciones = '/dvacante/getClasificaciones';

  /* Admin */
  public static getDtosPersonal = '/admin/get';
  public static getUsuariosByDepa = '/admin/getUsuarioByDepa';
  public static addRol = '/admin/agregarRol';
  public static addGrupo = '/admin/addGrupo';
  public static addUser = '/admin/addUsuario';
  public static getSession = 'admin/setUsers';
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
  public static modificarPrivilegios = '/admin/modificarPrivilegios';
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

  /*Seguimiento Vacantes*/
  public static getDtosCard = 'reclutamiento/seguimientovacante/getCard';
  public static getDtosDetail = 'reclutamiento/seguimientovacante/getvacantesdtl';
  public static getPostulados = 'reclutamiento/seguimientovacante/getPostulate';
  public static getInfoCandidato = 'reclutamiento/seguimientovacante/getInfoCandidato';
}
