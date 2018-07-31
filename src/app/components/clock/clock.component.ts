import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  date: Date;

  constructor() {
    setInterval(() => this.clock(), 1000); 
   }

  ngOnInit() {
  }

  clock(){
    this.date = new Date();
  }

}
