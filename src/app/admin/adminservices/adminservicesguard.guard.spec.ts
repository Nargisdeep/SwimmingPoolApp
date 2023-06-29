import { TestBed } from '@angular/core/testing';

import { AdminservicesguardGuard } from './adminservicesguard.guard';

describe('AdminservicesguardGuard', () => {
  let guard: AdminservicesguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminservicesguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
