import { TestBed, inject } from '@angular/core/testing';

import { VacantesService } from './vacantes.service';

describe('VacantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacantesService]
    });
  });

  it('should be created', inject([VacantesService], (service: VacantesService) => {
    expect(service).toBeTruthy();
  }));
});
