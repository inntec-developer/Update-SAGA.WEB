import { SettingsService } from './../../../core/settings/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-collapsed',
  templateUrl: './button-collapsed.component.html',
  styleUrls: ['./button-collapsed.component.scss']
})
export class ButtonCollapsedComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

  toggleCollapsedSideabar() {
    this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    this.settings.layout.viewChevron = !this.settings.layout.viewChevron;
}
isCollapsedText() {
    return this.settings.layout.isCollapsedText;
}
isCollapsedChevron() {
    return this.settings.layout.viewChevron;
}
}
