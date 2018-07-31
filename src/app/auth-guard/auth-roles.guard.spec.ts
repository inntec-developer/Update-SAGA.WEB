import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRolesGuard } from './auth-roles.guard';

describe('AuthRolesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRolesGuard]
    });
  });

  it('should ...', inject([AuthRolesGuard], (guard: AuthRolesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
