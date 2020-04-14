import { ChkButtonsDirective } from './chk-buttons.directive';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';

describe('ChkButtonsDirective', () => {
  it('should create an instance', async(inject([ActivatedRoute, SettingsService], (activatedRoute, settingsService) => {
    const directive = new ChkButtonsDirective(activatedRoute, settingsService);
    expect(directive).toBeTruthy();
  })));
});
