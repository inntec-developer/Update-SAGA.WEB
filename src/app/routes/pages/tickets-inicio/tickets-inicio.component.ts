
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { RequisicionesService, ApiConection } from '../../../service';
import { SettingsService } from '../../../core/settings/settings.service';
import { SistTicketsService } from '../../../service/SistTickets/sist-tickets.service';
import { TicketsRegisterComponent } from '../../../components/tickets-register/tickets-register.component';

const swal = require('sweetalert');

@Component({
  selector: 'app-tickets-inicio',
  templateUrl: './tickets-inicio.component.html',
  styleUrls: ['./tickets-inicio.component.scss'],
  providers: [RequisicionesService]
})
export class TicketsInicioComponent implements OnInit {

 // CAROUSEL PROPS
 public myInterval = 5000;
 public noWrapSlides = false;
 public slides: Array<any> = [];

  folio = 0;
  iniciar = false;
  num = '';
  dataSource: any = [];
  btnCita = false;
  user: string;
  pass: string;
categorias = [];
categorias2 = [];
vacantes = [];
  activeId: any;
  search: any;
  constructor(private _service: SistTicketsService,
    private service: RequisicionesService,
    private dialog: MatDialog,
    private settings: SettingsService) {
     }


  ngOnInit() {
    sessionStorage.removeItem('candidatoId');
    this.GetVacantes();
  }

  GenerarTicket(row) {
    swal({
      title: "¿ESTÁS SEGURO?",
      text: "¡Se generará ticket para entrevista! para la vacante de " + row.vBtra,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ec2121",
      confirmButtonText: "¡Si, imprimir ticket!",
      cancelButtonColor: "#ec2121",
      cancelButtonText: "¡No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      window.onkeydown = null;
      window.onfocus = null;
      if (isConfirm) {

        let candidatoId = "00000000-0000-0000-0000-000000000000";

        if(sessionStorage.getItem('candidatoId'))
        {
           candidatoId = sessionStorage.getItem('candidatoId');
        }

   
    this._service.GetTicketSinCita(row.id, candidatoId).subscribe(data => {

      if(data == 409)
      {
        swal("¡Ocurrió un error!", "Impresora sin papel", "error");
      }
      else if(data == 502)
      {
        swal("¡Ocurrió un error!", "Impresora apagada", "error");
      }
      else
      {
      this.num = data[0];
      swal("¡TURNO IMPRESO!", "Bienvenido " + data[1] + " . Por favor tome su turno impreso." + this.num + ". Si inició sesión se cerrará al imprimir turno", "success");
      this.LogOut();
      }

    });

      }
      else {
        swal("Cancelado", "No se realizó ningún cambio", "error");
      }
    });
  }

  GenerarTicketCita()
  {
    this._service.GetTicketConCita(this.folio).subscribe(data => {
      if(data == 409)
      {
        swal("¡Ocurrió un error!", "Impresora sin papel", "error");
        this.btnCita = false;
      }
      else if(data == 502)
      {
        swal("¡Ocurrió un error!", "Impresora apagada", "error");
        this.btnCita = false;
      }
      else if(data==404)
      {
        swal("¡No hay citas registradas para el folio " + this.folio + "!", '', "error");
        this.btnCita = false;
        this.folio = 0;
      }
      else if(data == 200)
      {
        swal("¡Ya hay un ticket impreso para el folio " + this.folio + "!", '', "warning");
        this.btnCita = false;
        this.folio = 0;
      }
      else if(data == 204)
      {
        swal("¡Se canceló tu cita con el folio " + this.folio + "!. Pasó tu tiempo limite", '', "warning");
        this.btnCita = false;
        this.folio = 0;
      }
      else if(data==417)
      {
        swal("¡Ocurrió un error al intentar imprimir ticket!", '', "error");
        this.btnCita = false;
        this.folio = 0;
      }
      else
      {
        this.num = data[0];

        swal("¡TURNO IMPRESO!", "Bienvenido " + data[1] + " . Por favor tome su turno impreso." + this.num, "success");
  
      }
    })

  }

  // GenerarTicketSinCita(requisicionId)
  // {
  //   let candidatoId = "00000000-0000-0000-0000-000000000000";

  //   if(sessionStorage.getItem('candidatoId'))
  //   {
  //      candidatoId = sessionStorage.getItem('candidatoId');
  //   }

  //   this._service.GetTicketSinCita(requisicionId, candidatoId).subscribe(data => {
  //     this.num = data;
  //   })

  // }


  GetMisVacantes() {
    this.service.getRequiReclutador(this.settings.user['id']).subscribe(data => {
      this.dataSource = data;
    });
  }

  GetVacantes() {
    this._service.GetVacantes().subscribe(data => {
      this.dataSource = data;
      if (this.dataSource.length > 0) {
        this.dataSource = this.dataSource.filter(element => {
          if (element.cubierta > 0) {
            element.arte != null ? element.arte = ApiConection.ServiceUrlFileManager + element.arte : null;
            return element;
          }
        });

        let color = 0;
        this.categorias = Array.from(new Set(this.dataSource.map(s => s.areaId)))
          .map(id => {
            color += 1;
            if (color > 7) {
              color = 1;
            }

            let cat = this.dataSource.find(s => s.areaId === id).categoria;
            const idx = cat.search(/[/y,]/i);
            if (idx > -1) {
              cat = cat.substring(0, idx);
            }
            return {
              id: id,
              categoria: cat,
              icono: this.dataSource.find(s => s.areaId === id).icono,
              color: color,
            };
          });

        // for (var c = 0; c <= 7; c++) {
        //   this.dataSource[c].image = images[c];
        // }

        // this.categorias2 = this.categorias.splice(8, this.categorias.length);
        // this.categorias = this.categorias.splice(0, 7);
        console.log(this.categorias)
        this.vacantes = (JSON.parse(JSON.stringify(this.dataSource)));
      }
    });
  }

  Registrar() {
    const dialog = this.dialog.open(TicketsRegisterComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true
    });
    dialog.afterClosed().subscribe(result => {
      if(result) {
        this.user = result.username;
        this.pass = result.pass;
        this.iniciar = true;
      }
    })
  }

  Login(usuario, pass)
  {
    this._service.LoginBolsa(usuario, pass).subscribe(data => {
      if(data == 300)
      {
        swal("¡Error en la contraseña!", '', "error");
        this.user = "";
        this.pass = "";
        this.iniciar = false;
      }
      else if(data == 404)
      {
        swal("¡El usuario no se encuentra!", '', "error");
        this.user = "";
        this.pass = "";
        this.iniciar = false;
      }
      else
      {
        sessionStorage.setItem('candidatoId', data[0].personaId);
        this.iniciar = true;
        swal({
          title: "¡Bienvenido!",
          text: data[0].usuario + " ¡Ya puedes empezar!",
          type: "success",
        })

      }
    })
  }

  LogOut()
  {
    sessionStorage.removeItem('candidatoId');
    this.user = "";
    this.pass = "";
    this.iniciar = false;
  }

  FiltrarCategoria(id) {
    if (id === 0) {
      this.vacantes = (JSON.parse(JSON.stringify(this.dataSource)));
    } else {
      const filtro = this.dataSource.filter(item => {
        if (item.areaId === id) {
          return item;
        }
      });

    this.vacantes = filtro;
  }
  this.activeId = this.vacantes[0].id;
  // this.myCarousel.activeId = this.vacantes[0].id;
  // this.myCarousel.cycle();


  //   setTimeout(() => {
  //     /** spinner ends after 5 seconds */
  //     this.spinner.hide();
  // }, 5000);

  }

  public Search(data: any) {

    this.search = data.target.value;
    const tempArray: Array<any> = [];

    const colFiltar: Array<any> = [{ title: 'vBtra' }];

    this.dataSource.forEach(function (item) {
      let flag = false;
      colFiltar.forEach(function (c) {
        if (item[c.title].toString().toLowerCase().match(data.target.value.toLowerCase())) {
          flag = true;
        }
      });

      if (flag) {
        tempArray.push(item);
      }
    });

    this.vacantes = tempArray;

    this.activeId = this.vacantes[0].id;

  }
}
