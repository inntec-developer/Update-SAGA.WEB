import { OnInit, AfterViewInit } from '@angular/core';

   const mocos = {
    text: 'Administrar',
    link: '/admin',
    icon: 'icon-people',
    submenu:[
        {
            text: 'Registro Usuario', 
            link: '/register'
        },
        {
            text: 'Usuarios',
            link: '/admin/agregar'
        },
        {
            text: 'Grupos',
            link: '/admin/grupoAdd'
        },
        {
            text: 'Roles',
            link: '/admin/roles'
        },
        {
            text: 'Roles-Privilegios',
            link: '/admin/privilegios'
        },
        {
            text: 'Usuarios-Grupo',
            link: '/admin/grupo'
        },
        {
            text: 'Grupos-Rol',
            link: '/admin/rol'
        }
    ]
}
export class pruebaMenu
{

// melina: string = "mocs mocos mocos mocos";
  
    setVar() : any
    {
      return mocos
    }
}