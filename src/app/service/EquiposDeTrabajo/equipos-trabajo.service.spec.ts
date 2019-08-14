import { TestBed, inject } from '@angular/core/testing';

import { EquiposTrabajoService } from './equipos-trabajo.service';

describe('EquiposTrabajoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquiposTrabajoService]
    });
  });

  it('should be created', inject([EquiposTrabajoService], (service: EquiposTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
