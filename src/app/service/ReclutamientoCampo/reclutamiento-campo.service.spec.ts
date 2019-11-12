import { TestBed, inject } from '@angular/core/testing';

import { ReclutamientoCampoService } from './reclutamiento-campo.service';

describe('ReclutamientoCampoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReclutamientoCampoService]
    });
  });

  it('should be created', inject([ReclutamientoCampoService], (service: ReclutamientoCampoService) => {
    expect(service).toBeTruthy();
  }));
});
