import { TestBed, inject } from '@angular/core/testing';

import { KioscoServiceService } from './kiosco-service.service';

describe('KioscoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KioscoServiceService]
    });
  });

  it('should be created', inject([KioscoServiceService], (service: KioscoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
