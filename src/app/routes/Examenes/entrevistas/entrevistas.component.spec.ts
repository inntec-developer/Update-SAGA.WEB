import { settings } from 'cluster';
import { SettingsService } from './../../../core/settings/settings.service';
import { SharedModule } from './../../../shared/shared.module';
import { ToolsModule } from './../../../tools/tools.module';

import { async, TestBed, inject } from '@angular/core/testing';

import { EntrevistasComponent } from './entrevistas.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ExamenesService } from '../../../service/Examenes/examenes.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';


describe('EntrevistasComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToolsModule, SharedModule],
      declarations: [ EntrevistasComponent ],
      providers: [SettingsService]
    })
    .compileComponents();
  }));

  it('should create the app', async(inject([ExamenesService, SettingsService, ToasterService, Router],
     (examenesService, settingsService, toasterService, router) => {
    const component = new EntrevistasComponent(examenesService, settingsService, toasterService, router);

    expect(component).toBeTruthy();
  })));
});
