
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets-register',
  templateUrl: './tickets-register.component.html',
  styleUrls: ['./tickets-register.component.scss']
})
export class TicketsRegisterComponent implements OnInit {

  flagMX = true;
  flagEU = false;
  constructor() { }

  ngOnInit() {
  }

}
