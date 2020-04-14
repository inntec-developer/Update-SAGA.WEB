/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '../../core/settings/settings.service';
import { MenuService } from '../../core/menu/menu.service';
import { ComponentsService } from '../../service';
import { BsModalService } from 'ngx-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { NgxSpinnerService } from 'ngx-spinner';

describe('Component: Header', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MenuService, UserblockService, SettingsService, ComponentsService]
        }).compileComponents();
    });

    it('should create an instance', async(inject([MenuService, UserblockService, SettingsService,
        ComponentsService, BsModalService, ToasterService, NgxSpinnerService],
        (menuService, userblockService, settingsService, componentsService,
            bsModalService, toasterService, ngxSpinnerService) => {
        let component = new HeaderComponent(menuService, userblockService, settingsService, componentsService,
             bsModalService, toasterService, ngxSpinnerService);
        expect(component).toBeTruthy();
    })));
});
