import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-reclutador',
  templateUrl: './registro-reclutador.component.html',
  styleUrls: ['./registro-reclutador.component.scss']
})
export class RegistroReclutadorComponent implements OnInit {

  constructor(private dialog : MatDialogRef<RegistroReclutadorComponent>,) { }

  ngOnInit() {
  }

  registrarUsuario($event)
  {
    if($event != 417)
    {
      this.dialog.close($event);

      // this.registrar = false;
      // this._service.UpdateCandidatoTicket(this.ticket[0].ticketId, $event).subscribe(data => {
      //   var datos = { candidatoId: $event, estatusId: 18, requisicionId: this.ticket[0].requisicionId, ReclutadorId: this.settings.user['id'] };

      //   this.servicePost.SetProceso(datos).subscribe(data => {
      //     this.GetTicket(this.ticket[0].ticketId);
      //   });

      // });
    }
  }
}
