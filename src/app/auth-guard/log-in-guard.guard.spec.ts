import { TestBed, async, inject } from '@angular/core/testing';

import { LogInGuardGuard } from './log-in-guard.guard';

describe('LogInGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogInGuardGuard]
    });
  });

  it('should ...', inject([LogInGuardGuard], (guard: LogInGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
