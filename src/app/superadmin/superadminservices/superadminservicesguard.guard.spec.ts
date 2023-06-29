import { TestBed } from '@angular/core/testing';

import { SuperadminservicesguardGuard } from './superadminservicesguard.guard';

describe('SuperadminservicesguardGuard', () => {
  let guard: SuperadminservicesguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuperadminservicesguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
