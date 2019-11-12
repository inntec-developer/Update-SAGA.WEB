import { TestBed, inject } from '@angular/core/testing';

import { CostosService } from './costos.service';

describe('CostosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CostosService]
    });
  });

  it('should be created', inject([CostosService], (service: CostosService) => {
    expect(service).toBeTruthy();
  }));
});
