import { TestBed } from '@angular/core/testing';

import { SuperadminserviceService } from './superadminservice.service';

describe('SuperadminserviceService', () => {
  let service: SuperadminserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
