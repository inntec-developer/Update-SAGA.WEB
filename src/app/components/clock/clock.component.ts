import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  //date: Date;

   date = new Date();
    year = this.date.getFullYear();
    month = this.date.getMonth();
    day = this.date.getDay();
    s = this.date.getSeconds();
    m =  this.date.getMinutes();
    h =  this.date.getHours()
    months = [ "Ene", "Febrero", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"];
    days = [ "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    daymonth = this.months[this.month];
    dayText = this.days[this.day - 1]


  constructor() {
    setInterval(() => this.clock, 1000);
   //setInterval(() => this.time(), 1000); 


   }

  ngOnInit() {
    console.log(this.day)
    console.log(this.month)
  }

  clock(){
    let date = new Date();

    this.daymonth = this.months[date.getMonth()];
  }

   time() {     
    var d = new Date();
        this.s = d.getSeconds() * 6;
        this.m = d.getMinutes() * 6 + (this.s / 60);
        this.h = d.getHours() % 12 / 12 * 360 + (this.m / 12);  

  }
}
