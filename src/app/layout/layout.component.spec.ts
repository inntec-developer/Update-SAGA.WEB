/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { SettingsService } from '../core/settings/settings.service';
import { ToasterService } from 'angular2-toaster';
import { ComponentsService } from '../service';
import { PopNotificacionesComponent } from '../components/pop-notificaciones/pop-notificaciones.component';

describe('Component: Layout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [SettingsService, ToasterService, ComponentsService, PopNotificacionesComponent]
    }).compileComponents();
});

  it('should create an instance', async(inject(
    [SettingsService, ToasterService, ComponentsService, PopNotificacionesComponent ],
    (settingsService, toasterService, componentsService, popNotificacionesComponent) => {
    let component = new LayoutComponent(settingsService, toasterService, componentsService, popNotificacionesComponent);
    expect(component).toBeTruthy();
  })));
});
