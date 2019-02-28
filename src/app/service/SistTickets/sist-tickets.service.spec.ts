import { TestBed, inject } from '@angular/core/testing';

import { SistTicketsService } from './sist-tickets.service';

describe('SistTicketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SistTicketsService]
    });
  });

  it('should be created', inject([SistTicketsService], (service: SistTicketsService) => {
    expect(service).toBeTruthy();
  }));
});
