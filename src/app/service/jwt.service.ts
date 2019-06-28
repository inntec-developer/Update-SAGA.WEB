import { ApiConection } from '.';
import { Injectable } from '@angular/core';

const jwt = require('jwt-simple/lib');
const moment = require('moment');
const secret = 'damsa_saga_innovation_206039774@!23!"#'

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  createToken(user){
    var payload = {
      privilegios: user.privilegios,
      sub: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
      clave: user.clave,
      email: user.email,
      role: user.role,
      foto: ApiConection.ServiceUrlFotoUser + user.clave + '.jpg',
      tipoUsuarioId: user.tipoUsuarioId,
      tipo: user.tipo,
      sucursal: user.sucursal,
      iat: moment().unix(),
      exp: moment().add(30,'days').unix
    }
    return jwt.encode(payload, secret);
  }

}
