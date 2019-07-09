import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { VacantesEmailService } from '../../../service/VacantesEmails/vacantes-email.service';

@Component({
  selector: 'app-show-vacante-reclutador',
  templateUrl: './show-vacante-reclutador.component.html',
  styleUrls: ['./show-vacante-reclutador.component.scss'],
  providers: [VacantesEmailService]
})
export class ShowVacanteReclutadorComponent implements OnInit {
  public Folio: any;
  public requisicion: any;
  constructor(
    private _Route: ActivatedRoute,
    private _Service: VacantesEmailService,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    this._Route.params.subscribe(params => {
      if (params['Folio'] != null) {
        this.Folio = params['Folio'];
        this._Service.showVacanteEmail(this.Folio).subscribe(result => {
          this.requisicion = result;
          this.spinner.hide();
        });
      }
    });
  }

  ngOnInit() {

  }

}
