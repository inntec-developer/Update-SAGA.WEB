import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disenador',
  templateUrl: './disenador.component.html',
  styleUrls: ['./disenador.component.scss']
})
export class DisenadorComponent implements OnInit {
  viewArte: any;
  Requi: any;
  Folio: any;
  VBtra: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.Requi = params['Requi'];
      this.Folio = params['Folio'];
      this.VBtra = params['VBtra'];

    });
   }

  ngOnInit() {
    this.viewArte = true;
  }


}
