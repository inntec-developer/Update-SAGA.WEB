import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-email',
  templateUrl: './button-email.component.html',
  styleUrls: ['./button-email.component.scss']
})
export class ButtonEmailComponent implements OnInit {
  @Input('xs') xs: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
